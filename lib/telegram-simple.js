import TelegramBot from 'node-telegram-bot-api'
import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'

/**
 * Create enhanced Telegram bot with WhatsApp-like methods
 * @param {string} token - Telegram bot token
 * @param {object} options - Bot options
 */
export function makeTelegramBot(token, options = {}) {
    const bot = new TelegramBot(token, { polling: true, ...options });

    // Message splitting utility for long messages
    function splitMessage(text, maxLength = 4000) {
        if (text.length <= maxLength) return [text];

        const chunks = [];
        let currentChunk = '';
        const lines = text.split('\n');

        for (const line of lines) {
            // If adding this line would exceed the limit
            if ((currentChunk + line + '\n').length > maxLength) {
                // If current chunk has content, save it
                if (currentChunk.trim()) {
                    chunks.push(currentChunk.trim());
                    currentChunk = '';
                }

                // If single line is too long, split it by words
                if (line.length > maxLength) {
                    const words = line.split(' ');
                    let wordChunk = '';

                    for (const word of words) {
                        if ((wordChunk + word + ' ').length > maxLength) {
                            if (wordChunk.trim()) {
                                chunks.push(wordChunk.trim());
                                wordChunk = '';
                            }
                            // If single word is still too long, force split
                            if (word.length > maxLength) {
                                for (let i = 0; i < word.length; i += maxLength) {
                                    chunks.push(word.slice(i, i + maxLength));
                                }
                            } else {
                                wordChunk = word + ' ';
                            }
                        } else {
                            wordChunk += word + ' ';
                        }
                    }

                    if (wordChunk.trim()) {
                        currentChunk = wordChunk;
                    }
                } else {
                    currentChunk = line + '\n';
                }
            } else {
                currentChunk += line + '\n';
            }
        }

        // Add remaining chunk
        if (currentChunk.trim()) {
            chunks.push(currentChunk.trim());
        }

        return chunks.length > 0 ? chunks : [text];
    }

    // Helper to convert WhatsApp-style options to Telegram-safe options
    function sanitizeOptions(options = {}) {
        const out = { ...options };
        if (out.quoted) {
            const q = out.quoted;
            // Map to Telegram reply_to_message_id if possible
            const replyId = q && (q.id || q.message_id);
            if (replyId) out.reply_to_message_id = replyId;
            delete out.quoted; // remove cyclic reference source
        }
        return out;
    }

    // Helper: fetch remote URL to Buffer with content type
    async function fetchAsBuffer(url) {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status} fetching media`);
        const contentType = res.headers.get('content-type') || '';
        const arrayBuf = await res.arrayBuffer();
        return { buffer: Buffer.from(arrayBuf), contentType };
    }

    // Override sendMessage to handle long messages and payload objects
    const originalSendMessage = bot.sendMessage.bind(bot);
    bot.sendMessage = async function(chatId, textOrPayload, options = {}) {
        try {
            // Sanitize options first (handles { quoted: m })
            let safeOptions = sanitizeOptions(options);

            // If payload-style call is used, route to appropriate method
            if (textOrPayload && typeof textOrPayload === 'object') {
                const payload = textOrPayload;
                // Text payload
                if (typeof payload.text === 'string') {
                    let cleanText = payload.text;
                    if (safeOptions.parse_mode === 'Markdown') {
                        cleanText = cleanText.replace(/([_*\[\]()`~>#+=|{}!-])/g, '\\\$&');
                    }
                    // Handle splitting if needed
                    if (cleanText.length > 4000) {
                        const chunks = splitMessage(cleanText);
                        for (let i = 0; i < chunks.length; i++) {
                            const chunkOptions = i === 0 ? { ...safeOptions } : { ...safeOptions };
                            if (i > 0) delete chunkOptions.parse_mode;
                            await originalSendMessage(chatId, chunks[i], chunkOptions);
                            if (i < chunks.length - 1) await new Promise(r => setTimeout(r, 500));
                        }
                        return;
                    }
                    return await originalSendMessage(chatId, cleanText, safeOptions);
                }

                // Media payloads
                if (payload.image || payload.photo) {
                    const media = payload.image || payload.photo;
                    return await this.sendPhoto(chatId, media.url || media, { caption: payload.caption, parse_mode: 'Markdown', ...safeOptions });
                }
                if (payload.video) {
                    const media = payload.video;
                    return await this.sendVideo(chatId, media.url || media, { caption: payload.caption, parse_mode: 'Markdown', ...safeOptions });
                }
                if (payload.document) {
                    const media = payload.document;
                    return await this.sendDocument(chatId, media.url || media, { caption: payload.caption, filename: payload.fileName || payload.filename, parse_mode: 'Markdown', ...safeOptions });
                }
                if (payload.audio) {
                    const media = payload.audio;
                    return await this.sendAudio(chatId, media.url || media, { caption: payload.caption, title: payload.title, performer: payload.performer, parse_mode: 'Markdown', ...safeOptions });
                }
                if (payload.sticker) {
                    const media = payload.sticker;
                    return await this.sendSticker(chatId, media.url || media, { ...safeOptions });
                }
                // Fallback: try to stringify non-text payloads' text property if exists
            }

            // Standard text path
            let cleanText = String(textOrPayload);
            if (safeOptions.parse_mode === 'Markdown') {
                cleanText = cleanText.replace(/([_*\[\]()`~>#+=|{}!-])/g, '\\\$&');
            }

            // Check message length before sending
            if (cleanText.length > 4000) {
                const chunks = splitMessage(cleanText);
                const results = [];

                for (let i = 0; i < chunks.length; i++) {
                    try {
                        const chunkOptions = i === 0 ? { ...safeOptions } : { ...safeOptions };
                        // Remove parse_mode for chunks to avoid formatting issues
                        if (i > 0) delete chunkOptions.parse_mode;

                        const result = await originalSendMessage(chatId, chunks[i], chunkOptions);
                        results.push(result);

                        // Small delay between chunks to avoid rate limiting
                        if (i < chunks.length - 1) {
                            await new Promise(resolve => setTimeout(resolve, 500));
                        }
                    } catch (chunkError) {
                        console.error(`Error sending chunk ${i + 1}:`, chunkError.message);
                        // Try sending without formatting as fallback
                        try {
                            const fallbackOptions = { ...safeOptions };
                            delete fallbackOptions.parse_mode;
                            await originalSendMessage(chatId, chunks[i], fallbackOptions);
                        } catch (fallbackError) {
                            console.error(`Fallback also failed for chunk ${i + 1}:`, fallbackError.message);
                        }
                    }
                }

                return results[0]; // Return first result for compatibility
            }

            return await originalSendMessage(chatId, cleanText, safeOptions);
        } catch (error) {
            console.error('Error sending message:', error.message);

            // Handle specific Telegram errors
            if (error.message.includes('message is too long')) {
                // Split long messages as fallback
                const chunks = splitMessage(String(textOrPayload));
                for (let i = 0; i < chunks.length; i++) {
                    try {
                        const chunkOptions = i === 0 ? sanitizeOptions(options) : sanitizeOptions(options);
                        if (i > 0) delete chunkOptions.parse_mode;
                        await originalSendMessage(chatId, chunks[i], chunkOptions);
                        if (i < chunks.length - 1) {
                            await new Promise(resolve => setTimeout(resolve, 500));
                        }
                    } catch (chunkError) {
                        console.error(`Error sending chunk ${i + 1}:`, chunkError.message);
                    }
                }
            } else if (error.message.includes("can't parse entities")) {
                // Try sending without formatting
                try {
                    const fallbackOptions = sanitizeOptions({ ...options });
                    delete fallbackOptions.parse_mode;
                    return await originalSendMessage(chatId, String(textOrPayload), fallbackOptions);
                } catch (fallbackError) {
                    console.error('Fallback without formatting also failed:', fallbackError.message);
                    throw fallbackError;
                }
            } else {
                throw error; // Re-throw other errors
            }
        }
    };

    // Add WhatsApp-like methods to the bot
    
    /**
     * Send a reply message (now with automatic message splitting)
     */
    bot.reply = async function(chatId, text, originalMsg, options = {}) {
        return await this.sendMessage(chatId, text, {
            reply_to_message_id: originalMsg.id || originalMsg.message_id,
            parse_mode: 'Markdown',
            ...options
        });
    };
    
    /**
     * Send message with image
     */
    bot.sendImage = async function(chatId, image, caption = '', options = {}) {
        if (typeof image === 'string' && image.startsWith('http')) {
            return await this.sendPhoto(chatId, image, {
                caption,
                parse_mode: 'Markdown',
                ...options
            });
        } else if (Buffer.isBuffer(image)) {
            return await this.sendPhoto(chatId, image, {
                caption,
                parse_mode: 'Markdown',
                ...options
            });
        } else if (typeof image === 'string' && fs.existsSync(image)) {
            return await this.sendPhoto(chatId, fs.createReadStream(image), {
                caption,
                parse_mode: 'Markdown',
                ...options
            });
        }
        throw new Error('Invalid image format');
    };
    
    /**
     * Send message with video (with URL fallback to Buffer upload)
     */
    const originalSendVideo = bot.sendVideo.bind(bot);
    bot.sendVideo = async function(chatId, video, options = {}) {
        try {
            // Handle different video input types
            if (typeof video === 'string' && video.startsWith('http')) {
                try {
                    // Attempt direct URL first
                    return await originalSendVideo(chatId, video, { parse_mode: 'Markdown', ...options });
                } catch (err) {
                    // If Telegram can't fetch the URL, download and upload as Buffer
                    if ((err && err.message && err.message.includes('failed to get HTTP URL content')) || (err && /400/.test(String(err)))) {
                        const { buffer, contentType } = await fetchAsBuffer(video);
                        const filename = contentType && contentType.includes('mp4') ? 'video.mp4' : 'video';
                        return await originalSendVideo(chatId, { source: buffer, filename }, { parse_mode: 'Markdown', ...options });
                    }
                    throw err;
                }
            } else if (Buffer.isBuffer(video)) {
                // Buffer video
                return await originalSendVideo(chatId, { source: video, filename: 'video.mp4' }, { parse_mode: 'Markdown', ...options });
            } else if (typeof video === 'string' && fs.existsSync(video)) {
                // File path video
                return await originalSendVideo(chatId, fs.createReadStream(video), { parse_mode: 'Markdown', ...options });
            } else if (video && typeof video === 'object' && (video.url || video.source)) {
                // Object with url or source
                if (video.url && typeof video.url === 'string') {
                    try {
                        return await originalSendVideo(chatId, video.url, { parse_mode: 'Markdown', ...options });
                    } catch (err) {
                        if (err && err.message && err.message.includes('failed to get HTTP URL content')) {
                            const { buffer, contentType } = await fetchAsBuffer(video.url);
                            const filename = contentType && contentType.includes('mp4') ? (video.filename || 'video.mp4') : (video.filename || 'video');
                            return await originalSendVideo(chatId, { source: buffer, filename }, { parse_mode: 'Markdown', ...options });
                        }
                        throw err;
                    }
                }
                if (video.source) {
                    return await originalSendVideo(chatId, video, { parse_mode: 'Markdown', ...options });
                }
            } else {
                throw new Error('Invalid video format');
            }
        } catch (e) {
            console.error('Error sending video:', e.message);
            throw e;
        }
    };
    
    /**
     * Send message with audio
     */
    const originalSendAudio = bot.sendAudio.bind(bot);
    bot.sendAudio = async function(chatId, audio, options = {}) {
        try {
            if (typeof audio === 'string' && audio.startsWith('http')) {
                return await originalSendAudio(chatId, audio, options);
            } else if (Buffer.isBuffer(audio)) {
                return await originalSendAudio(chatId, audio, options);
            } else if (typeof audio === 'string' && fs.existsSync(audio)) {
                return await originalSendAudio(chatId, fs.createReadStream(audio), options);
            } else {
                return await originalSendAudio(chatId, audio, options);
            }
        } catch (error) {
            console.error('Error sending audio:', error);
            throw error;
        }
    };
    
    /**
     * Send voice message
     */
    const originalSendVoice = bot.sendVoice.bind(bot);
    bot.sendVoice = async function(chatId, voice, options = {}) {
        try {
            if (typeof voice === 'string' && voice.startsWith('http')) {
                return await originalSendVoice(chatId, voice, options);
            } else if (Buffer.isBuffer(voice)) {
                return await originalSendVoice(chatId, voice, options);
            } else if (typeof voice === 'string' && fs.existsSync(voice)) {
                return await originalSendVoice(chatId, fs.createReadStream(voice), options);
            } else {
                return await originalSendVoice(chatId, voice, options);
            }
        } catch (error) {
            console.error('Error sending voice:', error);
            throw error;
        }
    };
    
    /**
     * Send document
     */
    const originalSendDocument = bot.sendDocument.bind(bot);
    bot.sendDocument = async function(chatId, document, options = {}) {
        try {
            if (typeof document === 'string' && document.startsWith('http')) {
                return await originalSendDocument(chatId, document, options);
            } else if (Buffer.isBuffer(document)) {
                return await originalSendDocument(chatId, document, options);
            } else if (typeof document === 'string' && fs.existsSync(document)) {
                return await originalSendDocument(chatId, fs.createReadStream(document), options);
            } else {
                return await originalSendDocument(chatId, document, options);
            }
        } catch (error) {
            console.error('Error sending document:', error);
            throw error;
        }
    };
    
    /**
     * Send sticker
     */
    const originalSendSticker = bot.sendSticker.bind(bot);
    bot.sendSticker = async function(chatId, sticker, options = {}) {
        try {
            if (typeof sticker === 'string' && sticker.startsWith('http')) {
                return await originalSendSticker(chatId, sticker, options);
            } else if (Buffer.isBuffer(sticker)) {
                return await originalSendSticker(chatId, sticker, options);
            } else if (typeof sticker === 'string' && fs.existsSync(sticker)) {
                return await originalSendSticker(chatId, fs.createReadStream(sticker), options);
            } else {
                return await originalSendSticker(chatId, sticker, options);
            }
        } catch (error) {
            console.error('Error sending sticker:', error);
            throw error;
        }
    };
    
    /**
     * Get user name
     */
    bot.getName = async function(userId) {
        try {
            const chat = await this.getChat(userId);
            return chat.first_name + (chat.last_name ? ' ' + chat.last_name : '');
        } catch (e) {
            return 'Unknown User';
        }
    };
    
    /**
     * Download file from Telegram
     */
    bot.downloadFile = async function(fileId) {
        try {
            const file = await this.getFile(fileId);
            const url = `https://api.telegram.org/file/bot${this.token}/${file.file_path}`;
            const response = await fetch(url);
            return await response.buffer();
        } catch (e) {
            throw new Error(`Failed to download file: ${e.message}`);
        }
    };
    
    /**
     * Get file info
     */
    bot.getFileInfo = async function(fileId) {
        try {
            return await this.getFile(fileId);
        } catch (e) {
            throw new Error(`Failed to get file info: ${e.message}`);
        }
    };
    
    /**
     * Check if user is admin in group
     */
    bot.isAdmin = async function(chatId, userId) {
        try {
            const admins = await this.getChatAdministrators(chatId);
            return admins.some(admin => admin.user.id === userId);
        } catch (e) {
            return false;
        }
    };
    
    /**
     * Check if bot is admin in group
     */
    bot.isBotAdmin = async function(chatId) {
        try {
            const admins = await this.getChatAdministrators(chatId);
            return admins.some(admin => admin.user.id === this.id);
        } catch (e) {
            return false;
        }
    };
    
    /**
     * Get group metadata
     */
    bot.getGroupMetadata = async function(chatId) {
        try {
            const chat = await this.getChat(chatId);
            const admins = await this.getChatAdministrators(chatId);
            const memberCount = await this.getChatMemberCount(chatId);
            
            return {
                id: chat.id,
                subject: chat.title,
                description: chat.description,
                participants: memberCount,
                admins: admins.map(admin => ({
                    id: admin.user.id,
                    admin: admin.status === 'administrator' || admin.status === 'creator'
                }))
            };
        } catch (e) {
            throw new Error(`Failed to get group metadata: ${e.message}`);
        }
    };
    
    /**
     * Send message with buttons (inline keyboard)
     */
    bot.sendButton = async function(chatId, text, buttons, options = {}) {
        const keyboard = [];
        
        if (Array.isArray(buttons)) {
            for (const button of buttons) {
                if (Array.isArray(button)) {
                    // Row of buttons
                    const row = button.map(btn => ({
                        text: btn.text || btn[0],
                        callback_data: btn.callback_data || btn[1] || btn.text || btn[0]
                    }));
                    keyboard.push(row);
                } else {
                    // Single button
                    keyboard.push([{
                        text: button.text || button[0],
                        callback_data: button.callback_data || button[1] || button.text || button[0]
                    }]);
                }
            }
        }
        
        return await this.sendMessage(chatId, text, {
            reply_markup: {
                inline_keyboard: keyboard
            },
            parse_mode: 'Markdown',
            ...options
        });
    };
    
    /**
     * Send message with menu (reply keyboard)
     */
    bot.sendMenu = async function(chatId, text, menu, options = {}) {
        const keyboard = [];
        
        if (Array.isArray(menu)) {
            for (const row of menu) {
                if (Array.isArray(row)) {
                    keyboard.push(row.map(item => ({ text: item })));
                } else {
                    keyboard.push([{ text: row }]);
                }
            }
        }
        
        return await this.sendMessage(chatId, text, {
            reply_markup: {
                keyboard: keyboard,
                resize_keyboard: true,
                one_time_keyboard: true
            },
            parse_mode: 'Markdown',
            ...options
        });
    };
    
    /**
     * Remove keyboard
     */
    bot.removeKeyboard = async function(chatId, text, options = {}) {
        return await this.sendMessage(chatId, text, {
            reply_markup: {
                remove_keyboard: true
            },
            parse_mode: 'Markdown',
            ...options
        });
    };
    
    return bot;
}

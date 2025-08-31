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
    
    // Add WhatsApp-like methods to the bot
    
    /**
     * Send a reply message
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
     * Send message with video
     */
    bot.sendVideo = async function(chatId, video, caption = '', options = {}) {
        if (typeof video === 'string' && video.startsWith('http')) {
            return await this.sendVideo(chatId, video, {
                caption,
                parse_mode: 'Markdown',
                ...options
            });
        } else if (Buffer.isBuffer(video)) {
            return await this.sendVideo(chatId, video, {
                caption,
                parse_mode: 'Markdown',
                ...options
            });
        } else if (typeof video === 'string' && fs.existsSync(video)) {
            return await this.sendVideo(chatId, fs.createReadStream(video), {
                caption,
                parse_mode: 'Markdown',
                ...options
            });
        }
        throw new Error('Invalid video format');
    };
    
    /**
     * Send message with audio
     */
    bot.sendAudio = async function(chatId, audio, options = {}) {
        if (typeof audio === 'string' && audio.startsWith('http')) {
            return await this.sendAudio(chatId, audio, options);
        } else if (Buffer.isBuffer(audio)) {
            return await this.sendAudio(chatId, audio, options);
        } else if (typeof audio === 'string' && fs.existsSync(audio)) {
            return await this.sendAudio(chatId, fs.createReadStream(audio), options);
        }
        throw new Error('Invalid audio format');
    };
    
    /**
     * Send voice message
     */
    bot.sendVoice = async function(chatId, voice, options = {}) {
        if (typeof voice === 'string' && voice.startsWith('http')) {
            return await this.sendVoice(chatId, voice, options);
        } else if (Buffer.isBuffer(voice)) {
            return await this.sendVoice(chatId, voice, options);
        } else if (typeof voice === 'string' && fs.existsSync(voice)) {
            return await this.sendVoice(chatId, fs.createReadStream(voice), options);
        }
        throw new Error('Invalid voice format');
    };
    
    /**
     * Send document
     */
    bot.sendDocument = async function(chatId, document, options = {}) {
        if (typeof document === 'string' && document.startsWith('http')) {
            return await this.sendDocument(chatId, document, options);
        } else if (Buffer.isBuffer(document)) {
            return await this.sendDocument(chatId, document, options);
        } else if (typeof document === 'string' && fs.existsSync(document)) {
            return await this.sendDocument(chatId, fs.createReadStream(document), options);
        }
        throw new Error('Invalid document format');
    };
    
    /**
     * Send sticker
     */
    bot.sendSticker = async function(chatId, sticker, options = {}) {
        if (typeof sticker === 'string' && sticker.startsWith('http')) {
            return await this.sendSticker(chatId, sticker, options);
        } else if (Buffer.isBuffer(sticker)) {
            return await this.sendSticker(chatId, sticker, options);
        } else if (typeof sticker === 'string' && fs.existsSync(sticker)) {
            return await this.sendSticker(chatId, fs.createReadStream(sticker), options);
        }
        throw new Error('Invalid sticker format');
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

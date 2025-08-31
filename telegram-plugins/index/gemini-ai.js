import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

// Gemini AI Configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyCAn2uQ5z388auV1uYJSymzZubLfFuO8ok';

// Validate API key
if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
    console.warn('⚠️ Gemini API key not configured. Set GEMINI_API_KEY environment variable.');
}
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';
const GEMINI_PRO_VISION_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';

// Memory storage file path
const MEMORY_FILE = './db/gemini-memory.json';

// Ensure memory file exists
if (!fs.existsSync(MEMORY_FILE)) {
    fs.writeFileSync(MEMORY_FILE, JSON.stringify({ users: {} }, null, 2));
}

// Load user memory
function loadUserMemory(userId) {
    try {
        const data = JSON.parse(fs.readFileSync(MEMORY_FILE, 'utf8'));
        if (!data.users[userId]) {
            data.users[userId] = {
                conversations: [],
                preferences: {
                    language: 'English',
                    personality: 'helpful',
                    context_window: 10
                },
                last_interaction: Date.now()
            };
        }
        return data.users[userId];
    } catch (error) {
        console.error('Error loading user memory:', error);
        return {
            conversations: [],
            preferences: {
                language: 'English',
                personality: 'helpful',
                context_window: 10
            },
            last_interaction: Date.now()
        };
    }
}

// Save user memory
function saveUserMemory(userId, userData) {
    try {
        const data = JSON.parse(fs.readFileSync(MEMORY_FILE, 'utf8'));
        data.users[userId] = userData;
        data.users[userId].last_interaction = Date.now();
        fs.writeFileSync(MEMORY_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error saving user memory:', error);
    }
}

// Add conversation to memory
function addToMemory(userId, role, content, timestamp = Date.now()) {
    const userData = loadUserMemory(userId);
    userData.conversations.push({
        role: role,
        content: content,
        timestamp: timestamp
    });
    
    // Keep only the last N conversations based on context window
    const maxConversations = userData.preferences.context_window * 2; // *2 for user + assistant messages
    if (userData.conversations.length > maxConversations) {
        userData.conversations = userData.conversations.slice(-maxConversations);
    }
    
    saveUserMemory(userId, userData);
}

// Build conversation context from memory
function buildConversationContext(userId) {
    const userData = loadUserMemory(userId);
    const context = [];
    
    // Add system prompt
    context.push({
        role: 'user',
        parts: [{
            text: `You are Gemini, a helpful AI assistant. Always respond in English only. 
                   You have persistent memory of our conversations. 
                   Be helpful, accurate, and engaging. 
                   Current personality: ${userData.preferences.personality}`
        }]
    });
    
    // Add conversation history
    userData.conversations.forEach(conv => {
        context.push({
            role: conv.role === 'user' ? 'user' : 'model',
            parts: [{ text: conv.content }]
        });
    });
    
    return context;
}

// Call Gemini API
async function callGeminiAPI(messages, isVision = false) {
    try {
        const url = isVision ? GEMINI_PRO_VISION_URL : GEMINI_API_URL;
        const apiKey = GEMINI_API_KEY;
        
        if (apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
            throw new Error('Gemini API key not configured');
        }
        
        const response = await fetch(`${url}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: messages,
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 2048,
                }
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
        }
        
        const data = await response.json();
        return data.candidates[0]?.content?.parts[0]?.text || 'No response generated';
        
    } catch (error) {
        console.error('Gemini API error:', error);
        throw error;
    }
}

// Process different types of content
async function processContent(userId, content, contentType = 'text') {
    try {
        let messages = [];
        
        if (contentType === 'text') {
            // Text-only conversation
            messages = buildConversationContext(userId);
            messages.push({
                role: 'user',
                parts: [{ text: content }]
            });
        } else if (contentType === 'image') {
            // Image + text conversation
            messages = buildConversationContext(userId);
            messages.push({
                role: 'user',
                parts: [
                    { text: content.text || 'Analyze this image' },
                    {
                        inlineData: {
                            mimeType: content.mimeType || 'image/jpeg',
                            data: content.data
                        }
                    }
                ]
            });
        }
        
        // Call Gemini API
        const response = await callGeminiAPI(messages, contentType === 'image');
        
        // Add to memory
        addToMemory(userId, 'user', content.text || content, Date.now());
        addToMemory(userId, 'assistant', response, Date.now());
        
        return response;
        
    } catch (error) {
        console.error('Error processing content:', error);
        throw error;
    }
}

// Main handler function
const handler = async (m, { bot, text, args }) => {
    const userId = m.from_user?.id || m.chat;
    
    // Check if user has a message or image
    if (!text && !m.photo && !m.document) {
        const helpMessage = `🤖 *Gemini AI Assistant*

*Usage:*
• \`/gemini <your message>\` - Chat with Gemini
• \`/gemini memory\` - View your conversation history
• \`/gemini clear\` - Clear your conversation history
• \`/gemini personality <type>\` - Change personality (helpful, creative, professional, friendly)
• \`/gemini context <number>\` - Set context window size (5-20)

*Features:*
• Persistent memory across sessions
• Full Gemini API capabilities
• Image analysis support
• Personalized responses
• English-only processing

*Example:*
\`/gemini What's the weather like today?\``;
        
        return bot.sendMessage(m.chat, helpMessage, {
            parse_mode: 'Markdown',
            reply_to_message_id: m.id
        });
    }
    
    try {
        // Handle special commands
        if (text && text.toLowerCase().startsWith('memory')) {
            const userData = loadUserMemory(userId);
            const recentConversations = userData.conversations.slice(-6);
            
            let memoryText = `🧠 *Your Recent Conversations*\n\n`;
            recentConversations.forEach((conv, index) => {
                const role = conv.role === 'user' ? '👤' : '🤖';
                const content = conv.content.length > 50 ? 
                    conv.content.substring(0, 50) + '...' : conv.content;
                memoryText += `${role} *${conv.role}:* ${content}\n\n`;
            });
            
            return bot.sendMessage(m.chat, memoryText, {
                parse_mode: 'Markdown',
                reply_to_message_id: m.id
            });
        }
        
        if (text && text.toLowerCase().startsWith('clear')) {
            const userData = loadUserMemory(userId);
            userData.conversations = [];
            saveUserMemory(userId, userData);
            
            return bot.sendMessage(m.chat, '🗑️ *Conversation history cleared successfully!*', {
                parse_mode: 'Markdown',
                reply_to_message_id: m.id
            });
        }
        
        if (text && text.toLowerCase().startsWith('personality')) {
            const personality = args[1] || 'helpful';
            const validPersonalities = ['helpful', 'creative', 'professional', 'friendly', 'humorous'];
            
            if (!validPersonalities.includes(personality)) {
                return bot.sendMessage(m.chat, `❌ *Invalid personality. Choose from: ${validPersonalities.join(', ')}*`, {
                    parse_mode: 'Markdown',
                    reply_to_message_id: m.id
                });
            }
            
            const userData = loadUserMemory(userId);
            userData.preferences.personality = personality;
            saveUserMemory(userId, userData);
            
            return bot.sendMessage(m.chat, `🎭 *Personality changed to: ${personality}*`, {
                parse_mode: 'Markdown',
                reply_to_message_id: m.id
            });
        }
        
        if (text && text.toLowerCase().startsWith('context')) {
            const contextSize = parseInt(args[1]) || 10;
            
            if (contextSize < 5 || contextSize > 20) {
                return bot.sendMessage(m.chat, '❌ *Context window must be between 5 and 20*', {
                    parse_mode: 'Markdown',
                    reply_to_message_id: m.id
                });
            }
            
            const userData = loadUserMemory(userId);
            userData.preferences.context_window = contextSize;
            saveUserMemory(userId, userData);
            
            return bot.sendMessage(m.chat, `🔧 *Context window set to: ${contextSize} conversations*`, {
                parse_mode: 'Markdown',
                reply_to_message_id: m.id
            });
        }
        
        // Send processing message
        const processingMsg = await bot.sendMessage(m.chat, '🤖 *Processing your request with Gemini AI...*', {
            parse_mode: 'Markdown',
            reply_to_message_id: m.id
        });
        
        let response;
        
        // Handle image analysis
        if (m.photo && m.photo.length > 0) {
            try {
                const photo = m.photo[m.photo.length - 1]; // Get highest quality photo
                const file = await bot.getFile(photo.file_id);
                
                // Use axios or fetch with proper buffer handling
                let imageBuffer;
                try {
                    const response = await fetch(file.file_path);
                    if (response.ok) {
                        const arrayBuffer = await response.arrayBuffer();
                        imageBuffer = Buffer.from(arrayBuffer);
                    } else {
                        throw new Error('Failed to fetch image');
                    }
                } catch (fetchError) {
                    // Fallback to axios if fetch fails
                    const axios = (await import('axios')).default;
                    const axiosResponse = await axios.get(file.file_path, { responseType: 'arraybuffer' });
                    imageBuffer = Buffer.from(axiosResponse.data);
                }
                
                const base64Image = imageBuffer.toString('base64');
                
                const imageContent = {
                    text: text || 'Analyze this image and describe what you see',
                    mimeType: 'image/jpeg',
                    data: base64Image
                };
                
                response = await processContent(userId, imageContent, 'image');
            } catch (imageError) {
                console.error('Image processing error:', imageError);
                response = await processContent(userId, 'I received an image but had trouble processing it. Please try sending it again or describe what you see.', 'text');
            }
            
        } else if (m.document && m.document.mime_type && m.document.mime_type.startsWith('image/')) {
            try {
                // Handle image documents
                const file = await bot.getFile(m.document.file_id);
                
                let imageBuffer;
                try {
                    const response = await fetch(file.file_path);
                    if (response.ok) {
                        const arrayBuffer = await response.arrayBuffer();
                        imageBuffer = Buffer.from(arrayBuffer);
                    } else {
                        throw new Error('Failed to fetch image');
                    }
                } catch (fetchError) {
                    // Fallback to axios if fetch fails
                    const axios = (await import('axios')).default;
                    const axiosResponse = await axios.get(file.file_path, { responseType: 'arraybuffer' });
                    imageBuffer = Buffer.from(axiosResponse.data);
                }
                
                const base64Image = imageBuffer.toString('base64');
                
                const imageContent = {
                    text: text || 'Analyze this image and describe what you see',
                    mimeType: m.document.mime_type,
                    data: base64Image
                };
                
                response = await processContent(userId, imageContent, 'image');
            } catch (imageError) {
                console.error('Image processing error:', imageError);
                response = await processContent(userId, 'I received an image document but had trouble processing it. Please try sending it again or describe what you see.', 'text');
            }
            
        } else {
            // Handle text-only conversation
            response = await processContent(userId, text, 'text');
        }
        
        // Delete processing message
        try {
            await bot.deleteMessage(m.chat, processingMsg.message_id);
        } catch (e) {
            // Ignore deletion errors
        }
        
        // Send response
        await bot.sendMessage(m.chat, `🤖 *Gemini AI Response:*\n\n${response}`, {
            parse_mode: 'Markdown',
            reply_to_message_id: m.id
        });
        
    } catch (error) {
        console.error('Gemini AI handler error:', error);
        
        let errorMessage = '❌ *An error occurred while processing your request.*';
        
        if (error.message.includes('API key not configured')) {
            errorMessage = '❌ *Gemini API key not configured. Please set GEMINI_API_KEY environment variable.*';
        } else if (error.message.includes('Gemini API error')) {
            errorMessage = '❌ *Gemini API error. Please try again later.*';
        } else if (error.message.includes('rate limit')) {
            errorMessage = '⏳ *Rate limit exceeded. Please wait a moment before trying again.*';
        }
        
        await bot.sendMessage(m.chat, errorMessage, {
            parse_mode: 'Markdown',
            reply_to_message_id: m.id
        });
    }
};

// Command registration
handler.help = [
    'gemini <message> - Chat with Gemini AI',
    'gemini memory - View conversation history',
    'gemini clear - Clear conversation history',
    'gemini personality <type> - Change AI personality',
    'gemini context <number> - Set context window size'
];

handler.tags = ['ai', 'assistant', 'gemini'];
handler.command = ['gemini', 'ai', 'assistant'];
handler.register = false;

export default handler; 
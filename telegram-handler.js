import { format } from 'util' 
import { fileURLToPath } from 'url'
import path, { join } from 'path'
import { unwatchFile, watchFile } from 'fs'
import chalk from 'chalk'
import fetch from 'node-fetch'

const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function () {
    clearTimeout(this)
    resolve()
}, ms))

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

// Telegram message adapter - converts Telegram message to WhatsApp-like format
function adaptTelegramMessage(msg) {
    const adapted = {
        // Basic message info
        id: msg.message_id,
        chat: msg.chat.id,
        sender: msg.from.id,
        from: msg.from,
        
        // Message content
        text: msg.text || msg.caption || '',
        body: msg.text || msg.caption || '',
        
        // Message type detection
        mtype: getMessageType(msg),
        
        // User info
        pushName: msg.from.first_name + (msg.from.last_name ? ' ' + msg.from.last_name : ''),
        name: msg.from.first_name + (msg.from.last_name ? ' ' + msg.from.last_name : ''),
        
        // Chat info
        isGroup: msg.chat.type === 'group' || msg.chat.type === 'supergroup',
        isPrivate: msg.chat.type === 'private',
        
        // Media info
        photo: msg.photo,
        video: msg.video,
        audio: msg.audio,
        voice: msg.voice,
        document: msg.document,
        sticker: msg.sticker,
        
        // Reply info
        quoted: msg.reply_to_message ? adaptTelegramMessage(msg.reply_to_message) : null,
        
        // Bot reference
        bot: global.bot,
        
        // Utility functions
        reply: async function(text, options = {}) {
            return await global.bot.sendMessage(this.chat, text, {
                reply_to_message_id: this.id,
                parse_mode: 'Markdown',
                ...options
            });
        },

        // React function for Telegram (simulated)
        react: async function(emoji) {
            // Telegram doesn't have native reactions like WhatsApp
            // We can log it or implement alternative feedback
            console.log(`React: ${emoji} for message ${this.id}`);
            return true;
        },
        
        // Download media function
        download: async function() {
            if (this.photo) {
                const fileId = this.photo[this.photo.length - 1].file_id;
                const file = await global.bot.getFile(fileId);
                const url = `https://api.telegram.org/file/bot${global.telegramBotToken}/${file.file_path}`;
                const response = await fetch(url);
                return await response.buffer();
            }
            if (this.video) {
                const file = await global.bot.getFile(this.video.file_id);
                const url = `https://api.telegram.org/file/bot${global.telegramBotToken}/${file.file_path}`;
                const response = await fetch(url);
                return await response.buffer();
            }
            if (this.audio) {
                const file = await global.bot.getFile(this.audio.file_id);
                const url = `https://api.telegram.org/file/bot${global.telegramBotToken}/${file.file_path}`;
                const response = await fetch(url);
                return await response.buffer();
            }
            if (this.voice) {
                const file = await global.bot.getFile(this.voice.file_id);
                const url = `https://api.telegram.org/file/bot${global.telegramBotToken}/${file.file_path}`;
                const response = await fetch(url);
                return await response.buffer();
            }
            if (this.document) {
                const file = await global.bot.getFile(this.document.file_id);
                const url = `https://api.telegram.org/file/bot${global.telegramBotToken}/${file.file_path}`;
                const response = await fetch(url);
                return await response.buffer();
            }
            if (this.sticker) {
                const file = await global.bot.getFile(this.sticker.file_id);
                const url = `https://api.telegram.org/file/bot${global.telegramBotToken}/${file.file_path}`;
                const response = await fetch(url);
                return await response.buffer();
            }
            return null;
        }
    };
    
    return adapted;
}

function getMessageType(msg) {
    if (msg.text) return 'conversation';
    if (msg.photo) return 'imageMessage';
    if (msg.video) return 'videoMessage';
    if (msg.audio) return 'audioMessage';
    if (msg.voice) return 'audioMessage';
    if (msg.document) return 'documentMessage';
    if (msg.sticker) return 'stickerMessage';
    if (msg.location) return 'locationMessage';
    if (msg.contact) return 'contactMessage';
    return 'conversation';
}

export async function telegramHandler(msg) {
    if (!msg) return;

    // console.log('📨 Received message:', msg.text || msg.caption || '[media]');

    // Load database if needed
    if (global.db.data == null) await global.loadDatabase();
    
    try {
        // Adapt Telegram message to WhatsApp-like format
        const m = adaptTelegramMessage(msg);
        if (!m) return;
        
        m.exp = 0;
        m.limit = false;
        
        try {
            // User management
            let user = global.db.data.users[m.sender];
            if (typeof user !== 'object') global.db.data.users[m.sender] = {};
            if (user) {
                if (!isNumber(user.exp)) user.exp = 0;
                if (!isNumber(user.limit)) user.limit = 10;
                if (!('premium' in user)) user.premium = false;
                if (!user.premium) user.premiumTime = 0;
                if (!('registered' in user)) user.registered = false;
                if (!user.registered) {
                    if (!('name' in user)) user.name = m.name;
                    if (!isNumber(user.age)) user.age = -1;
                    if (!isNumber(user.regTime)) user.regTime = -1;
                }
                if (!isNumber(user.afk)) user.afk = -1;
                if (!('afkReason' in user)) user.afkReason = '';
                if (!('banned' in user)) user.banned = false;
                if (!isNumber(user.warn)) user.warn = 0;
                if (!isNumber(user.level)) user.level = 0;
                if (!('role' in user)) user.role = 'Beginner';
                if (!('autolevelup' in user)) user.autolevelup = true;
                if (!isNumber(user.money)) user.money = 0;
                if (!isNumber(user.health)) user.health = 100;
                if (!isNumber(user.potion)) user.potion = 0;
                if (!isNumber(user.trash)) user.trash = 0;
                if (!isNumber(user.wood)) user.wood = 0;
                if (!isNumber(user.rock)) user.rock = 0;
                if (!isNumber(user.string)) user.string = 0;
                if (!isNumber(user.petFood)) user.petFood = 0;
                if (!isNumber(user.emerald)) user.emerald = 0;
                if (!isNumber(user.diamond)) user.diamond = 0;
                if (!isNumber(user.gold)) user.gold = 0;
                if (!isNumber(user.iron)) user.iron = 0;
                if (!isNumber(user.common)) user.common = 0;
                if (!isNumber(user.uncommon)) user.uncommon = 0;
                if (!isNumber(user.mythic)) user.mythic = 0;
                if (!isNumber(user.legendary)) user.legendary = 0;
                if (!isNumber(user.pet)) user.pet = 0;
                if (!isNumber(user.horse)) user.horse = 0;
                if (!isNumber(user.horseexp)) user.horseexp = 0;
                if (!isNumber(user.cat)) user.cat = 0;
                if (!isNumber(user.catexp)) user.catexp = 0;
                if (!isNumber(user.fox)) user.fox = 0;
                if (!isNumber(user.foxhexp)) user.foxhexp = 0;
                if (!isNumber(user.dog)) user.dog = 0;
                if (!isNumber(user.dogexp)) user.dogexp = 0;
                if (!isNumber(user.robo)) user.robo = 0;
                if (!isNumber(user.roboexp)) user.roboexp = 0;
                if (!isNumber(user.lastclaim)) user.lastclaim = 0;
                if (!isNumber(user.lastadventure)) user.lastadventure = 0;
                if (!isNumber(user.lastfishing)) user.lastfishing = 0;
                if (!isNumber(user.lastdungeon)) user.lastdungeon = 0;
                if (!isNumber(user.lastduel)) user.lastduel = 0;
                if (!isNumber(user.lastmining)) user.lastmining = 0;
                if (!isNumber(user.lasthunt)) user.lasthunt = 0;
                if (!isNumber(user.lastweekly)) user.lastweekly = 0;
                if (!isNumber(user.lastmonthly)) user.lastmonthly = 0;
            } else {
                global.db.data.users[m.sender] = {
                    exp: 0,
                    limit: 10,
                    premium: false,
                    premiumTime: 0,
                    registered: false,
                    name: m.name,
                    age: -1,
                    regTime: -1,
                    afk: -1,
                    afkReason: '',
                    banned: false,
                    warn: 0,
                    level: 0,
                    role: 'Beginner',
                    autolevelup: true,
                    money: 0,
                    health: 100,
                    potion: 0,
                    trash: 0,
                    wood: 0,
                    rock: 0,
                    string: 0,
                    petFood: 0,
                    emerald: 0,
                    diamond: 0,
                    gold: 0,
                    iron: 0,
                    common: 0,
                    uncommon: 0,
                    mythic: 0,
                    legendary: 0,
                    pet: 0,
                    horse: 0,
                    horseexp: 0,
                    cat: 0,
                    catexp: 0,
                    fox: 0,
                    foxhexp: 0,
                    dog: 0,
                    dogexp: 0,
                    robo: 0,
                    roboexp: 0,
                    lastclaim: 0,
                    lastadventure: 0,
                    lastfishing: 0,
                    lastdungeon: 0,
                    lastduel: 0,
                    lastmining: 0,
                    lasthunt: 0,
                    lastweekly: 0,
                    lastmonthly: 0,
                };
            }
        } catch (e) {
            console.error(e);
        }
        
        // Chat management
        let chat = global.db.data.chats[m.chat];
        if (typeof chat !== 'object') global.db.data.chats[m.chat] = {};
        if (chat) {
            if (!('isBanned' in chat)) chat.isBanned = false;
            if (!('welcome' in chat)) chat.welcome = true;
            if (!('detect' in chat)) chat.detect = false;
            if (!('sWelcome' in chat)) chat.sWelcome = '';
            if (!('sBye' in chat)) chat.sBye = '';
            if (!('sPromote' in chat)) chat.sPromote = '';
            if (!('sDemote' in chat)) chat.sDemote = '';
            if (!('delete' in chat)) chat.delete = true;
            if (!('antiLink' in chat)) chat.antiLink = false;
            if (!('viewonce' in chat)) chat.viewonce = true;
            if (!isNumber(chat.expired)) chat.expired = 0;
        } else {
            global.db.data.chats[m.chat] = {
                isBanned: false,
                welcome: true,
                detect: false,
                sWelcome: '',
                sBye: '',
                sPromote: '',
                sDemote: '',
                delete: true,
                antiLink: false,
                viewonce: true,
                expired: 0,
            };
        }

        // Settings
        let settings = global.db.data.settings[global.bot.id];
        if (typeof settings !== 'object') global.db.data.settings[global.bot.id] = {};
        if (settings) {
            if (!('self' in settings)) settings.self = false;
            if (!('autoread' in settings)) settings.autoread = false;
            if (!('restrict' in settings)) settings.restrict = false;
        } else {
            global.db.data.settings[global.bot.id] = {
                self: false,
                autoread: false,
                restrict: false,
            };
        }

        // Plugin processing
        if (m.text && typeof m.text === 'string') {
            let _user = global.db.data.users[m.sender];
            let _chat = global.db.data.chats[m.chat];
            let _settings = global.db.data.settings[global.bot.id] || {};

            // Check if user is banned
            if (_user.banned) return;

            // Check if chat is banned
            if (_chat.isBanned) return;

            // Check if bot is in self mode and user is not owner
            if (_settings.self && !global.owner.map(([id]) => id).includes(m.sender.toString())) return;

            // Process commands
            let usedPrefix = '';
            let _args = m.text.trim().split` `.slice(1);
            let args = _args.map(v => v.toLowerCase());
            let command = '';

            // Check for prefix
            const prefixes = ['.', '/', '#', '!'];
            for (let prefix of prefixes) {
                if (m.text.startsWith(prefix)) {
                    usedPrefix = prefix;
                    command = m.text.slice(prefix.length).trim().split` `[0].toLowerCase();
                    break;
                }
            }

            // If no prefix found, check if it's a command without prefix
            if (!usedPrefix && m.text.startsWith('/')) {
                usedPrefix = '/';
                command = m.text.slice(1).trim().split` `[0].toLowerCase();
            }

            if (command) {
                // console.log('🎯 Command found:', command, 'with prefix:', usedPrefix);
                let text = m.text.slice(usedPrefix.length + command.length).trim();

                // Check permissions
                let isOwner = global.owner.map(([id]) => id).includes(m.sender.toString());
                let isAdmin = false;
                let isBotAdmin = false;

                // For groups, check admin status
                if (m.isGroup) {
                    try {
                        let chatAdmins = await global.bot.getChatAdministrators(m.chat);
                        isAdmin = chatAdmins.some(admin => admin.user.id === m.sender);
                        isBotAdmin = chatAdmins.some(admin => admin.user.id === global.bot.id);
                    } catch (e) {
                        console.error('Error getting chat administrators:', e);
                    }
                }

                // Process plugins
                // console.log('🔌 Processing plugins, total:', Object.keys(global.plugins).length);
                for (let name in global.plugins) {
                    let plugin = global.plugins[name];
                    if (!plugin) continue;
                    if (plugin.disabled) continue;

                    // Check if command matches
                    let match = false;
                    if (plugin.command) {
                        if (typeof plugin.command === 'string') {
                            match = command === plugin.command;
                        } else if (plugin.command instanceof RegExp) {
                            match = plugin.command.test(command);
                        } else if (Array.isArray(plugin.command)) {
                            match = plugin.command.includes(command);
                        }
                    }

                    if (!match) continue;

                    // Check permissions
                    if (plugin.owner && !isOwner) continue;
                    if (plugin.admin && !isAdmin) continue;
                    if (plugin.group && !m.isGroup) continue;
                    if (plugin.private && m.isGroup) continue;
                    if (plugin.botAdmin && !isBotAdmin) continue;

                    // Check premium
                    if (plugin.premium && !_user.premium) continue;

                    // Check registration
                    if (plugin.register && !_user.registered) continue;

                    // Execute plugin
                    try {
                        await plugin.call(global.bot, m, {
                            usedPrefix,
                            command,
                            args,
                            _args,
                            text,
                            conn: global.bot,
                            bot: global.bot,
                            isOwner,
                            isAdmin,
                            isBotAdmin,
                            user: _user,
                            chat: _chat,
                            settings: _settings
                        });

                        // Update stats
                        if (!global.db.data.stats[name]) {
                            global.db.data.stats[name] = {
                                total: 0,
                                success: 0,
                                last: 0,
                                lastSuccess: 0
                            };
                        }
                        global.db.data.stats[name].total++;
                        global.db.data.stats[name].success++;
                        global.db.data.stats[name].last = Date.now();
                        global.db.data.stats[name].lastSuccess = Date.now();

                    } catch (e) {
                        console.error(`Error in plugin ${name}:`, e);

                        // Update error stats
                        if (!global.db.data.stats[name]) {
                            global.db.data.stats[name] = {
                                total: 0,
                                success: 0,
                                last: 0,
                                lastSuccess: 0
                            };
                        }
                        global.db.data.stats[name].total++;
                        global.db.data.stats[name].last = Date.now();

                        // Send simplified error message
                        let errorText = e.message || 'Unknown error';
                        // Clean up error text for Telegram
                        errorText = errorText.replace(/[_*[\]()~`>#+=|{}.!-]/g, '\\$&');
                        errorText = errorText.substring(0, 200); // Limit length

                        await bot.sendMessage(m.chat, `❌ Error in command: ${errorText}`, {
                            reply_to_message_id: m.id
                        });
                    }

                    break; // Only execute first matching plugin
                }
            }
        }
        
    } catch (e) {
        console.error(e);
    }
}

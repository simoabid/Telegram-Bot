import fs from 'fs'
import path from 'path'

/**
 * Plugin converter utility to convert WhatsApp plugins to Telegram
 */

const whatsappToTelegramMappings = {
    // Connection object mappings
    'conn.reply': 'bot.reply',
    'conn.sendMessage': 'bot.sendMessage',
    'conn.sendFile': 'bot.sendDocument',
    'conn.sendImage': 'bot.sendImage',
    'conn.sendVideo': 'bot.sendVideo',
    'conn.sendAudio': 'bot.sendAudio',
    'conn.sendSticker': 'bot.sendSticker',
    'conn.getName': 'bot.getName',
    'conn.groupMetadata': 'bot.getGroupMetadata',
    'conn.isAdmin': 'bot.isAdmin',
    'conn.isBotAdmin': 'bot.isBotAdmin',
    
    // Message object mappings
    'm.chat': 'm.chat',
    'm.sender': 'm.sender',
    'm.text': 'm.text',
    'm.body': 'm.body',
    'm.quoted': 'm.quoted',
    'm.isGroup': 'm.isGroup',
    'm.reply': 'm.reply',
    'm.download': 'm.download',
    
    // Context mappings
    'conn': 'bot',
    'rcanal': '{}', // Remove WhatsApp-specific channel references
    
    // Group admin checks
    'isAdmin': 'isAdmin',
    'isBotAdmin': 'isBotAdmin',
    'isOwner': 'isOwner',
    
    // Database remains the same
    'global.db': 'global.db',
    
    // Prefix usage
    'usedPrefix': 'usedPrefix'
};

/**
 * Convert a WhatsApp plugin file to Telegram format
 * @param {string} inputPath - Path to WhatsApp plugin
 * @param {string} outputPath - Path for Telegram plugin
 */
export function convertPlugin(inputPath, outputPath) {
    try {
        let content = fs.readFileSync(inputPath, 'utf8');
        
        // Apply mappings
        for (const [whatsapp, telegram] of Object.entries(whatsappToTelegramMappings)) {
            const regex = new RegExp(whatsapp.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
            content = content.replace(regex, telegram);
        }
        
        // Fix specific WhatsApp patterns
        content = fixWhatsAppPatterns(content);
        
        // Ensure output directory exists
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        // Write converted plugin
        fs.writeFileSync(outputPath, content);
        
        console.log(`✅ Converted: ${inputPath} -> ${outputPath}`);
        return true;
        
    } catch (error) {
        console.error(`❌ Error converting ${inputPath}:`, error.message);
        return false;
    }
}

/**
 * Fix WhatsApp-specific patterns for Telegram
 * @param {string} content - Plugin content
 * @returns {string} Fixed content
 */
function fixWhatsAppPatterns(content) {
    // Remove WhatsApp-specific imports
    content = content.replace(/import.*baileys.*\n/g, '');
    content = content.replace(/import.*simple\.js.*\n/g, '');
    
    // Fix message sending patterns
    content = content.replace(
        /await bot\.sendMessage\(([^,]+),\s*\{([^}]+)\},\s*\{[^}]*quoted:[^}]*\}\)/g,
        'await bot.sendMessage($1, $2)'
    );
    
    // Fix reply patterns with rcanal
    content = content.replace(
        /bot\.reply\(([^,]+),\s*([^,]+),\s*([^,]+),\s*rcanal\)/g,
        'bot.reply($1, $2, $3)'
    );
    
    // Fix group metadata calls
    content = content.replace(
        /await bot\.groupMetadata\(([^)]+)\)/g,
        'await bot.getGroupMetadata($1)'
    );
    
    // Fix admin checks
    content = content.replace(
        /participants\.map\(([^)]+)\)/g,
        '(await bot.getGroupMetadata(m.chat)).admins'
    );
    
    // Fix WhatsApp JID patterns
    content = content.replace(
        /@s\.whatsapp\.net/g,
        ''
    );
    
    // Fix button/list message patterns (convert to inline keyboards)
    content = content.replace(
        /templateButtons/g,
        'inline_keyboard'
    );
    
    // Fix media download patterns
    content = content.replace(
        /let media = await m\.download\(\)/g,
        'let media = await m.download()'
    );
    
    // Fix fake reply patterns (remove WhatsApp-specific)
    content = content.replace(
        /const fkontak = \{[^}]+\}/gs,
        'const fkontak = {}'
    );
    
    // Fix channel references
    content = content.replace(
        /global\.ch\./g,
        'global.ch.'
    );
    
    return content;
}

/**
 * Convert all plugins from WhatsApp to Telegram
 */
export function convertAllPlugins() {
    const pluginsDir = './plugins';
    const telegramPluginsDir = './telegram-plugins/index';
    
    if (!fs.existsSync(pluginsDir)) {
        console.error('❌ Plugins directory not found');
        return;
    }
    
    // Create telegram plugins directory
    if (!fs.existsSync(telegramPluginsDir)) {
        fs.mkdirSync(telegramPluginsDir, { recursive: true });
    }
    
    const files = fs.readdirSync(pluginsDir);
    let converted = 0;
    let failed = 0;
    
    for (const file of files) {
        if (file.endsWith('.js')) {
            const inputPath = path.join(pluginsDir, file);
            const outputPath = path.join(telegramPluginsDir, file);
            
            if (convertPlugin(inputPath, outputPath)) {
                converted++;
            } else {
                failed++;
            }
        }
    }
    
    console.log(`\n📊 Conversion Summary:`);
    console.log(`✅ Converted: ${converted} plugins`);
    console.log(`❌ Failed: ${failed} plugins`);
    console.log(`📁 Output directory: ${telegramPluginsDir}`);
}

/**
 * Convert specific plugin
 * @param {string} pluginName - Name of plugin to convert
 */
export function convertSpecificPlugin(pluginName) {
    const inputPath = `./plugins/${pluginName}`;
    const outputPath = `./telegram-plugins/index/${pluginName}`;
    
    if (!fs.existsSync(inputPath)) {
        console.error(`❌ Plugin not found: ${inputPath}`);
        return false;
    }
    
    return convertPlugin(inputPath, outputPath);
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
    const command = process.argv[2];
    
    if (command === 'all') {
        convertAllPlugins();
    } else if (command === 'plugin' && process.argv[3]) {
        convertSpecificPlugin(process.argv[3]);
    } else {
        console.log('Usage:');
        console.log('  node convert-plugins.js all          # Convert all plugins');
        console.log('  node convert-plugins.js plugin <name> # Convert specific plugin');
    }
}

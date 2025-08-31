import path from 'path';
import { fileURLToPath } from 'url';
import { executePythonScript } from '../../lib/python-utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handler = async (m, { bot }) => {
    const args = m.text.split(' ').slice(1);
    
    // Check if letter is provided
    if (!args[0]) {
        const message = `❌ *Usage:* !phtags <letter>\n\n*Examples:*\n!phtags a\n!phtags b\n!phtags z\n\n*Note:* Use a single letter to browse tags`;
        return bot.sendMessage(m.chat, message, { parse_mode: 'Markdown' });
    }

    const letter = args[0].toLowerCase();
    
    // Validate letter
    if (!/^[a-z]$/.test(letter)) {
        const message = `❌ *Invalid input:* Please provide a single letter (a-z)\n\n*Example:* !phtags a`;
        return bot.sendMessage(m.chat, message, { parse_mode: 'Markdown' });
    }
    
    try {
        // Show loading message
        const tagsMsg = await bot.sendMessage(m.chat, `🏷️ *Loading tags starting with "${letter}"...*\n⏳ Please wait...`, { parse_mode: 'Markdown' });
        
        // Get the correct path to the Python script
        const scriptPath = path.join(__dirname, '..', '..', 'pornhub-bot.py');
        
        // Execute Python script using shared utility
        const { stdout, stderr } = await executePythonScript(scriptPath, ['tags', letter]);
        
        if (stderr) {
            console.error('Python script stderr:', stderr);
        }
        
        let result;
        try {
            result = JSON.parse(stdout);
        } catch (parseError) {
            console.error('Failed to parse Python output:', parseError);
            console.error('Raw output:', stdout);
            return bot.editMessageText('❌ *Error:* Failed to load tags', {
                chat_id: m.chat,
                message_id: tagsMsg.message_id,
                parse_mode: 'Markdown'
            });
        }
        
        if (!result.success) {
            return bot.editMessageText(`❌ *Tags Error:* ${result.error}`, {
                chat_id: m.chat,
                message_id: tagsMsg.message_id,
                parse_mode: 'Markdown'
            });
        }
        
        if (!result.tags || result.tags.length === 0) {
            return bot.editMessageText(`🏷️ *No tags found* starting with "${letter}"`, {
                chat_id: m.chat,
                message_id: tagsMsg.message_id,
                parse_mode: 'Markdown'
            });
        }
        
        // Format tags
        let response = `🏷️ *Pornhub Tags - Letter "${letter.toUpperCase()}"*\n`;
        response += `📊 *Total Tags:* ${result.total_count}\n\n`;
        
        // Group tags in columns
        const tags = result.tags.sort();
        const chunks = [];
        for (let i = 0; i < tags.length; i += 6) {
            chunks.push(tags.slice(i, i + 6));
        }
        
        // Show first few chunks
        const maxChunks = Math.min(4, chunks.length);
        for (let i = 0; i < maxChunks; i++) {
            response += `${chunks[i].join(', ')}\n\n`;
        }
        
        if (chunks.length > maxChunks) {
            response += `... and ${chunks.length - maxChunks} more groups\n`;
        }
        
        response += `💡 *Tip:* Use \`!pornhub <tag>\` to search for videos with specific tags`;
        
        // Update the message with tags
        await bot.editMessageText(response, {
            chat_id: m.chat,
            message_id: tagsMsg.message_id,
            parse_mode: 'Markdown'
        });
        
    } catch (error) {
        console.error('Pornhub tags error:', error);
        return bot.sendMessage(m.chat, `❌ *Error:* ${error.message}`, { parse_mode: 'Markdown' });
    }
};

handler.help = ['phtags <letter>'];
handler.tags = ['search'];
handler.command = ['phtags', 'phtag', 'porntags'];

export default handler; 
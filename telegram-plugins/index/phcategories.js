import path from 'path';
import { fileURLToPath } from 'url';
import { executePythonScript } from '../../lib/python-utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handler = async (m, { bot }) => {
    try {
        // Show loading message
        const catMsg = await bot.sendMessage(m.chat, `📂 *Loading Pornhub categories...*\n⏳ Please wait...`, { parse_mode: 'Markdown' });
        
        // Get the correct path to the Python script
        const scriptPath = path.join(__dirname, '..', '..', 'pornhub-bot.py');
        
        // Execute Python script using shared utility
        const { stdout, stderr } = await executePythonScript(scriptPath, ['categories']);
        
        if (stderr) {
            console.error('Python script stderr:', stderr);
        }
        
        let result;
        try {
            result = JSON.parse(stdout);
        } catch (parseError) {
            console.error('Failed to parse Python output:', parseError);
            console.error('Raw output:', stdout);
            return bot.editMessageText('❌ *Error:* Failed to load categories', {
                chat_id: m.chat,
                message_id: catMsg.message_id,
                parse_mode: 'Markdown'
            });
        }
        
        if (!result.success) {
            return bot.editMessageText(`❌ *Categories Error:* ${result.error}`, {
                chat_id: m.chat,
                message_id: catMsg.message_id,
                parse_mode: 'Markdown'
            });
        }
        
        if (!result.categories || result.categories.length === 0) {
            return bot.editMessageText('❌ *No categories found*', {
                chat_id: m.chat,
                message_id: catMsg.message_id,
                parse_mode: 'Markdown'
            });
        }
        
        // Format categories
        let response = `📂 *Pornhub Categories*\n`;
        response += `📊 *Total Categories:* ${result.total_count}\n\n`;
        
        // Group categories alphabetically
        const categories = result.categories.sort();
        const chunks = [];
        for (let i = 0; i < categories.length; i += 8) {
            chunks.push(categories.slice(i, i + 8));
        }
        
        // Show first few chunks
        const maxChunks = Math.min(3, chunks.length);
        for (let i = 0; i < maxChunks; i++) {
            response += `*${String.fromCharCode(65 + i)}-${String.fromCharCode(65 + i + 7)}:* ${chunks[i].join(', ')}\n\n`;
        }
        
        if (chunks.length > maxChunks) {
            response += `... and ${chunks.length - maxChunks} more groups\n`;
        }
        
        response += `💡 *Tip:* Use \`!pornhub <category>\` to search within a category`;
        
        // Update the message with categories
        await bot.editMessageText(response, {
            chat_id: m.chat,
            message_id: catMsg.message_id,
            parse_mode: 'Markdown'
        });
        
    } catch (error) {
        console.error('Pornhub categories error:', error);
        return bot.sendMessage(m.chat, `❌ *Error:* ${error.message}`, { parse_mode: 'Markdown' });
    }
};

handler.help = ['phcategories'];
handler.tags = ['search'];
handler.command = ['phcategories', 'phcats', 'porncats'];

export default handler; 
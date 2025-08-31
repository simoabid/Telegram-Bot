import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';
import { executePythonScript } from '../../lib/python-utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handler = async (m, { bot }) => {
    const args = m.text.split(' ').slice(1);
    
    // Check if query is provided
    if (!args[0]) {
        const message = `❌ *Usage:* !pornhub <search query>\n\n*Examples:*\n!pornhub example\n!pornhub trending\n!pornhub categories`;
        return bot.sendMessage(m.chat, message, { parse_mode: 'Markdown' });
    }

    const query = args.join(' ');
    
    try {
        // Show searching message
        const searchMsg = await bot.sendMessage(m.chat, `🔍 *Searching Pornhub for:* "${query}"\n⏳ Please wait...`, { parse_mode: 'Markdown' });
        
        // Get the correct path to the Python script
        const scriptPath = path.join(__dirname, '..', '..', 'pornhub-bot.py');
        
        // Execute Python script using shared utility
        const { stdout, stderr } = await executePythonScript(scriptPath, ['search', query]);
        
        if (stderr) {
            console.error('Python script stderr:', stderr);
        }
        
        let result;
        try {
            result = JSON.parse(stdout);
        } catch (parseError) {
            console.error('Failed to parse Python output:', parseError);
            console.error('Raw output:', stdout);
            return bot.editMessageText('❌ *Error:* Failed to parse search results', {
                chat_id: m.chat,
                message_id: searchMsg.message_id,
                parse_mode: 'Markdown'
            });
        }
        
        if (!result.success) {
            return bot.editMessageText(`❌ *Search Error:* ${result.error}`, {
                chat_id: m.chat,
                message_id: searchMsg.message_id,
                parse_mode: 'Markdown'
            });
        }
        
        if (!result.videos || result.videos.length === 0) {
            return bot.editMessageText(`🔍 *No videos found* for: "${query}"\n\nTry different keywords or check spelling.`, {
                chat_id: m.chat,
                message_id: searchMsg.message_id,
                parse_mode: 'Markdown'
            });
        }
        
        // Format results
        let response = `🔍 *Pornhub Search Results:* "${query}"\n`;
        response += `📊 *Found:* ${result.total_count} videos\n`;
        response += `📄 *Page:* ${result.page}\n\n`;
        
        // Show first 5 results
        const maxResults = Math.min(5, result.videos.length);
        for (let i = 0; i < maxResults; i++) {
            const video = result.videos[i];
            response += `${i + 1}. *${video.title}*\n`;
            response += `⏱️ *Duration:* ${video.duration}\n`;
            response += `👁️ *Views:* ${video.views.toLocaleString()}\n`;
            response += `⭐ *Rating:* ${video.rating}/5 (${video.ratings_count} ratings)\n`;
            response += `📅 *Published:* ${video.publish_date}\n`;
            
            if (video.tags && video.tags.length > 0) {
                response += `🏷️ *Tags:* ${video.tags.slice(0, 3).join(', ')}${video.tags.length > 3 ? '...' : ''}\n`;
            }
            
            if (video.categories && video.categories.length > 0) {
                response += `📂 *Categories:* ${video.categories.slice(0, 2).join(', ')}${video.categories.length > 2 ? '...' : ''}\n`;
            }
            
            if (video.pornstars && video.pornstars.length > 0) {
                response += `🌟 *Stars:* ${video.pornstars.slice(0, 2).join(', ')}${video.pornstars.length > 2 ? '...' : ''}\n`;
            }
            
            response += `🔗 [Watch Video](${video.url})\n\n`;
        }
        
        if (result.videos.length > maxResults) {
            response += `... and ${result.videos.length - maxResults} more results\n`;
            response += `💡 *Tip:* Use more specific search terms for better results`;
        }
        
        // Update the message with results
        await bot.editMessageText(response, {
            chat_id: m.chat,
            message_id: searchMsg.message_id,
            parse_mode: 'Markdown',
            disable_web_page_preview: true
        });
        
    } catch (error) {
        console.error('Pornhub search error:', error);
        
        if (error.message.includes('ENOENT') || error.message.includes('pornhub-api not found')) {
            return bot.sendMessage(m.chat, '❌ *Error:* Python or pornhub-api not found. Please install: `pip install pornhub-api`', { parse_mode: 'Markdown' });
        }
        
        return bot.sendMessage(m.chat, `❌ *Error:* ${error.message}`, { parse_mode: 'Markdown' });
    }
};

handler.help = ['pornhub <query>'];
handler.tags = ['search'];
handler.command = ['pornhub', 'ph', 'porn'];

export default handler; 
import path from 'path';
import { fileURLToPath } from 'url';
import { executePythonScript } from '../../lib/python-utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handler = async (m, { bot }) => {
    const args = m.text.split(' ').slice(1);
    
    // Parse arguments
    let period = 'weekly'; // default
    let limit = 10; // default
    
    if (args[0]) {
        const validPeriods = ['daily', 'weekly', 'monthly', 'yearly'];
        if (validPeriods.includes(args[0].toLowerCase())) {
            period = args[0].toLowerCase();
            if (args[1] && !isNaN(args[1])) {
                limit = Math.min(parseInt(args[1]), 20); // max 20 results
            }
        } else if (!isNaN(args[0])) {
            limit = Math.min(parseInt(args[0]), 20);
        }
    }
    
    try {
        // Show loading message
        const trendMsg = await bot.sendMessage(m.chat, `🔥 *Loading trending videos (${period})...*\n⏳ Please wait...`, { parse_mode: 'Markdown' });
        
        // Get the correct path to the Python script
        const scriptPath = path.join(__dirname, '..', '..', 'pornhub-bot.py');
        
        // Execute Python script using shared utility
        const { stdout, stderr } = await executePythonScript(scriptPath, ['trending', period, limit.toString()]);
        
        if (stderr) {
            console.error('Python script stderr:', stderr);
        }
        
        let result;
        try {
            result = JSON.parse(stdout);
        } catch (parseError) {
            console.error('Failed to parse Python output:', parseError);
            console.error('Raw output:', stdout);
            return bot.editMessageText('❌ *Error:* Failed to load trending videos', {
                chat_id: m.chat,
                message_id: trendMsg.message_id,
                parse_mode: 'Markdown'
            });
        }
        
        if (!result.success) {
            return bot.editMessageText(`❌ *Trending Error:* ${result.error}`, {
                chat_id: m.chat,
                message_id: trendMsg.message_id,
                parse_mode: 'Markdown'
            });
        }
        
        if (!result.videos || result.videos.length === 0) {
            return bot.editMessageText(`🔥 *No trending videos found* for ${period} period`, {
                chat_id: m.chat,
                message_id: trendMsg.message_id,
                parse_mode: 'Markdown'
            });
        }
        
        // Format trending videos
        let response = `🔥 *Pornhub Trending Videos*\n`;
        response += `📅 *Period:* ${period.charAt(0).toUpperCase() + period.slice(1)}\n`;
        response += `📊 *Showing:* ${result.videos.length} videos\n\n`;
        
        // Show videos
        for (let i = 0; i < result.videos.length; i++) {
            const video = result.videos[i];
            response += `${i + 1}. *${video.title}*\n`;
            response += `⏱️ *Duration:* ${video.duration}\n`;
            response += `👁️ *Views:* ${video.views.toLocaleString()}\n`;
            response += `⭐ *Rating:* ${video.rating}/5\n`;
            response += `📅 *Published:* ${video.publish_date}\n`;
            
            if (video.pornstars && video.pornstars.length > 0) {
                response += `🌟 *Stars:* ${video.pornstars.slice(0, 2).join(', ')}${video.pornstars.length > 2 ? '...' : ''}\n`;
            }
            
            response += `🔗 [Watch Video](${video.url})\n\n`;
        }
        
        response += `💡 *Tip:* Use \`!phtrending <period> <limit>\` to customize results\n`;
        response += `📋 *Available periods:* daily, weekly, monthly, yearly`;
        
        // Update the message with trending videos
        await bot.editMessageText(response, {
            chat_id: m.chat,
            message_id: trendMsg.message_id,
            parse_mode: 'Markdown',
            disable_web_page_preview: true
        });
        
    } catch (error) {
        console.error('Pornhub trending error:', error);
        return bot.sendMessage(m.chat, `❌ *Error:* ${error.message}`, { parse_mode: 'Markdown' });
    }
};

handler.help = ['phtrending [period] [limit]'];
handler.tags = ['search'];
handler.command = ['phtrending', 'phtrend', 'porntrending'];

export default handler; 
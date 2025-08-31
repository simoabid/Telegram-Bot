import path from 'path';
import { fileURLToPath } from 'url';
import { executePythonScript } from '../../lib/python-utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handler = async (m, { bot }) => {
    const args = m.text.split(' ').slice(1);
    
    // Check if video ID is provided
    if (!args[0]) {
        const message = `❌ *Usage:* !phinfo <video_id>\n\n*Example:*\n!phinfo ph560b93077ddae\n\n*Note:* Video ID is found in Pornhub URLs`;
        return bot.sendMessage(m.chat, message, { parse_mode: 'Markdown' });
    }

    const videoId = args[0];
    
    try {
        // Show loading message
        const infoMsg = await bot.sendMessage(m.chat, `📹 *Loading video information...*\n⏳ Please wait...`, { parse_mode: 'Markdown' });
        
        // Get the correct path to the Python script
        const scriptPath = path.join(__dirname, '..', '..', 'pornhub-bot.py');
        
        // Execute Python script using shared utility
        const { stdout, stderr } = await executePythonScript(scriptPath, ['video', videoId]);
        
        if (stderr) {
            console.error('Python script stderr:', stderr);
        }
        
        let result;
        try {
            result = JSON.parse(stdout);
        } catch (parseError) {
            console.error('Failed to parse Python output:', parseError);
            console.error('Raw output:', stdout);
            return bot.editMessageText('❌ *Error:* Failed to load video information', {
                chat_id: m.chat,
                message_id: infoMsg.message_id,
                parse_mode: 'Markdown'
            });
        }
        
        if (!result.success) {
            return bot.editMessageText(`❌ *Video Error:* ${result.error}`, {
                chat_id: m.chat,
                message_id: infoMsg.message_id,
                parse_mode: 'Markdown'
            });
        }
        
        if (!result.video) {
            return bot.editMessageText(`❌ *Video not found* with ID: ${videoId}`, {
                chat_id: m.chat,
                message_id: infoMsg.message_id,
                parse_mode: 'Markdown'
            });
        }
        
        const video = result.video;
        
        // Format video information
        let response = `📹 *Video Information*\n\n`;
        response += `🎬 *Title:* ${video.title}\n`;
        response += `⏱️ *Duration:* ${video.duration}\n`;
        response += `👁️ *Views:* ${video.views.toLocaleString()}\n`;
        response += `⭐ *Rating:* ${video.rating}/5 (${video.ratings_count} ratings)\n`;
        response += `📅 *Published:* ${video.publish_date}\n`;
        response += `👤 *Uploader:* ${video.uploader}\n`;
        response += `🔗 *URL:* ${video.url}\n\n`;
        
        if (video.description) {
            response += `📝 *Description:*\n${video.description.substring(0, 200)}${video.description.length > 200 ? '...' : ''}\n\n`;
        }
        
        if (video.tags && video.tags.length > 0) {
            response += `🏷️ *Tags:* ${video.tags.slice(0, 5).join(', ')}${video.tags.length > 5 ? '...' : ''}\n`;
        }
        
        if (video.categories && video.categories.length > 0) {
            response += `📂 *Categories:* ${video.categories.join(', ')}\n`;
        }
        
        if (video.pornstars && video.pornstars.length > 0) {
            response += `🌟 *Stars:* ${video.pornstars.join(', ')}\n`;
        }
        
        // Update the message with video info
        await bot.editMessageText(response, {
            chat_id: m.chat,
            message_id: infoMsg.message_id,
            parse_mode: 'Markdown',
            disable_web_page_preview: true
        });
        
    } catch (error) {
        console.error('Pornhub video info error:', error);
        return bot.sendMessage(m.chat, `❌ *Error:* ${error.message}`, { parse_mode: 'Markdown' });
    }
};

handler.help = ['phinfo <video_id>'];
handler.tags = ['search'];
handler.command = ['phinfo', 'phvideo', 'porninfo'];

export default handler; 
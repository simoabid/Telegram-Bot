import path from 'path';
import { fileURLToPath } from 'url';
import { executePythonScript } from '../../lib/python-utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handler = async (m, { bot }) => {
    const args = m.text.split(' ').slice(1);
    
    // Check if video ID is provided
    if (!args[0]) {
        const message = `❌ *Usage:* !phactive <video_id>\n\n*Example:*\n!phactive ph560b93077ddae\n\n*Note:* Video ID is found in Pornhub URLs`;
        return bot.sendMessage(m.chat, message, { parse_mode: 'Markdown' });
    }

    const videoId = args[0];
    
    try {
        // Show loading message
        const statusMsg = await bot.sendMessage(m.chat, `✅ *Checking video status...*\n⏳ Please wait...`, { parse_mode: 'Markdown' });
        
        // Get the correct path to the Python script
        const scriptPath = path.join(__dirname, '..', '..', 'pornhub-bot.py');
        
        // Execute Python script using shared utility
        const { stdout, stderr } = await executePythonScript(scriptPath, ['active', videoId]);
        
        if (stderr) {
            console.error('Python script stderr:', stderr);
        }
        
        let result;
        try {
            result = JSON.parse(stdout);
        } catch (parseError) {
            console.error('Failed to parse Python output:', parseError);
            console.error('Raw output:', stdout);
            return bot.editMessageText('❌ *Error:* Failed to check video status', {
                chat_id: m.chat,
                message_id: statusMsg.message_id,
                parse_mode: 'Markdown'
            });
        }
        
        if (!result.success) {
            return bot.editMessageText(`❌ *Status Error:* ${result.error}`, {
                chat_id: m.chat,
                message_id: statusMsg.message_id,
                parse_mode: 'Markdown'
            });
        }
        
        // Format status response
        let response = `✅ *Video Status Check*\n\n`;
        response += `🆔 *Video ID:* ${videoId}\n`;
        response += `📊 *Status:* ${result.is_active ? '🟢 Active' : '🔴 Inactive'}\n`;
        
        if (result.is_active) {
            response += `✅ *Video is available and active*\n`;
            response += `🔗 *URL:* ${result.url || 'https://www.pornhub.com/view_video.php?viewkey=' + videoId}\n`;
        } else {
            response += `❌ *Video is not available*\n`;
            response += `💡 *Possible reasons:*\n`;
            response += `• Video was removed\n`;
            response += `• Video is private\n`;
            response += `• Video ID is invalid\n`;
        }
        
        // Update the message with status
        await bot.editMessageText(response, {
            chat_id: m.chat,
            message_id: statusMsg.message_id,
            parse_mode: 'Markdown',
            disable_web_page_preview: true
        });
        
    } catch (error) {
        console.error('Pornhub video status error:', error);
        return bot.sendMessage(m.chat, `❌ *Error:* ${error.message}`, { parse_mode: 'Markdown' });
    }
};

handler.help = ['phactive <video_id>'];
handler.tags = ['search'];
handler.command = ['phactive', 'phstatus', 'pornstatus'];

export default handler; 
import path from 'path';
import { fileURLToPath } from 'url';
import { executePythonScript } from '../../lib/python-utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handler = async (m, { bot }) => {
    const args = m.text.split(' ').slice(1);
    const detailed = args.includes('detailed');
    
    try {
        // Show loading message
        const starsMsg = await bot.sendMessage(m.chat, `🌟 *Loading pornstars...*\n⏳ Please wait...`, { parse_mode: 'Markdown' });
        
        // Get the correct path to the Python script
        const scriptPath = path.join(__dirname, '..', '..', 'pornhub-bot.py');
        
        // Execute Python script using shared utility
        const { stdout, stderr } = await executePythonScript(scriptPath, ['stars', ...(detailed ? ['detailed'] : [])]);
        
        if (stderr) {
            console.error('Python script stderr:', stderr);
        }
        
        let result;
        try {
            result = JSON.parse(stdout);
        } catch (parseError) {
            console.error('Failed to parse Python output:', parseError);
            console.error('Raw output:', stdout);
            return bot.editMessageText('❌ *Error:* Failed to load pornstars', {
                chat_id: m.chat,
                message_id: starsMsg.message_id,
                parse_mode: 'Markdown'
            });
        }
        
        if (!result.success) {
            return bot.editMessageText(`❌ *Stars Error:* ${result.error}`, {
                chat_id: m.chat,
                message_id: starsMsg.message_id,
                parse_mode: 'Markdown'
            });
        }
        
        if (!result.stars || result.stars.length === 0) {
            return bot.editMessageText('❌ *No pornstars found*', {
                chat_id: m.chat,
                message_id: starsMsg.message_id,
                parse_mode: 'Markdown'
            });
        }
        
        // Format stars
        let response = `🌟 *Pornhub Stars*\n`;
        response += `📊 *Total Stars:* ${result.total_count}\n`;
        response += `📋 *Mode:* ${detailed ? 'Detailed' : 'Simple'}\n\n`;
        
        if (detailed) {
            // Show detailed information for first 5 stars
            const maxStars = Math.min(5, result.stars.length);
            for (let i = 0; i < maxStars; i++) {
                const star = result.stars[i];
                response += `${i + 1}. *${star.star_name}*\n`;
                if (star.star_url) {
                    response += `🔗 [Profile](${star.star_url})\n`;
                }
                if (star.star_thumb) {
                    response += `🖼️ [Thumbnail](${star.star_thumb})\n`;
                }
                response += '\n';
            }
        } else {
            // Show simple list
            const maxStars = Math.min(20, result.stars.length);
            const stars = result.stars.slice(0, maxStars);
            
            // Group stars in columns
            const chunks = [];
            for (let i = 0; i < stars.length; i += 4) {
                chunks.push(stars.slice(i, i + 4));
            }
            
            for (let i = 0; i < chunks.length; i++) {
                response += `${chunks[i].join(', ')}\n`;
            }
        }
        
        if (result.stars.length > (detailed ? 5 : 20)) {
            response += `\n... and ${result.stars.length - (detailed ? 5 : 20)} more stars\n`;
        }
        
        response += `💡 *Tip:* Use \`!pornhub <star name>\` to search for videos by specific performers`;
        
        // Update the message with stars
        await bot.editMessageText(response, {
            chat_id: m.chat,
            message_id: starsMsg.message_id,
            parse_mode: 'Markdown',
            disable_web_page_preview: true
        });
        
    } catch (error) {
        console.error('Pornhub stars error:', error);
        return bot.sendMessage(m.chat, `❌ *Error:* ${error.message}`, { parse_mode: 'Markdown' });
    }
};

handler.help = ['phstars [detailed]'];
handler.tags = ['search'];
handler.command = ['phstars', 'phstar', 'pornstars'];

export default handler; 
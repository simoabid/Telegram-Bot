import { executePythonScript } from '../../lib/python-utils.js';
import path from 'path';

const handler = async (m, { bot }) => {
    try {
        const args = m.text.split(' ').slice(1); // Remove command
        
        if (args.length === 0) {
            const helpText = `🏷️ *Tag-Based Search Help*\n\n` +
                `*Usage:* \`!phsearchtags <query> <tag1,tag2,tag3>\`\n\n` +
                `*Description:*\n` +
                `Search for videos with specific tags. Use comma-separated tags for multiple filters.\n\n` +
                `*Examples:*\n` +
                `• \`!phsearchtags amateur solo,brunette\`\n` +
                `• \`!phsearchtags lesbian milf,big-tits,hardcore\`\n` +
                `• \`!phsearchtags teen petite,18,college\`\n` +
                `• \`!phsearchtags anal hardcore,rough,amateur\`\n\n` +
                `*Popular Tags:*\n` +
                `• \`amateur, milf, teen, anal, lesbian\`\n` +
                `• \`big-tits, big-ass, brunette, blonde, redhead\`\n` +
                `• \`hardcore, softcore, romantic, rough\`\n` +
                `• \`solo, couple, threesome, group\`\n\n` +
                `💡 *Tip:* Use \`!phtags <letter>\` to browse available tags!`;
            
            return bot.sendMessage(m.chat, helpText, { parse_mode: 'Markdown' });
        }
        
        if (args.length < 2) {
            return bot.sendMessage(m.chat, 
                '❌ *Usage:* `!phsearchtags <query> <tags>`\n\n' +
                '*Example:* `!phsearchtags amateur solo,brunette`', 
                { parse_mode: 'Markdown' }
            );
        }
        
        // Parse query and tags
        const query = args[0];
        const tagsString = args.slice(1).join(' ');
        const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
        
        if (tags.length === 0) {
            return bot.sendMessage(m.chat, 
                '❌ *Error:* Please provide at least one tag\n\n' +
                '*Example:* `!phsearchtags amateur solo,brunette`', 
                { parse_mode: 'Markdown' }
            );
        }
        
        // Show searching message
        const searchMsg = await bot.sendMessage(m.chat,
            `🏷️ *Tag-Based Search*\n\n` +
            `*Query:* "${query}"\n` +
            `*Tags:* ${tags.join(', ')}\n` +
            `*Filters:* Most viewed, Weekly\n\n` +
            `⏳ Searching...`,
            { parse_mode: 'Markdown' }
        );
        
        // Execute Python script
        const scriptPath = path.join(process.cwd(), 'pornhub-bot.py');
        const { stdout, stderr } = await executePythonScript(scriptPath, [
            'advanced_search',
            query,
            '--ordering', 'mostviewed',
            '--period', 'weekly',
            '--tags', tags.join(',')
        ]);
        
        if (stderr) {
            console.error('Tag search stderr:', stderr);
        }
        
        let result;
        try {
            result = JSON.parse(stdout);
        } catch (parseError) {
            console.error('Failed to parse Python output:', parseError);
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
            return bot.editMessageText(
                `🏷️ *No Videos Found*\n\n` +
                `*Query:* "${query}"\n` +
                `*Tags:* ${tags.join(', ')}\n\n` +
                `Try different tags or broader search terms.\n\n` +
                `💡 Use \`!phtags <letter>\` to find valid tags.`,
                {
                    chat_id: m.chat,
                    message_id: searchMsg.message_id,
                    parse_mode: 'Markdown'
                }
            );
        }
        
        // Format results
        let response = `🏷️ *Tag Search Results*\n\n`;
        response += `*Query:* "${query}"\n`;
        response += `*Tags:* ${tags.join(', ')}\n`;
        response += `*Found:* ${result.total_count} videos\n`;
        response += `*Page:* ${result.page}\n\n`;
        
        // Show first 5 results
        const maxResults = Math.min(5, result.videos.length);
        for (let i = 0; i < maxResults; i++) {
            const video = result.videos[i];
            response += `*${i + 1}.* [${video.title}](${video.url})\n`;
            response += `⏱️ ${video.duration} | 👁️ ${video.views.toLocaleString()} views\n`;
            response += `⭐ ${video.rating}/100 (${video.ratings.toLocaleString()} ratings)\n`;
            
            // Highlight matching tags
            if (video.tags && video.tags.length > 0) {
                const matchingTags = video.tags.filter(tag => 
                    tags.some(searchTag => tag.toLowerCase().includes(searchTag.toLowerCase()))
                );
                const otherTags = video.tags.filter(tag => 
                    !tags.some(searchTag => tag.toLowerCase().includes(searchTag.toLowerCase()))
                ).slice(0, 2);
                
                let tagDisplay = '';
                if (matchingTags.length > 0) {
                    tagDisplay += `✅ ${matchingTags.slice(0, 3).join(', ')}`;
                }
                if (otherTags.length > 0) {
                    if (tagDisplay) tagDisplay += ' | ';
                    tagDisplay += `${otherTags.join(', ')}`;
                }
                if (tagDisplay) {
                    response += `🏷️ ${tagDisplay}\n`;
                }
            }
            
            // Show categories
            if (video.categories && video.categories.length > 0) {
                const categories = video.categories.slice(0, 3).join(', ');
                response += `📂 ${categories}\n`;
            }
            
            response += `\n`;
        }
        
        if (result.videos.length > maxResults) {
            response += `📄 *Showing ${maxResults} of ${result.videos.length} results*\n\n`;
        }
        
        response += `💡 *Tips:*\n`;
        response += `• Use \`!phsearch\` for more filter options\n`;
        response += `• Try different tag combinations\n`;
        response += `• Browse tags with \`!phtags <letter>\``;
        
        // Edit the message with results
        await bot.editMessageText(response, {
            chat_id: m.chat,
            message_id: searchMsg.message_id,
            parse_mode: 'Markdown',
            disable_web_page_preview: true
        });
        
    } catch (error) {
        console.error('Tag search error:', error);
        bot.sendMessage(m.chat, 
            `❌ *Error:* Tag search failed\n*Details:* ${error.message}`, 
            { parse_mode: 'Markdown' }
        );
    }
};

handler.help = ['phsearchtags'];
handler.tags = ['search'];
handler.command = /^(phsearchtags|phtag-search|porntagsearch)$/i;

export default handler; 
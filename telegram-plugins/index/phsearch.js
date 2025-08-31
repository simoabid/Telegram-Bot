import { executePythonScript } from '../../lib/python-utils.js';
import path from 'path';

const handler = async (m, { bot }) => {
    try {
        // Parse the command arguments
        const args = m.text.split(' ').slice(1); // Remove command
        
        if (args.length === 0) {
            const helpText = `🔍 *Advanced Search Help*\n\n` +
                `*Usage:* \`!phsearch <query> [options]\`\n\n` +
                `*Options:*\n` +
                `• \`ordering:<value>\` - Sort by: featured, newest, mostviewed, rating\n` +
                `• \`period:<value>\` - Time: weekly, monthly, alltime\n` +
                `• \`category:<value>\` - Filter by category\n` +
                `• \`tags:<tag1,tag2>\` - Filter by tags (comma-separated)\n` +
                `• \`page:<number>\` - Page number (default: 1)\n\n` +
                `*Examples:*\n` +
                `• \`!phsearch amateur ordering:mostviewed\`\n` +
                `• \`!phsearch lesbian period:monthly category:lesbian\`\n` +
                `• \`!phsearch milf tags:amateur,brunette ordering:rating\`\n` +
                `• \`!phsearch hardcore category:anal period:weekly page:2\`\n\n` +
                `💡 *Tip:* Combine multiple options for precise results!`;
            
            return bot.sendMessage(m.chat, helpText, { parse_mode: 'Markdown' });
        }
        
        // Parse query and options
        let query = '';
        const options = {
            ordering: 'mostviewed',
            period: 'weekly',
            category: null,
            tags: null,
            page: 1
        };
        
        // Separate query from options
        const queryParts = [];
        for (const arg of args) {
            if (arg.includes(':')) {
                const [key, value] = arg.split(':', 2);
                if (key in options) {
                    if (key === 'page') {
                        options[key] = parseInt(value) || 1;
                    } else {
                        options[key] = value;
                    }
                } else {
                    queryParts.push(arg);
                }
            } else {
                queryParts.push(arg);
            }
        }
        
        query = queryParts.join(' ').trim();
        
        if (!query) {
            return bot.sendMessage(m.chat, '❌ *Error:* Please provide a search query', { parse_mode: 'Markdown' });
        }
        
        // Show searching message
        const searchMsg = await bot.sendMessage(m.chat, 
            `🔍 *Advanced Search*\n` +
            `*Query:* "${query}"\n` +
            `*Ordering:* ${options.ordering}\n` +
            `*Period:* ${options.period}\n` +
            `*Category:* ${options.category || 'Any'}\n` +
            `*Tags:* ${options.tags || 'None'}\n` +
            `*Page:* ${options.page}\n\n` +
            `⏳ Searching...`, 
            { parse_mode: 'Markdown' }
        );
        
        // Build command arguments
        const scriptPath = path.join(process.cwd(), 'pornhub-bot.py');
        const cmdArgs = [
            'advanced_search',
            query,
            '--ordering', options.ordering,
            '--period', options.period,
            '--page', options.page.toString()
        ];
        
        if (options.category) {
            cmdArgs.push('--category', options.category);
        }
        
        if (options.tags) {
            cmdArgs.push('--tags', options.tags);
        }
        
        // Execute Python script
        const { stdout, stderr } = await executePythonScript(scriptPath, cmdArgs);
        
        if (stderr) {
            console.error('Advanced search stderr:', stderr);
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
                `🔍 *No Results Found*\n\n` +
                `*Query:* "${query}"\n` +
                `*Filters Applied:* ${JSON.stringify(options, null, 2)}\n\n` +
                `Try different keywords or adjust your filters.`,
                {
                    chat_id: m.chat,
                    message_id: searchMsg.message_id,
                    parse_mode: 'Markdown'
                }
            );
        }
        
        // Format results
        let response = `🔍 *Advanced Search Results*\n\n`;
        response += `*Query:* "${query}"\n`;
        response += `*Total Found:* ${result.total_count} videos\n`;
        response += `*Page:* ${result.page}\n`;
        response += `*Ordering:* ${options.ordering}\n`;
        response += `*Period:* ${options.period}\n`;
        if (options.category) response += `*Category:* ${options.category}\n`;
        if (options.tags) response += `*Tags:* ${options.tags}\n`;
        response += `\n`;
        
        // Show first 5 results
        const maxResults = Math.min(5, result.videos.length);
        for (let i = 0; i < maxResults; i++) {
            const video = result.videos[i];
            response += `*${i + 1}.* [${video.title}](${video.url})\n`;
            response += `⏱️ ${video.duration} | 👁️ ${video.views.toLocaleString()} views\n`;
            response += `⭐ ${video.rating}/100 (${video.ratings.toLocaleString()} ratings)\n`;
            
            // Show tags if available
            if (video.tags && video.tags.length > 0) {
                const tags = video.tags.slice(0, 3).join(', ');
                response += `🏷️ ${tags}${video.tags.length > 3 ? '...' : ''}\n`;
            }
            
            // Show categories if available
            if (video.categories && video.categories.length > 0) {
                const categories = video.categories.slice(0, 2).join(', ');
                response += `📂 ${categories}${video.categories.length > 2 ? '...' : ''}\n`;
            }
            
            response += `\n`;
        }
        
        if (result.videos.length > maxResults) {
            response += `📄 *Showing ${maxResults} of ${result.videos.length} results*\n`;
            response += `Use \`page:${result.page + 1}\` to see more results\n\n`;
        }
        
        response += `💡 *Tip:* Refine your search with more specific filters!`;
        
        // Edit the message with results
        await bot.editMessageText(response, {
            chat_id: m.chat,
            message_id: searchMsg.message_id,
            parse_mode: 'Markdown',
            disable_web_page_preview: true
        });
        
    } catch (error) {
        console.error('Advanced search error:', error);
        bot.sendMessage(m.chat, 
            `❌ *Error:* Advanced search failed\n*Details:* ${error.message}`, 
            { parse_mode: 'Markdown' }
        );
    }
};

handler.help = ['phsearch'];
handler.tags = ['search'];
handler.command = /^(phsearch|phadvanced|pornsearch)$/i;

export default handler; 
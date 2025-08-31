import { executePythonScript } from '../../lib/python-utils.js';
import path from 'path';

const handler = async (m, { bot }) => {
    try {
        const args = m.text.split(' ').slice(1); // Remove command
        
        if (args.length === 0) {
            const helpText = `📂 *Category Search Help*\n\n` +
                `*Usage:* \`!phsearchby <category> [query] [ordering]\`\n\n` +
                `*Description:*\n` +
                `Search within a specific category with optional query and ordering.\n\n` +
                `*Examples:*\n` +
                `• \`!phsearchby amateur\` - Browse amateur category\n` +
                `• \`!phsearchby milf brunette\` - Search brunette in MILF category\n` +
                `• \`!phsearchby lesbian ordering:rating\` - Top rated lesbian videos\n` +
                `• \`!phsearchby anal hardcore ordering:newest\` - Newest anal hardcore\n\n` +
                `*Popular Categories:*\n` +
                `• \`amateur, milf, teen, anal, lesbian\`\n` +
                `• \`big-tits, big-ass, brunette, blonde\`\n` +
                `• \`hardcore, softcore, romantic\`\n` +
                `• \`pov, blowjob, cumshot, creampie\`\n\n` +
                `*Ordering Options:*\n` +
                `• \`mostviewed\` (default), \`newest\`, \`rating\`, \`featured\`\n\n` +
                `💡 *Tip:* Use \`!phcategories\` to see all available categories!`;
            
            return bot.sendMessage(m.chat, helpText, { parse_mode: 'Markdown' });
        }
        
        // Parse arguments
        const category = args[0].toLowerCase();
        let query = '';
        let ordering = 'mostviewed';
        
        // Process remaining arguments
        for (let i = 1; i < args.length; i++) {
            const arg = args[i];
            if (arg.startsWith('ordering:')) {
                ordering = arg.split(':')[1] || 'mostviewed';
            } else {
                query += (query ? ' ' : '') + arg;
            }
        }
        
        // If no specific query, use category name as query
        if (!query) {
            query = category;
        }
        
        // Show searching message
        const searchMsg = await bot.sendMessage(m.chat,
            `📂 *Category Search*\n\n` +
            `*Category:* ${category.charAt(0).toUpperCase() + category.slice(1)}\n` +
            `*Query:* "${query}"\n` +
            `*Ordering:* ${ordering}\n` +
            `*Period:* Weekly\n\n` +
            `⏳ Searching...`,
            { parse_mode: 'Markdown' }
        );
        
        // Execute Python script
        const scriptPath = path.join(process.cwd(), 'pornhub-bot.py');
        const { stdout, stderr } = await executePythonScript(scriptPath, [
            'advanced_search',
            query,
            '--ordering', ordering,
            '--period', 'weekly',
            '--category', category
        ]);
        
        if (stderr) {
            console.error('Category search stderr:', stderr);
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
                `📂 *No Videos Found*\n\n` +
                `*Category:* ${category}\n` +
                `*Query:* "${query}"\n` +
                `*Ordering:* ${ordering}\n\n` +
                `Try a different query or category.\n\n` +
                `💡 Use \`!phcategories\` to see all available categories.`,
                {
                    chat_id: m.chat,
                    message_id: searchMsg.message_id,
                    parse_mode: 'Markdown'
                }
            );
        }
        
        // Format results
        let response = `📂 *Category Search Results*\n\n`;
        response += `*Category:* ${category.charAt(0).toUpperCase() + category.slice(1)}\n`;
        response += `*Query:* "${query}"\n`;
        response += `*Ordering:* ${ordering.charAt(0).toUpperCase() + ordering.slice(1)}\n`;
        response += `*Found:* ${result.total_count} videos\n`;
        response += `*Page:* ${result.page}\n\n`;
        
        // Show first 5 results
        const maxResults = Math.min(5, result.videos.length);
        for (let i = 0; i < maxResults; i++) {
            const video = result.videos[i];
            response += `*${i + 1}.* [${video.title}](${video.url})\n`;
            response += `⏱️ ${video.duration} | 👁️ ${video.views.toLocaleString()} views\n`;
            response += `⭐ ${video.rating}/100 (${video.ratings.toLocaleString()} ratings)\n`;
            
            // Show relevant categories (highlight searched category)
            if (video.categories && video.categories.length > 0) {
                const searchedCategory = video.categories.find(cat => 
                    cat.toLowerCase() === category.toLowerCase()
                );
                const otherCategories = video.categories.filter(cat => 
                    cat.toLowerCase() !== category.toLowerCase()
                ).slice(0, 2);
                
                let categoryDisplay = '';
                if (searchedCategory) {
                    categoryDisplay += `✅ ${searchedCategory}`;
                }
                if (otherCategories.length > 0) {
                    if (categoryDisplay) categoryDisplay += ' | ';
                    categoryDisplay += otherCategories.join(', ');
                }
                if (categoryDisplay) {
                    response += `📂 ${categoryDisplay}\n`;
                }
            }
            
            // Show some tags
            if (video.tags && video.tags.length > 0) {
                const tags = video.tags.slice(0, 3).join(', ');
                response += `🏷️ ${tags}${video.tags.length > 3 ? '...' : ''}\n`;
            }
            
            // Show performers if any
            if (video.pornstars && video.pornstars.length > 0) {
                const performers = video.pornstars.slice(0, 2).join(', ');
                response += `⭐ ${performers}${video.pornstars.length > 2 ? '...' : ''}\n`;
            }
            
            response += `\n`;
        }
        
        if (result.videos.length > maxResults) {
            response += `📄 *Showing ${maxResults} of ${result.videos.length} results*\n\n`;
        }
        
        response += `💡 *Tips:*\n`;
        response += `• Try different ordering: \`ordering:newest\`, \`ordering:rating\`\n`;
        response += `• Add specific query: \`!phsearchby ${category} your-search\`\n`;
        response += `• Browse all categories: \`!phcategories\``;
        
        // Edit the message with results
        await bot.editMessageText(response, {
            chat_id: m.chat,
            message_id: searchMsg.message_id,
            parse_mode: 'Markdown',
            disable_web_page_preview: true
        });
        
    } catch (error) {
        console.error('Category search error:', error);
        bot.sendMessage(m.chat, 
            `❌ *Error:* Category search failed\n*Details:* ${error.message}`, 
            { parse_mode: 'Markdown' }
        );
    }
};

handler.help = ['phsearchby'];
handler.tags = ['search'];
handler.command = /^(phsearchby|phcatsearch|porncatsearch)$/i;

export default handler; 
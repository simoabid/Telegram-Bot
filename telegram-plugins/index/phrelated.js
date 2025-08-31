import { executePythonScript } from '../../lib/python-utils.js';
import path from 'path';

const handler = async (m, { bot }) => {
    try {
        const args = m.text.split(' ').slice(1); // Remove command
        
        if (args.length === 0) {
            const helpText = `🔗 *Related Videos Help*\n\n` +
                `*Usage:* \`!phrelated <video_id> [limit]\`\n\n` +
                `*Description:*\n` +
                `Find videos similar to a specific video based on shared tags, categories, and content characteristics. Perfect for discovering new content you'll love!\n\n` +
                `*Examples:*\n` +
                `• \`!phrelated ph560b93077ddae\` - Find 10 similar videos\n` +
                `• \`!phrelated ph560b93077ddae 15\` - Find 15 similar videos\n` +
                `• \`!phrelated ph1234567890abc 5\` - Find 5 similar videos\n\n` +
                `*How It Works:*\n` +
                `🏷️ **Tag-Based Matching** - Finds videos with similar tags\n` +
                `📂 **Category Similarity** - Searches within same categories\n` +
                `⭐ **Quality Ranking** - Prioritizes highly-rated content\n` +
                `🎯 **Smart Filtering** - Excludes duplicates and irrelevant content\n\n` +
                `*Relation Types:*\n` +
                `• **Tags** - Videos sharing specific tags\n` +
                `• **Category** - Videos from same category\n` +
                `• **Mixed** - Combination of both methods\n\n` +
                `*Limits:*\n` +
                `• Default: 10 videos\n` +
                `• Range: 3-20 videos\n` +
                `• Quality: Most viewed and highest rated first\n\n` +
                `💡 *Pro Tip:* Great for building personalized playlists and discovering new favorites!`;
            
            return bot.sendMessage(m.chat, helpText, { parse_mode: 'Markdown' });
        }
        
        const video_id = args[0];
        const limit = parseInt(args[1]) || 10; // Default to 10 related videos
        
        // Validate video ID format
        if (!video_id || video_id.length < 5) {
            return bot.sendMessage(m.chat, 
                '❌ *Invalid Video ID*\n\n' +
                'Please provide a valid Pornhub video ID.\n\n' +
                '*Example:* `!phrelated ph560b93077ddae`', 
                { parse_mode: 'Markdown' }
            );
        }
        
        // Validate limit
        if (limit < 3 || limit > 20) {
            return bot.sendMessage(m.chat, 
                '❌ *Invalid Limit*\n\n' +
                'Please specify between 3 and 20 videos.\n\n' +
                '*Example:* `!phrelated ph560b93077ddae 15`', 
                { parse_mode: 'Markdown' }
            );
        }
        
        // Show searching message
        const searchMsg = await bot.sendMessage(m.chat,
            `🔗 *Finding Related Videos*\n\n` +
            `*Source Video:* \`${video_id}\`\n` +
            `*Looking for:* ${limit} similar videos\n\n` +
            `🔍 Analyzing source video...\n` +
            `🏷️ Matching tags and categories...\n` +
            `📊 Ranking by quality and relevance...\n` +
            `⏳ Please wait...`,
            { parse_mode: 'Markdown' }
        );
        
        // Execute Python script for related videos
        const scriptPath = path.join(process.cwd(), 'pornhub-bot.py');
        const { stdout, stderr } = await executePythonScript(scriptPath, [
            'related_videos',
            video_id,
            '--limit', limit.toString()
        ]);
        
        if (stderr) {
            console.error('Related videos stderr:', stderr);
        }
        
        let result;
        try {
            result = JSON.parse(stdout);
        } catch (parseError) {
            console.error('Failed to parse Python output:', parseError);
            return bot.editMessageText('❌ *Error:* Failed to parse related videos data', {
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
        
        if (!result.related_videos || result.related_videos.length === 0) {
            return bot.editMessageText(
                `🔗 *No Related Videos Found*\n\n` +
                `*Source Video:* \`${video_id}\`\n` +
                `*Search Criteria:* ${JSON.stringify(result.search_criteria)}\n\n` +
                `This video might have unique content or limited metadata.\n\n` +
                `💡 Try searching manually with \`!phsearch\` using specific terms.`,
                {
                    chat_id: m.chat,
                    message_id: searchMsg.message_id,
                    parse_mode: 'Markdown'
                }
            );
        }
        
        // Format related videos response
        let response = `🔗 *Related Videos Found*\n\n`;
        
        // Source Video Info
        response += `📹 **Source Video**\n`;
        response += `*Title:* ${result.original_video.title}\n`;
        response += `*Video ID:* \`${result.original_video.video_id}\`\n`;
        response += `*Tags:* ${result.original_video.tags.length} tags\n`;
        response += `*Categories:* ${result.original_video.categories.length} categories\n\n`;
        
        // Search Criteria Used
        response += `🎯 **Search Method**\n`;
        if (result.search_criteria.tags_used.length > 0) {
            response += `*Matching Tags:* ${result.search_criteria.tags_used.join(', ')}\n`;
        }
        if (result.search_criteria.category_used) {
            response += `*Category Filter:* ${result.search_criteria.category_used}\n`;
        }
        response += `*Results Found:* ${result.count} videos\n\n`;
        
        // Related Videos List
        response += `📋 **Similar Videos**\n\n`;
        
        for (let i = 0; i < result.related_videos.length; i++) {
            const video = result.related_videos[i];
            const relationIcon = video.relation_type === 'tags' ? '🏷️' : '📂';
            
            response += `${relationIcon} **${i + 1}.** [${video.title}](${video.url})\n`;
            response += `⏱️ ${video.duration} | 👁️ ${video.views.toLocaleString()} views\n`;
            response += `⭐ ${video.rating}/100\n`;
            
            // Show relation reason
            if (video.relation_type === 'tags' && video.matching_tags) {
                response += `🔗 *Shared tags:* ${video.matching_tags.slice(0, 3).join(', ')}\n`;
            } else if (video.relation_type === 'category' && video.matching_category) {
                response += `🔗 *Same category:* ${video.matching_category}\n`;
            }
            
            // Show some categories for context
            if (video.categories && video.categories.length > 0) {
                const cats = video.categories.slice(0, 3).join(', ');
                response += `📂 ${cats}${video.categories.length > 3 ? '...' : ''}\n`;
            }
            
            response += `\n`;
        }
        
        // Summary and Tips
        response += `📊 **Discovery Summary**\n`;
        const tagMatches = result.related_videos.filter(v => v.relation_type === 'tags').length;
        const categoryMatches = result.related_videos.filter(v => v.relation_type === 'category').length;
        
        if (tagMatches > 0) {
            response += `• ${tagMatches} videos found by tag similarity\n`;
        }
        if (categoryMatches > 0) {
            response += `• ${categoryMatches} videos found by category matching\n`;
        }
        
        response += `\n💡 **Pro Tips:**\n`;
        response += `• Use \`!phvideo <video_id>\` for detailed info on any video\n`;
        response += `• Try \`!phstats <video_id>\` for analytics\n`;
        response += `• Explore with \`!phsearch\` for broader discovery\n\n`;
        
        response += `🎯 *Personalized recommendations based on your selection*`;
        
        // Edit the message with results
        await bot.editMessageText(response, {
            chat_id: m.chat,
            message_id: searchMsg.message_id,
            parse_mode: 'Markdown',
            disable_web_page_preview: true
        });
        
    } catch (error) {
        console.error('Related videos error:', error);
        bot.sendMessage(m.chat, 
            `❌ *Error:* Related videos search failed\n*Details:* ${error.message}`, 
            { parse_mode: 'Markdown' }
        );
    }
};

handler.help = ['phrelated'];
handler.tags = ['discovery'];
handler.command = /^(phrelated|phsimilar|pornsimilar)$/i;

export default handler; 
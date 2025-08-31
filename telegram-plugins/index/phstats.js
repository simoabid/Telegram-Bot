import { executePythonScript } from '../../lib/python-utils.js';
import path from 'path';

const handler = async (m, { bot }) => {
    try {
        const args = m.text.split(' ').slice(1); // Remove command
        
        if (args.length === 0) {
            const helpText = `📊 *Video Statistics Help*\n\n` +
                `*Usage:* \`!phstats <video_id>\`\n\n` +
                `*Description:*\n` +
                `Get comprehensive statistics and analytics for any video, including engagement metrics, popularity scoring, and detailed breakdowns.\n\n` +
                `*Examples:*\n` +
                `• \`!phstats ph560b93077ddae\` - Full analytics report\n` +
                `• \`!phstats ph1234567890abc\` - Statistics for any video\n\n` +
                `*Analytics Features:*\n` +
                `• **Engagement Metrics** - Views, ratings, likes estimates\n` +
                `• **Popularity Score** - Custom algorithm ranking\n` +
                `• **Content Analysis** - Tags, categories, performers count\n` +
                `• **Performance Grading** - Letter grades for quality\n` +
                `• **View Tier Classification** - Viral, trending, popular levels\n` +
                `• **Engagement Level** - Community interaction analysis\n\n` +
                `*Scoring System:*\n` +
                `• **Rating Grades:** A+ (90%+), A (80%+), B (70%+), C (60%+), D (50%+), F (<50%)\n` +
                `• **View Tiers:** Viral (50M+), Mega Hit (10M+), Popular (1M+), Trending (100K+), Rising (10K+)\n` +
                `• **Engagement:** Very High (10‰+), High (5‰+), Medium (2‰+), Low (1‰+), Very Low (<1‰)\n\n` +
                `💡 *Pro Tip:* Use this to analyze video performance and find high-quality content!`;
            
            return bot.sendMessage(m.chat, helpText, { parse_mode: 'Markdown' });
        }
        
        const video_id = args[0];
        
        // Validate video ID format
        if (!video_id || video_id.length < 5) {
            return bot.sendMessage(m.chat, 
                '❌ *Invalid Video ID*\n\n' +
                'Please provide a valid Pornhub video ID.\n\n' +
                '*Example:* `!phstats ph560b93077ddae`', 
                { parse_mode: 'Markdown' }
            );
        }
        
        // Show analyzing message
        const analysisMsg = await bot.sendMessage(m.chat,
            `📊 *Video Analytics Engine*\n\n` +
            `*Video ID:* \`${video_id}\`\n\n` +
            `🔍 Analyzing engagement metrics...\n` +
            `📈 Calculating popularity score...\n` +
            `🎯 Processing content analysis...\n` +
            `⏳ Please wait...`,
            { parse_mode: 'Markdown' }
        );
        
        // Execute Python script for video statistics
        const scriptPath = path.join(process.cwd(), 'pornhub-bot.py');
        const { stdout, stderr } = await executePythonScript(scriptPath, [
            'video_stats',
            video_id
        ]);
        
        if (stderr) {
            console.error('Video stats stderr:', stderr);
        }
        
        let result;
        try {
            result = JSON.parse(stdout);
        } catch (parseError) {
            console.error('Failed to parse Python output:', parseError);
            return bot.editMessageText('❌ *Error:* Failed to parse analytics data', {
                chat_id: m.chat,
                message_id: analysisMsg.message_id,
                parse_mode: 'Markdown'
            });
        }
        
        if (!result.success) {
            return bot.editMessageText(`❌ *Analytics Error:* ${result.error}`, {
                chat_id: m.chat,
                message_id: analysisMsg.message_id,
                parse_mode: 'Markdown'
            });
        }
        
        const stats = result.stats;
        
        // Format comprehensive analytics response
        let response = `📊 *Video Analytics Report*\n\n`;
        
        // Title and Basic Info
        response += `🎬 **Video Information**\n`;
        response += `*Title:* ${stats.title}\n`;
        response += `*Video ID:* \`${stats.video_id}\`\n`;
        response += `*Published:* ${stats.publish_info.date ? new Date(stats.publish_info.date).toLocaleDateString() : 'Unknown'}\n`;
        response += `*Content Type:* ${stats.publish_info.segment.charAt(0).toUpperCase() + stats.publish_info.segment.slice(1)}\n\n`;
        
        // Engagement Metrics Section
        response += `📈 **Engagement Metrics**\n`;
        response += `*Total Views:* ${stats.engagement.views_formatted} (${stats.engagement.views.toLocaleString()})\n`;
        response += `*Community Rating:* ${stats.engagement.rating}/100\n`;
        response += `*Total Ratings:* ${stats.engagement.ratings_count.toLocaleString()}\n`;
        response += `*Estimated Likes:* ${stats.engagement.likes_estimate.toLocaleString()}\n`;
        response += `*Estimated Dislikes:* ${stats.engagement.dislikes_estimate.toLocaleString()}\n`;
        response += `*Engagement Ratio:* ${stats.engagement.engagement_ratio}‰\n\n`;
        
        // Popularity Analysis Section
        response += `🏆 **Popularity Analysis**\n`;
        response += `*Popularity Score:* ${stats.popularity.score}/20 points\n`;
        response += `*Rating Grade:* ${stats.popularity.rating_grade}\n`;
        response += `*View Tier:* ${stats.popularity.view_tier}\n`;
        response += `*Engagement Level:* ${stats.popularity.engagement_level}\n\n`;
        
        // Content Metrics Section
        response += `🏷️ **Content Metrics**\n`;
        response += `*Duration:* ${stats.content_metrics.duration} (${stats.content_metrics.duration_minutes} min)\n`;
        response += `*Tags Count:* ${stats.content_metrics.tags_count}\n`;
        response += `*Categories Count:* ${stats.content_metrics.categories_count}\n`;
        response += `*Performers Count:* ${stats.content_metrics.performers_count}\n\n`;
        
        // Performance Insights Section
        response += `💡 **Performance Insights**\n`;
        
        // Rating analysis
        if (stats.engagement.rating >= 80) {
            response += `✅ *Excellent Rating* - Community loves this content\n`;
        } else if (stats.engagement.rating >= 70) {
            response += `👍 *Good Rating* - Well-received by viewers\n`;
        } else if (stats.engagement.rating >= 60) {
            response += `⚠️ *Average Rating* - Mixed community response\n`;
        } else {
            response += `❌ *Low Rating* - Below community standards\n`;
        }
        
        // Engagement analysis
        if (stats.popularity.engagement_level === 'Very High') {
            response += `🔥 *Viral Engagement* - Extremely interactive community\n`;
        } else if (stats.popularity.engagement_level === 'High') {
            response += `📈 *High Engagement* - Active community interaction\n`;
        } else if (stats.popularity.engagement_level === 'Medium') {
            response += `📊 *Moderate Engagement* - Standard interaction levels\n`;
        } else {
            response += `📉 *Low Engagement* - Limited community interaction\n`;
        }
        
        // View tier analysis
        if (stats.popularity.view_tier === 'Viral' || stats.popularity.view_tier === 'Mega Hit') {
            response += `🌟 *${stats.popularity.view_tier}* - Exceptional viewership performance\n`;
        } else if (stats.popularity.view_tier === 'Popular' || stats.popularity.view_tier === 'Trending') {
            response += `📈 *${stats.popularity.view_tier}* - Strong viewership numbers\n`;
        } else {
            response += `📊 *${stats.popularity.view_tier}* - Building audience\n`;
        }
        
        response += `\n`;
        
        // Quick Stats Summary
        response += `📋 **Quick Summary**\n`;
        response += `• **Quality Score:** ${stats.popularity.rating_grade} grade (${stats.engagement.rating}/100)\n`;
        response += `• **Popularity:** ${stats.popularity.view_tier} tier (${stats.engagement.views_formatted} views)\n`;
        response += `• **Community:** ${stats.popularity.engagement_level} engagement (${stats.engagement.engagement_ratio}‰)\n`;
        response += `• **Content:** ${stats.content_metrics.tags_count} tags, ${stats.content_metrics.performers_count} performers\n\n`;
        
        // Related Actions
        response += `🔗 **Related Actions**\n`;
        response += `• \`!phvideo ${video_id}\` - Enhanced video details\n`;
        response += `• \`!phrelated ${video_id}\` - Find similar content\n`;
        response += `• \`!phactive ${video_id}\` - Check availability\n\n`;
        
        response += `🎯 *Analytics powered by advanced engagement algorithms*`;
        
        // Edit the message with results
        await bot.editMessageText(response, {
            chat_id: m.chat,
            message_id: analysisMsg.message_id,
            parse_mode: 'Markdown',
            disable_web_page_preview: true
        });
        
    } catch (error) {
        console.error('Video stats error:', error);
        bot.sendMessage(m.chat, 
            `❌ *Error:* Video analytics failed\n*Details:* ${error.message}`, 
            { parse_mode: 'Markdown' }
        );
    }
};

handler.help = ['phstats'];
handler.tags = ['analytics'];
handler.command = /^(phstats|phanalytics|pornstats)$/i;

export default handler; 
import { executePythonScript } from '../../lib/python-utils.js';
import path from 'path';

const handler = async (m, { bot }) => {
    try {
        const args = m.text.split(' ').slice(1); // Remove command
        
        if (args.length === 0) {
            const helpText = `📹 *Enhanced Video Info Help*\n\n` +
                `*Usage:* \`!phvideo <video_id> [thumbsize]\`\n\n` +
                `*Description:*\n` +
                `Get comprehensive video information with detailed statistics, metadata, and custom thumbnail options.\n\n` +
                `*Examples:*\n` +
                `• \`!phvideo ph560b93077ddae\` - Basic enhanced info\n` +
                `• \`!phvideo ph560b93077ddae large\` - With large thumbnails\n` +
                `• \`!phvideo ph560b93077ddae medium_hd\` - HD medium thumbnails\n\n` +
                `*Available Thumbnail Sizes:*\n` +
                `• \`small\` - 320x240 standard\n` +
                `• \`medium\` - Default size\n` +
                `• \`large\` - High resolution (recommended)\n` +
                `• \`small_hd\` - 320x240 HD\n` +
                `• \`medium_hd\` - Medium HD\n` +
                `• \`large_hd\` - Highest quality\n\n` +
                `*Enhanced Features:*\n` +
                `• Detailed statistics and engagement metrics\n` +
                `• Comprehensive thumbnail information\n` +
                `• Content analysis (tags, categories, performers)\n` +
                `• Video metadata and verification status\n\n` +
                `💡 *Tip:* Video IDs can be found in Pornhub URLs after 'viewkey='`;
            
            return bot.sendMessage(m.chat, helpText, { parse_mode: 'Markdown' });
        }
        
        const video_id = args[0];
        const thumbsize = args[1] || 'large'; // Default to large for enhanced view
        
        // Validate video ID format
        if (!video_id || video_id.length < 5) {
            return bot.sendMessage(m.chat, 
                '❌ *Invalid Video ID*\n\n' +
                'Please provide a valid Pornhub video ID.\n\n' +
                '*Example:* `!phvideo ph560b93077ddae`', 
                { parse_mode: 'Markdown' }
            );
        }
        
        // Show loading message
        const loadingMsg = await bot.sendMessage(m.chat,
            `📹 *Enhanced Video Analysis*\n\n` +
            `*Video ID:* \`${video_id}\`\n` +
            `*Thumbnail Size:* ${thumbsize}\n\n` +
            `🔍 Fetching comprehensive video data...\n` +
            `⏳ Please wait...`,
            { parse_mode: 'Markdown' }
        );
        
        // Execute Python script for enhanced video info
        const scriptPath = path.join(process.cwd(), 'pornhub-bot.py');
        const { stdout, stderr } = await executePythonScript(scriptPath, [
            'enhanced_info',
            video_id,
            '--thumbsize', thumbsize
        ]);
        
        if (stderr) {
            console.error('Enhanced video info stderr:', stderr);
        }
        
        let result;
        try {
            result = JSON.parse(stdout);
        } catch (parseError) {
            console.error('Failed to parse Python output:', parseError);
            return bot.editMessageText('❌ *Error:* Failed to parse video information', {
                chat_id: m.chat,
                message_id: loadingMsg.message_id,
                parse_mode: 'Markdown'
            });
        }
        
        if (!result.success) {
            return bot.editMessageText(`❌ *Video Error:* ${result.error}`, {
                chat_id: m.chat,
                message_id: loadingMsg.message_id,
                parse_mode: 'Markdown'
            });
        }
        
        const video = result.video;
        
        // Format comprehensive response
        let response = `📹 *Enhanced Video Information*\n\n`;
        
        // Basic Info Section
        response += `🎬 **Basic Information**\n`;
        response += `*Title:* [${video.basic_info.title}](${video.basic_info.url})\n`;
        response += `*Video ID:* \`${video.basic_info.video_id}\`\n`;
        response += `*Duration:* ${video.basic_info.duration} (${video.metadata.duration_minutes} min)\n`;
        response += `*Published:* ${video.basic_info.publish_date ? new Date(video.basic_info.publish_date).toLocaleDateString() : 'Unknown'}\n`;
        response += `*Content Type:* ${video.metadata.content_type.charAt(0).toUpperCase() + video.metadata.content_type.slice(1)}\n\n`;
        
        // Statistics Section
        response += `📊 **Statistics & Engagement**\n`;
        response += `*Views:* ${video.statistics.views.toLocaleString()}\n`;
        response += `*Rating:* ${video.statistics.rating}/100 (${video.statistics.rating_percentage}%)\n`;
        response += `*Total Ratings:* ${video.statistics.ratings_count.toLocaleString()}\n`;
        response += `*Estimated Likes:* ${video.statistics.likes_estimate.toLocaleString()}\n\n`;
        
        // Content Analysis Section
        response += `🏷️ **Content Analysis**\n`;
        response += `*Tags:* ${video.content.tag_count} tags\n`;
        
        // Show first few tags
        if (video.content.tags && video.content.tags.length > 0) {
            const displayTags = video.content.tags.slice(0, 6).join(', ');
            response += `*Top Tags:* ${displayTags}${video.content.tags.length > 6 ? '...' : ''}\n`;
        }
        
        response += `*Categories:* ${video.content.category_count} categories\n`;
        if (video.content.categories && video.content.categories.length > 0) {
            response += `*Categories:* ${video.content.categories.join(', ')}\n`;
        }
        
        // Performers Section
        if (video.metadata.has_performers) {
            response += `*Performers:* ${video.content.performer_count} performer(s)\n`;
            response += `*Featured:* ${video.content.pornstars.join(', ')}\n`;
        } else {
            response += `*Performers:* Amateur/Non-professional\n`;
        }
        response += `\n`;
        
        // Thumbnails Section
        response += `🖼️ **Thumbnail Information**\n`;
        response += `*Current Size:* ${video.thumbnails.size}\n`;
        response += `*Available Thumbnails:* ${video.thumbnails.thumbnail_count}\n`;
        response += `*Quality Options:* ${video.thumbnails.available_sizes.join(', ')}\n\n`;
        
        // Metadata Section
        response += `⚙️ **Metadata**\n`;
        response += `*Verified Content:* ${video.metadata.is_verified ? '✅ Yes' : '❌ No'}\n`;
        response += `*Has Performers:* ${video.metadata.has_performers ? '✅ Yes' : '❌ Amateur'}\n`;
        response += `*Content Type:* ${video.metadata.content_type}\n\n`;
        
        // Additional Actions
        response += `🔗 **Quick Actions**\n`;
        response += `• \`!phstats ${video_id}\` - Detailed analytics\n`;
        response += `• \`!phrelated ${video_id}\` - Find similar videos\n`;
        response += `• \`!phactive ${video_id}\` - Check availability\n\n`;
        
        response += `💡 *Enhanced view with ${thumbsize} thumbnails*`;
        
        // Edit the message with results
        await bot.editMessageText(response, {
            chat_id: m.chat,
            message_id: loadingMsg.message_id,
            parse_mode: 'Markdown',
            disable_web_page_preview: true
        });
        
    } catch (error) {
        console.error('Enhanced video info error:', error);
        bot.sendMessage(m.chat, 
            `❌ *Error:* Enhanced video analysis failed\n*Details:* ${error.message}`, 
            { parse_mode: 'Markdown' }
        );
    }
};

handler.help = ['phvideo'];
handler.tags = ['video'];
handler.command = /^(phvideo|phenhanced|pornvideo)$/i;

export default handler; 
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

module.exports = {
  name: 'phinfo',
  alias: ['phvideo', 'porninfo'],
  category: 'search',
  desc: '📹 Get detailed information about a Pornhub video',
  use: '<video_id>',
  example: '!phinfo ph560b93077ddae',
  async exec({ msg, args, prefix, command }) {
    // Check if video ID is provided
    if (!args[0]) {
      return msg.reply(`❌ *Usage:* ${prefix}phinfo <video_id>\n\n*Examples:*\n${prefix}phinfo ph560b93077ddae\n${prefix}phinfo ph1234567890abc`);
    }

    const videoId = args[0];
    const thumbsize = args[1] || 'medium'; // Default thumbnail size
    
    try {
      // Show loading message
      const infoMsg = await msg.reply(`📹 *Getting video info for:* ${videoId}\n⏳ Please wait...`);
      
      // Execute Python script
      const { stdout, stderr } = await execAsync(`python pornhub-bot.py video "${videoId}" "${thumbsize}"`);
      
      if (stderr) {
        console.error('Python script stderr:', stderr);
      }
      
      let result;
      try {
        result = JSON.parse(stdout);
      } catch (parseError) {
        console.error('Failed to parse Python output:', parseError);
        return infoMsg.edit('❌ *Error:* Failed to parse video information');
      }
      
      if (!result.success) {
        return infoMsg.edit(`❌ *Video Error:* ${result.error}`);
      }
      
      const video = result.video;
      
      // Format detailed video information
      let response = `📹 *Video Information*\n\n`;
      response += `🎬 *Title:* ${video.title}\n`;
      response += `⏱️ *Duration:* ${video.duration}\n`;
      response += `👁️ *Views:* ${video.views.toLocaleString()}\n`;
      response += `⭐ *Rating:* ${video.rating}/5 (${video.ratings_count} ratings)\n`;
      response += `📅 *Published:* ${video.publish_date}\n`;
      response += `🔗 *Video ID:* ${video.video_id}\n`;
      response += `📂 *Segment:* ${video.segment}\n\n`;
      
      // Tags
      if (video.tags && video.tags.length > 0) {
        response += `🏷️ *Tags (${video.tags.length}):*\n`;
        const tagChunks = [];
        for (let i = 0; i < video.tags.length; i += 5) {
          tagChunks.push(video.tags.slice(i, i + 5).join(', '));
        }
        response += tagChunks.join('\n') + '\n\n';
      }
      
      // Categories
      if (video.categories && video.categories.length > 0) {
        response += `📂 *Categories (${video.categories.length}):*\n`;
        response += video.categories.join(', ') + '\n\n';
      }
      
      // Pornstars
      if (video.pornstars && video.pornstars.length > 0) {
        response += `🌟 *Featured Stars (${video.pornstars.length}):*\n`;
        response += video.pornstars.join(', ') + '\n\n';
      }
      
      // Thumbnails
      if (video.thumbs && video.thumbs.length > 0) {
        response += `🖼️ *Thumbnails:* ${video.thumbs.length} available\n`;
        response += `📸 *Main Thumbnail:* ${video.thumbnail}\n\n`;
      }
      
      // Watch link
      response += `🔗 [Watch Video on Pornhub](${video.url})\n\n`;
      response += `💡 *Tip:* Use \`${prefix}phactive ${videoId}\` to check if video is still available`;
      
      // Update the message with video info
      await infoMsg.edit(response);
      
    } catch (error) {
      console.error('Pornhub video info error:', error);
      
      if (error.message.includes('ENOENT')) {
        return msg.reply('❌ *Error:* Python script not found. Please ensure `pornhub-bot.py` is in the bot directory.');
      }
      
      return msg.reply(`❌ *Error:* ${error.message}`);
    }
  }
}; 
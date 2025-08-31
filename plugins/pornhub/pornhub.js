const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

module.exports = {
  name: 'pornhub',
  alias: ['ph', 'porn'],
  category: 'search',
  desc: '🔍 Search Pornhub for adult content and videos',
  use: '<query>',
  example: '!pornhub example search',
  async exec({ msg, args, prefix, command }) {
    // Check if query is provided
    if (!args[0]) {
      return msg.reply(`❌ *Usage:* ${prefix}pornhub <search query>\n\n*Examples:*\n${prefix}pornhub example\n${prefix}pornhub trending\n${prefix}pornhub categories`);
    }

    const query = args.join(' ');
    
    try {
      // Show searching message
      const searchMsg = await msg.reply(`🔍 *Searching Pornhub for:* "${query}"\n⏳ Please wait...`);
      
      // Execute Python script
      const { stdout, stderr } = await execAsync(`python pornhub-bot.py search "${query}"`);
      
      if (stderr) {
        console.error('Python script stderr:', stderr);
      }
      
      let result;
      try {
        result = JSON.parse(stdout);
      } catch (parseError) {
        console.error('Failed to parse Python output:', parseError);
        return searchMsg.edit('❌ *Error:* Failed to parse search results');
      }
      
      if (!result.success) {
        return searchMsg.edit(`❌ *Search Error:* ${result.error}`);
      }
      
      if (!result.videos || result.videos.length === 0) {
        return searchMsg.edit(`🔍 *No videos found* for: "${query}"\n\nTry different keywords or check spelling.`);
      }
      
      // Format results
      let response = `🔍 *Pornhub Search Results:* "${query}"\n`;
      response += `📊 *Found:* ${result.total_count} videos\n`;
      response += `📄 *Page:* ${result.page}\n\n`;
      
      // Show first 5 results
      const maxResults = Math.min(5, result.videos.length);
      for (let i = 0; i < maxResults; i++) {
        const video = result.videos[i];
        response += `${i + 1}. *${video.title}*\n`;
        response += `⏱️ *Duration:* ${video.duration}\n`;
        response += `👁️ *Views:* ${video.views.toLocaleString()}\n`;
        response += `⭐ *Rating:* ${video.rating}/5 (${video.ratings_count} ratings)\n`;
        response += `📅 *Published:* ${video.publish_date}\n`;
        
        if (video.tags && video.tags.length > 0) {
          response += `🏷️ *Tags:* ${video.tags.slice(0, 3).join(', ')}${video.tags.length > 3 ? '...' : ''}\n`;
        }
        
        if (video.categories && video.categories.length > 0) {
          response += `📂 *Categories:* ${video.categories.slice(0, 2).join(', ')}${video.categories.length > 2 ? '...' : ''}\n`;
        }
        
        if (video.pornstars && video.pornstars.length > 0) {
          response += `🌟 *Stars:* ${video.pornstars.slice(0, 2).join(', ')}${video.pornstars.length > 2 ? '...' : ''}\n`;
        }
        
        response += `🔗 [Watch Video](${video.url})\n\n`;
      }
      
      if (result.videos.length > maxResults) {
        response += `... and ${result.videos.length - maxResults} more results\n`;
        response += `💡 *Tip:* Use more specific search terms for better results`;
      }
      
      // Update the message with results
      await searchMsg.edit(response);
      
    } catch (error) {
      console.error('Pornhub search error:', error);
      
      if (error.message.includes('ENOENT')) {
        return msg.reply('❌ *Error:* Python script not found. Please ensure `pornhub-bot.py` is in the bot directory.');
      }
      
      return msg.reply(`❌ *Error:* ${error.message}`);
    }
  }
}; 
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

module.exports = {
  name: 'phtrending',
  alias: ['phtrend', 'porntrending', 'trending'],
  category: 'search',
  desc: '🔥 Show trending Pornhub videos by time period',
  use: '[period] [limit]',
  example: '!phtrending\n!phtrending weekly\n!phtrending monthly 15',
  async exec({ msg, args, prefix, command }) {
    const period = args[0] || 'weekly';
    const limit = parseInt(args[1]) || 10;
    
    // Validate period
    const validPeriods = ['weekly', 'monthly', 'alltime'];
    if (!validPeriods.includes(period.toLowerCase())) {
      return msg.reply(`❌ *Invalid period:* ${period}\n\n*Valid periods:*\n• weekly - Trending this week\n• monthly - Trending this month\n• alltime - All-time trending\n\n*Examples:*\n${prefix}phtrending\n${prefix}phtrending monthly\n${prefix}phtrending alltime 20`);
    }
    
    // Validate limit
    if (limit < 1 || limit > 50) {
      return msg.reply(`❌ *Invalid limit:* ${limit}\n\n*Limit must be between 1-50*\n\n*Examples:*\n${prefix}phtrending weekly 10\n${prefix}phtrending monthly 25`);
    }
    
    try {
      // Show loading message
      const trendMsg = await msg.reply(`🔥 *Loading trending videos (${period})...*\n⏳ Please wait...`);
      
      // Execute Python script
      const { stdout, stderr } = await execAsync(`python pornhub-bot.py trending "${period}" "${limit}"`);
      
      if (stderr) {
        console.error('Python script stderr:', stderr);
      }
      
      let result;
      try {
        result = JSON.parse(stdout);
      } catch (parseError) {
        console.error('Failed to parse Python output:', parseError);
        return trendMsg.edit('❌ *Error:* Failed to parse trending videos');
      }
      
      if (!result.success) {
        return trendMsg.edit(`❌ *Trending Error:* ${result.error}`);
      }
      
      if (!result.videos || result.videos.length === 0) {
        return trendMsg.edit(`🔥 *No trending videos found* for period: ${period}\n\n💡 *Try:* Different periods (weekly, monthly, alltime)`);
      }
      
      // Format trending response
      let response = `🔥 *Pornhub Trending Videos*\n\n`;
      response += `📅 *Period:* ${period.charAt(0).toUpperCase() + period.slice(1)}\n`;
      response += `📊 *Showing:* ${result.total_count} videos\n\n`;
      
      // Show trending videos
      for (let i = 0; i < result.videos.length; i++) {
        const video = result.videos[i];
        response += `${i + 1}. *${video.title}*\n`;
        response += `⏱️ *Duration:* ${video.duration}\n`;
        response += `👁️ *Views:* ${video.views.toLocaleString()}\n`;
        response += `⭐ *Rating:* ${video.rating}/5\n`;
        response += `🔗 [Watch Video](${video.url})\n\n`;
      }
      
      response += `💡 *Usage:*\n`;
      response += `• \`${prefix}phtrending\` - Weekly trending (default)\n`;
      response += `• \`${prefix}phtrending monthly\` - Monthly trending\n`;
      response += `• \`${prefix}phtrending alltime\` - All-time trending\n`;
      response += `• \`${prefix}phtrending weekly 20\` - Weekly trending with custom limit\n\n`;
      
      response += `🔍 *Other commands:*\n`;
      response += `• \`${prefix}pornhub <search terms>\` - Search for specific content\n`;
      response += `• \`${prefix}phcategories\` - Browse all categories\n`;
      response += `• \`${prefix}phstars\` - Browse performers\n\n`;
      
      response += `💡 *Tip:* Trending videos are based on view count and popularity`;
      
      // Update the message with trending videos
      await trendMsg.edit(response);
      
    } catch (error) {
      console.error('Pornhub trending error:', error);
      
      if (error.message.includes('ENOENT')) {
        return msg.reply('❌ *Error:* Python script not found. Please ensure `pornhub-bot.py` is in the bot directory.');
      }
      
      return msg.reply(`❌ *Error:* ${error.message}`);
    }
  }
}; 
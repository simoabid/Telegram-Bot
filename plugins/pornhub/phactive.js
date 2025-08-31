const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

module.exports = {
  name: 'phactive',
  alias: ['phstatus', 'pornstatus'],
  category: 'search',
  desc: '✅ Check if a Pornhub video is still active and available',
  use: '<video_id>',
  example: '!phactive ph560b93077ddae',
  async exec({ msg, args, prefix, command }) {
    // Check if video ID is provided
    if (!args[0]) {
      return msg.reply(`❌ *Usage:* ${prefix}phactive <video_id>\n\n*Examples:*\n${prefix}phactive ph560b93077ddae\n${prefix}phactive ph1234567890abc`);
    }

    const videoId = args[0];
    
    try {
      // Show checking message
      const statusMsg = await msg.reply(`✅ *Checking video status for:* ${videoId}\n⏳ Please wait...`);
      
      // Execute Python script
      const { stdout, stderr } = await execAsync(`python pornhub-bot.py active "${videoId}"`);
      
      if (stderr) {
        console.error('Python script stderr:', stderr);
      }
      
      let result;
      try {
        result = JSON.parse(stdout);
      } catch (parseError) {
        console.error('Failed to parse Python output:', parseError);
        return statusMsg.edit('❌ *Error:* Failed to parse status information');
      }
      
      if (!result.success) {
        return statusMsg.edit(`❌ *Status Error:* ${result.error}`);
      }
      
      // Format status response
      let response = `✅ *Video Status Check*\n\n`;
      response += `🔗 *Video ID:* ${result.video_id}\n`;
      
      if (result.is_active) {
        response += `🟢 *Status:* Active ✅\n`;
        response += `💡 *Video is available and can be watched*\n\n`;
        response += `🔍 *Next steps:*\n`;
        response += `• Use \`${prefix}phinfo ${videoId}\` for detailed information\n`;
        response += `• Use \`${prefix}pornhub <search terms>\` to find similar videos`;
      } else {
        response += `🔴 *Status:* Inactive ❌\n`;
        response += `💡 *Video has been removed or is no longer available*\n\n`;
        response += `🔍 *Possible reasons:*\n`;
        response += `• Video was deleted by user\n`;
        response += `• Video violated terms of service\n`;
        response += `• Video is temporarily unavailable\n\n`;
        response += `💡 *Try:* Use \`${prefix}pornhub <search terms>\` to find similar content`;
      }
      
      // Update the message with status
      await statusMsg.edit(response);
      
    } catch (error) {
      console.error('Pornhub status check error:', error);
      
      if (error.message.includes('ENOENT')) {
        return msg.reply('❌ *Error:* Python script not found. Please ensure `pornhub-bot.py` is in the bot directory.');
      }
      
      return msg.reply(`❌ *Error:* ${error.message}`);
    }
  }
}; 
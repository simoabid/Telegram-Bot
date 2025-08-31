const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

module.exports = {
  name: 'phstars',
  alias: ['phstar', 'pornstars', 'performers'],
  category: 'search',
  desc: '🌟 Browse Pornhub pornstars and performers',
  use: '[detailed]',
  example: '!phstars\n!phstars detailed',
  async exec({ msg, args, prefix, command }) {
    const detailed = args[0] && args[0].toLowerCase() === 'detailed';
    
    try {
      // Show loading message
      const starMsg = await msg.reply(`🌟 *Loading Pornhub ${detailed ? 'detailed ' : ''}stars...*\n⏳ Please wait...`);
      
      // Execute Python script
      const { stdout, stderr } = await execAsync(`python pornhub-bot.py stars ${detailed ? 'detailed' : ''}`);
      
      if (stderr) {
        console.error('Python script stderr:', stderr);
      }
      
      let result;
      try {
        result = JSON.parse(stdout);
      } catch (parseError) {
        console.error('Failed to parse Python output:', parseError);
        return starMsg.edit('❌ *Error:* Failed to parse stars information');
      }
      
      if (!result.success) {
        return starMsg.edit(`❌ *Stars Error:* ${result.error}`);
      }
      
      if (!result.stars || result.stars.length === 0) {
        return starMsg.edit('❌ *No stars found*');
      }
      
      // Format stars response
      let response = `🌟 *Pornhub ${detailed ? 'Detailed ' : ''}Stars*\n\n`;
      response += `📊 *Total Stars:* ${result.total_count}\n\n`;
      
      if (detailed) {
        // Show detailed star information
        const maxStars = Math.min(20, result.stars.length);
        response += `📋 *Showing first ${maxStars} stars:*\n\n`;
        
        for (let i = 0; i < maxStars; i++) {
          const star = result.stars[i];
          response += `${i + 1}. *${star.star_name}*\n`;
          
          if (star.star_url) {
            response += `🔗 [Profile](${star.star_url})\n`;
          }
          
          if (star.star_thumb) {
            response += `📸 [Thumbnail](${star.star_thumb})\n`;
          }
          
          response += '\n';
        }
        
        if (result.stars.length > maxStars) {
          response += `... and ${result.stars.length - maxStars} more stars\n\n`;
        }
      } else {
        // Show simple star list
        const maxStars = Math.min(50, result.stars.length);
        response += `📋 *Showing first ${maxStars} stars:*\n\n`;
        
        // Group stars into columns for better readability
        const stars = result.stars.slice(0, maxStars);
        const columns = 2;
        const rows = Math.ceil(stars.length / columns);
        
        for (let i = 0; i < rows; i++) {
          let row = '';
          for (let j = 0; j < columns; j++) {
            const index = i + (j * rows);
            if (index < stars.length) {
              const star = stars[index];
              row += `${index + 1}. ${star}`;
              if (j < columns - 1 && index + rows < stars.length) {
                row += '\t\t\t';
              }
            }
          }
          response += row + '\n';
        }
        
        if (result.stars.length > maxStars) {
          response += `\n... and ${result.stars.length - maxStars} more stars\n`;
        }
      }
      
      response += `\n💡 *Usage:*\n`;
      response += `• Use \`${prefix}phstars detailed\` for detailed information\n`;
      response += `• Use \`${prefix}pornhub <star name>\` to search videos by star\n`;
      response += `• Use \`${prefix}pornhub <star1> <star2>\` to find videos with multiple stars\n`;
      response += `• Example: \`${prefix}pornhub riley reid\`\n\n`;
      
      if (!detailed) {
        response += `🔍 *Get detailed info:* \`${prefix}phstars detailed\`\n\n`;
      }
      
      response += `🔥 *Popular Stars:*\n`;
      const popularStars = ['riley reid', 'johnny sins', 'lisa ann', 'james deen', 'sasha grey'];
      response += popularStars.join(', ') + '\n\n';
      
      response += `💡 *Tip:* Search for specific stars to find their content`;
      
      // Update the message with stars
      await starMsg.edit(response);
      
    } catch (error) {
      console.error('Pornhub stars error:', error);
      
      if (error.message.includes('ENOENT')) {
        return msg.reply('❌ *Error:* Python script not found. Please ensure `pornhub-bot.py` is in the bot directory.');
      }
      
      return msg.reply(`❌ *Error:* ${error.message}`);
    }
  }
}; 
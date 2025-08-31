const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

module.exports = {
  name: 'phcategories',
  alias: ['phcats', 'porncats'],
  category: 'search',
  desc: '📂 Browse all available Pornhub video categories',
  use: '',
  example: '!phcategories',
  async exec({ msg, prefix, command }) {
    try {
      // Show loading message
      const catMsg = await msg.reply(`📂 *Loading Pornhub categories...*\n⏳ Please wait...`);
      
      // Execute Python script
      const { stdout, stderr } = await execAsync(`python pornhub-bot.py categories`);
      
      if (stderr) {
        console.error('Python script stderr:', stderr);
      }
      
      let result;
      try {
        result = JSON.parse(stdout);
      } catch (parseError) {
        console.error('Failed to parse Python output:', parseError);
        return catMsg.edit('❌ *Error:* Failed to parse categories');
      }
      
      if (!result.success) {
        return catMsg.edit(`❌ *Categories Error:* ${result.error}`);
      }
      
      if (!result.categories || result.categories.length === 0) {
        return catMsg.edit('❌ *No categories found*');
      }
      
      // Format categories response
      let response = `📂 *Pornhub Video Categories*\n\n`;
      response += `📊 *Total Categories:* ${result.total_count}\n\n`;
      
      // Group categories into columns for better readability
      const categories = result.categories;
      const columns = 3;
      const rows = Math.ceil(categories.length / columns);
      
      for (let i = 0; i < rows; i++) {
        let row = '';
        for (let j = 0; j < columns; j++) {
          const index = i + (j * rows);
          if (index < categories.length) {
            const category = categories[index];
            row += `${index + 1}. ${category}`;
            if (j < columns - 1 && index + rows < categories.length) {
              row += '\t\t';
            }
          }
        }
        response += row + '\n';
      }
      
      response += `\n💡 *Usage:*\n`;
      response += `• Use \`${prefix}pornhub <category name>\` to search within a category\n`;
      response += `• Use \`${prefix}pornhub <category> <additional terms>\` for specific searches\n`;
      response += `• Example: \`${prefix}pornhub amateur solo\`\n\n`;
      
      response += `🔍 *Popular Categories:*\n`;
      const popularCategories = ['amateur', 'anal', 'asian', 'blonde', 'brunette', 'hardcore', 'lesbian', 'milf', 'teen'];
      response += popularCategories.join(', ') + '\n\n';
      
      response += `💡 *Tip:* Categories are case-insensitive and can be combined with search terms`;
      
      // Update the message with categories
      await catMsg.edit(response);
      
    } catch (error) {
      console.error('Pornhub categories error:', error);
      
      if (error.message.includes('ENOENT')) {
        return msg.reply('❌ *Error:* Python script not found. Please ensure `pornhub-bot.py` is in the bot directory.');
      }
      
      return msg.reply(`❌ *Error:* ${error.message}`);
    }
  }
}; 
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

module.exports = {
  name: 'phtags',
  alias: ['phtag', 'porntags'],
  category: 'search',
  desc: '🏷️ Browse Pornhub tags starting with a specific letter',
  use: '<letter>',
  example: '!phtags a',
  async exec({ msg, args, prefix, command }) {
    // Check if letter is provided
    if (!args[0]) {
      return msg.reply(`❌ *Usage:* ${prefix}phtags <letter>\n\n*Examples:*\n${prefix}phtags a\n${prefix}phtags b\n${prefix}phtags z`);
    }

    const letter = args[0].toLowerCase();
    
    // Validate input
    if (letter.length !== 1 || !/[a-z]/.test(letter)) {
      return msg.reply(`❌ *Invalid input:* Please provide a single letter (a-z)\n\n*Examples:*\n${prefix}phtags a\n${prefix}phtags b\n${prefix}phtags z`);
    }
    
    try {
      // Show loading message
      const tagMsg = await msg.reply(`🏷️ *Loading tags starting with:* "${letter.toUpperCase()}"\n⏳ Please wait...`);
      
      // Execute Python script
      const { stdout, stderr } = await execAsync(`python pornhub-bot.py tags "${letter}"`);
      
      if (stderr) {
        console.error('Python script stderr:', stderr);
      }
      
      let result;
      try {
        result = JSON.parse(stdout);
      } catch (parseError) {
        console.error('Failed to parse Python output:', parseError);
        return tagMsg.edit('❌ *Error:* Failed to parse tags');
      }
      
      if (!result.success) {
        return tagMsg.edit(`❌ *Tags Error:* ${result.error}`);
      }
      
      if (!result.tags || result.tags.length === 0) {
        return tagMsg.edit(`🏷️ *No tags found* starting with "${letter.toUpperCase()}"\n\n💡 *Try:* Different letters like a, b, c, etc.`);
      }
      
      // Format tags response
      let response = `🏷️ *Pornhub Tags - Letter "${letter.toUpperCase()}"*\n\n`;
      response += `📊 *Total Tags:* ${result.total_count}\n\n`;
      
      // Group tags into columns for better readability
      const tags = result.tags;
      const columns = 2;
      const rows = Math.ceil(tags.length / columns);
      
      for (let i = 0; i < rows; i++) {
        let row = '';
        for (let j = 0; j < columns; j++) {
          const index = i + (j * rows);
          if (index < tags.length) {
            const tag = tags[index];
            row += `${index + 1}. ${tag}`;
            if (j < columns - 1 && index + rows < tags.length) {
              row += '\t\t\t';
            }
          }
        }
        response += row + '\n';
      }
      
      // Show some popular tags from this letter
      const popularTags = tags.slice(0, 10);
      response += `\n🔥 *Popular Tags from "${letter.toUpperCase()}":*\n`;
      response += popularTags.join(', ') + '\n\n';
      
      response += `💡 *Usage:*\n`;
      response += `• Use \`${prefix}pornhub <tag name>\` to search videos with specific tags\n`;
      response += `• Use \`${prefix}pornhub <tag1> <tag2>\` to combine multiple tags\n`;
      response += `• Example: \`${prefix}pornhub amateur solo\`\n\n`;
      
      response += `🔍 *Try other letters:*\n`;
      const suggestedLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
      const availableLetters = suggestedLetters.filter(l => l !== letter);
      response += availableLetters.slice(0, 5).map(l => `${prefix}phtags ${l}`).join(' | ') + '\n\n';
      
      response += `💡 *Tip:* Tags help you find more specific and relevant content`;
      
      // Update the message with tags
      await tagMsg.edit(response);
      
    } catch (error) {
      console.error('Pornhub tags error:', error);
      
      if (error.message.includes('ENOENT')) {
        return msg.reply('❌ *Error:* Python script not found. Please ensure `pornhub-bot.py` is in the bot directory.');
      }
      
      return msg.reply(`❌ *Error:* ${error.message}`);
    }
  }
}; 
module.exports = {
  name: 'phhelp',
  alias: ['pornhelp', 'pornhubhelp'],
  category: 'search',
  desc: '📋 Show all available Pornhub bot commands and help',
  use: '',
  example: '!phhelp',
  async exec({ msg, prefix, command }) {
    const helpMessage = `🔞 *Pornhub Bot - Complete Command Guide*\n\n`;

    const commands = [
      {
        name: 'pornhub',
        alias: 'ph, porn',
        usage: '<search query>',
        desc: '🔍 Search Pornhub for videos and content',
        example: `${prefix}pornhub amateur solo`
      },
      {
        name: 'phinfo',
        alias: 'phvideo, porninfo',
        usage: '<video_id>',
        desc: '📹 Get detailed information about a specific video',
        example: `${prefix}phinfo ph560b93077ddae`
      },
      {
        name: 'phactive',
        alias: 'phstatus, pornstatus',
        usage: '<video_id>',
        desc: '✅ Check if a video is still active and available',
        example: `${prefix}phactive ph560b93077ddae`
      },
      {
        name: 'phcategories',
        alias: 'phcats, porncats',
        usage: '',
        desc: '📂 Browse all available video categories',
        example: `${prefix}phcategories`
      },
      {
        name: 'phtags',
        alias: 'phtag, porntags',
        usage: '<letter>',
        desc: '🏷️ Browse tags starting with a specific letter',
        example: `${prefix}phtags a`
      },
      {
        name: 'phstars',
        alias: 'phstar, pornstars, performers',
        usage: '[detailed]',
        desc: '🌟 Browse pornstars and performers',
        example: `${prefix}phstars\n${prefix}phstars detailed`
      },
      {
        name: 'phtrending',
        alias: 'phtrend, porntrending, trending',
        usage: '[period] [limit]',
        desc: '🔥 Show trending videos by time period',
        example: `${prefix}phtrending\n${prefix}phtrending monthly 15`
      },
      {
        name: 'phhelp',
        alias: 'pornhelp, pornhubhelp',
        usage: '',
        desc: '📋 Show this help message',
        example: `${prefix}phhelp`
      }
    ];

    // Add command details
    commands.forEach(cmd => {
      helpMessage += `*${prefix}${cmd.name}* (${cmd.alias})\n`;
      helpMessage += `📝 *Description:* ${cmd.desc}\n`;
      helpMessage += `💻 *Usage:* \`${prefix}${cmd.name} ${cmd.usage}\`\n`;
      helpMessage += `💡 *Example:* \`${cmd.example}\`\n\n`;
    });

    helpMessage += `🔍 *Search Tips:*\n`;
    helpMessage += `• Use specific keywords for better results\n`;
    helpMessage += `• Combine multiple terms: \`${prefix}pornhub amateur solo\`\n`;
    helpMessage += `• Use categories: \`${prefix}pornhub lesbian milf\`\n`;
    helpMessage += `• Search by performer: \`${prefix}pornhub riley reid\`\n\n`;

    helpMessage += `📊 *Available Periods for Trending:*\n`;
    helpMessage += `• weekly - Trending this week\n`;
    helpMessage += `• monthly - Trending this month\n`;
    helpMessage += `• alltime - All-time trending\n\n`;

    helpMessage += `🏷️ *Popular Categories:*\n`;
    helpMessage += `amateur, anal, asian, blonde, brunette, hardcore, lesbian, milf, teen\n\n`;

    helpMessage += `🌟 *Popular Performers:*\n`;
    helpMessage += `riley reid, johnny sins, lisa ann, james deen, sasha grey\n\n`;

    helpMessage += `⚠️ *Important Notes:*\n`;
    helpMessage += `• This bot provides content discovery, not video downloads\n`;
    helpMessage += `• All content links go to Pornhub.com\n`;
    helpMessage += `• Use responsibly and comply with local laws\n`;
    helpMessage += `• Age verification required (18+ only)\n\n`;

    helpMessage += `🔗 *Quick Start:*\n`;
    helpMessage += `1. \`${prefix}phtrending\` - See what's popular\n`;
    helpMessage += `2. \`${prefix}phcategories\` - Browse categories\n`;
    helpMessage += `3. \`${prefix}pornhub <your search>\` - Find specific content\n`;
    helpMessage += `4. \`${prefix}phstars\` - Discover performers\n\n`;

    helpMessage += `💡 *Need Help?*\n`;
    helpMessage += `• Use \`${prefix}phhelp\` anytime to see this guide\n`;
    helpMessage += `• Check command examples for proper usage\n`;
    helpMessage += `• All commands support multiple aliases for convenience`;

    return msg.reply(helpMessage);
  }
}; 
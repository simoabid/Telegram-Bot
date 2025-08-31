const handler = async (m, { bot, usedPrefix }) => {
  try {
    const userId = m.from_user?.id || m.chat;

    // Initialize user data if not exists
    if (!global.db.data.users[userId]) {
      global.db.data.users[userId] = { lastcofre: 0 };
    }

    let img = 'https://cdn-sunflareteam.vercel.app/images/fe2072569a.jpg';
    let texto = `ℹ️ *BOT INFORMATION MENU* 📊

🤖 *BOT STATUS & INFO*
• ${usedPrefix}info - Complete bot information
• ${usedPrefix}botinfo - Bot details and features
• ${usedPrefix}infobot - Bot info alternative
• ${usedPrefix}ping - Check bot response time
• ${usedPrefix}estado - Current bot status
• ${usedPrefix}horario - Bot schedule/timezone

📊 *SYSTEM INFORMATION*
• ${usedPrefix}sistema - System specifications
• ${usedPrefix}system - System alternative
• ${usedPrefix}runtime - Runtime information
• ${usedPrefix}uptime - Uptime information

📈 *STATISTICS*
• ${usedPrefix}totalfunciones - Total functions count
• ${usedPrefix}newcommand - New command suggestions
• ${usedPrefix}sug - Suggestion shortcut

👥 *USER INFORMATION*
• ${usedPrefix}perfil - Your user profile
• ${usedPrefix}paisinfo <country> - Country information
• ${usedPrefix}flag <country> - Country flag info

🌐 *SERVER & NETWORK*
• ${usedPrefix}serverinfo - Server information
• ${usedPrefix}network - Network status
• ${usedPrefix}latency - Network latency
• ${usedPrefix}bandwidth - Bandwidth usage
• ${usedPrefix}connectivity - Connection status
• ${usedPrefix}endpoints - API endpoints status

📱 *PLATFORM INFO*
• ${usedPrefix}telegram - Telegram platform info
• ${usedPrefix}whatsapp - WhatsApp platform info
• ${usedPrefix}platform - Current platform
• ${usedPrefix}compatibility - Platform compatibility
• ${usedPrefix}features - Available features

🔧 *TECHNICAL DETAILS*
• ${usedPrefix}dependencies - Bot dependencies
• ${usedPrefix}modules - Loaded modules
• ${usedPrefix}plugins - Plugin information
• ${usedPrefix}libraries - Used libraries
• ${usedPrefix}apis - Connected APIs
• ${usedPrefix}database - Database status

📋 *HELP & SUPPORT*
• ${usedPrefix}help - General help
• ${usedPrefix}guide - User guide
• ${usedPrefix}commands - All commands list
• ${usedPrefix}faq - Frequently asked questions
• ${usedPrefix}support - Support information
• ${usedPrefix}contact - Contact details

🎯 *FEATURE OVERVIEW*
• ${usedPrefix}features - All bot features
• ${usedPrefix}capabilities - Bot capabilities
• ${usedPrefix}newfeatures - Latest features
• ${usedPrefix}updates - Recent updates
• ${usedPrefix}changelog - Change log
• ${usedPrefix}roadmap - Development roadmap

🌟 *PREMIUM INFO*
• ${usedPrefix}premium - Premium features info
• ${usedPrefix}subscription - Subscription details
• ${usedPrefix}pricing - Premium pricing
• ${usedPrefix}benefits - Premium benefits
• ${usedPrefix}upgrade - How to upgrade
• ${usedPrefix}premiumstatus - Check premium status

🔗 *LINKS & RESOURCES*
• ${usedPrefix}links - Important links
• ${usedPrefix}community - Community links
• ${usedPrefix}social - Social media links
• ${usedPrefix}github - Source code repository
• ${usedPrefix}documentation - Documentation
• ${usedPrefix}tutorials - Tutorial resources

📊 *USAGE METRICS*
• ${usedPrefix}dailystats - Daily usage stats
• ${usedPrefix}weeklystats - Weekly usage stats
• ${usedPrefix}monthlystats - Monthly usage stats
• ${usedPrefix}popularcmds - Most popular commands
• ${usedPrefix}activeusers - Active users count

🏆 *ACHIEVEMENTS & MILESTONES*
• ${usedPrefix}milestones - Bot milestones
• ${usedPrefix}achievements - Bot achievements
• ${usedPrefix}records - Usage records
• ${usedPrefix}leaderboard - User leaderboard
• ${usedPrefix}topusers - Top users ranking

⚙️ *CONFIGURATION INFO*
• ${usedPrefix}config - Bot configuration
• ${usedPrefix}settings - Current settings
• ${usedPrefix}permissions - Permission levels
• ${usedPrefix}limits - Usage limits
• ${usedPrefix}restrictions - Current restrictions

🎨 *CUSTOMIZATION*
• ${usedPrefix}themes - Available themes
• ${usedPrefix}languages - Supported languages
• ${usedPrefix}timezone - Timezone information
• ${usedPrefix}localization - Localization options

💡 *TIPS & INFORMATION:*
• Use these commands to learn more about the bot
• Check ${usedPrefix}ping regularly to monitor bot health
• Premium users get additional information and statistics
• Some commands may show different info based on your permissions`;

    // Send photo with caption for Telegram
    try {
      await bot.sendPhoto(m.chat, img, {
        caption: texto,
        parse_mode: 'Markdown'
      });
    } catch (error) {
      // Fallback to text message if image fails
      await bot.sendMessage(m.chat, texto, {
        parse_mode: 'Markdown'
      });
    }

  } catch (error) {
    console.error('Error in info menu command:', error);
    await bot.sendMessage(m.chat, '❌ An error occurred while displaying the info menu.');
  }
};

handler.help = ['info', 'menuinfo', 'infomenu', 'botinfo'];
handler.tags = ['main'];
handler.command = ['info', 'menuinfo', 'infomenu', 'botinfo', 'information'];

export default handler; 
const handler = async (m, { bot, usedPrefix }) => {
  try {
    const userId = m.from_user?.id || m.chat;

    // Initialize user data if not exists
    if (!global.db.data.users[userId]) {
      global.db.data.users[userId] = { lastcofre: 0 };
    }

    let img = 'https://cdn-sunflareteam.vercel.app/images/fe2072569a.jpg';
    let texto = `🤖 *SUBBOTS & CLONE BOTS MENU* 🔗

🚀 *SUBBOT CREATION*
• ${usedPrefix}serbot - Create subbot instance

⚙️ *SUBBOT MANAGEMENT*
• ${usedPrefix}deletesesion - Delete subbot session
• ${usedPrefix}deletebot - Delete subbot
• ${usedPrefix}deletesession - Delete session alternative
• ${usedPrefix}stop - Stop subbot
• ${usedPrefix}pausarbot - Pause subbot
• ${usedPrefix}bots - List all subbots
• ${usedPrefix}listjadibots - List subbots alternative
• ${usedPrefix}subbots - Show subbots

🔧 *SUBBOT SETTINGS*
• ${usedPrefix}setbotname <name> - Set bot name
• ${usedPrefix}setbotstatus <status> - Set bot status
• ${usedPrefix}setbotbio <bio> - Set bot bio
• ${usedPrefix}setbotpp <image> - Set bot profile picture
• ${usedPrefix}botprefix <prefix> - Set command prefix
• ${usedPrefix}botlang <language> - Set bot language

👥 *MULTI-INSTANCE*
• ${usedPrefix}setprimary - Set primary bot

🔐 *SUBBOT SECURITY*
• ${usedPrefix}bottoken - Manage bot tokens
• ${usedPrefix}botsession - Session management
• ${usedPrefix}botauth - Authentication settings
• ${usedPrefix}botpermissions - Permission settings
• ${usedPrefix}botwhitelist - Whitelist management
• ${usedPrefix}botblacklist - Blacklist management

📊 *SUBBOT MONITORING*
• ${usedPrefix}botstats - Subbot statistics
• ${usedPrefix}botusage - Usage analytics
• ${usedPrefix}botlogs - View bot logs
• ${usedPrefix}boterrors - Check error logs
• ${usedPrefix}botperformance - Performance metrics
• ${usedPrefix}botuptime - Check uptime

💰 *SUBBOT ECONOMY*
• ${usedPrefix}botprice - Subbot pricing
• ${usedPrefix}rentprice - Rental pricing
• ${usedPrefix}botpayment - Payment methods
• ${usedPrefix}botbilling - Billing information
• ${usedPrefix}botsubscription - Subscription status
• ${usedPrefix}botrefund - Refund requests

🌐 *SUBBOT NETWORK*
• ${usedPrefix}botnetwork - Bot network status
• ${usedPrefix}connectbot - Connect to network
• ${usedPrefix}disconnectbot - Disconnect from network
• ${usedPrefix}botping - Network ping test
• ${usedPrefix}botspeed - Speed test
• ${usedPrefix}botlatency - Check latency

🔄 *SUBBOT UPDATES*
• ${usedPrefix}updatebot - Update subbot
• ${usedPrefix}botversion - Check version
• ${usedPrefix}botchangelog - View changelog
• ${usedPrefix}autoUpdate - Auto-update settings
• ${usedPrefix}rollback - Rollback update
• ${usedPrefix}betabot - Beta features

📱 *PLATFORM SUPPORT*
• ${usedPrefix}whatsappbot - WhatsApp subbot
• ${usedPrefix}telegrambot - Telegram subbot
• ${usedPrefix}discordbot - Discord subbot
• ${usedPrefix}multiplatform - Multi-platform bot
• ${usedPrefix}crossplatform - Cross-platform sync
• ${usedPrefix}platformswitch - Switch platforms

🎛️ *ADVANCED FEATURES*
• ${usedPrefix}botapi - API management
• ${usedPrefix}botwebhook - Webhook settings
• ${usedPrefix}botdatabase - Database management
• ${usedPrefix}botplugins - Plugin management
• ${usedPrefix}botthemes - Theme customization
• ${usedPrefix}botbranding - Custom branding

🛠️ *TROUBLESHOOTING*
• ${usedPrefix}fixbot - Fix common issues
• ${usedPrefix}resetbot - Reset bot settings
• ${usedPrefix}debugbot - Debug mode
• ${usedPrefix}testbot - Test bot functionality
• ${usedPrefix}bothelp - Subbot help
• ${usedPrefix}botsupport - Technical support

📋 *SUBBOT TEMPLATES*
• ${usedPrefix}basicbot - Basic bot template
• ${usedPrefix}advancedbot - Advanced bot template
• ${usedPrefix}businessbot - Business bot template
• ${usedPrefix}gamebot - Gaming bot template
• ${usedPrefix}musicbot - Music bot template
• ${usedPrefix}custombot - Custom bot template

⚠️ *IMPORTANT NOTES:*
• Subbots require active WhatsApp/Telegram account
• Each subbot consumes server resources
• Premium users get priority subbot access
• Regular maintenance required for optimal performance
• Backup your subbot data regularly
• Follow platform terms of service

💡 *SUBBOT BENEFITS:*
• 24/7 availability for your groups
• Custom branding and personalization
• Independent operation from main bot
• Scalable for multiple groups
• Advanced features and customization
• Priority support and updates`;

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
    console.error('Error in subbots menu command:', error);
    await bot.sendMessage(m.chat, '❌ An error occurred while displaying the subbots menu.');
  }
};

handler.help = ['subbots', 'menusubbots', 'jadibot', 'serbot'];
handler.tags = ['main'];
handler.command = ['subbots', 'menusubbots', 'jadibot', 'serbot', 'clonebots'];

export default handler; 
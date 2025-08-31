const handler = async (m, { bot, usedPrefix }) => {
  try {
    const userId = m.from_user?.id || m.chat;

    // Initialize user data if not exists
    if (!global.db.data.users[userId]) {
      global.db.data.users[userId] = { lastcofre: 0 };
    }

    let img = 'https://cdn-sunflareteam.vercel.app/images/fe2072569a.jpg';
    let texto = `🎖️ *PREMIUM FEATURES MENU* 💎

✨ *PREMIUM STATUS*
• ${usedPrefix}tutosub - Premium tutorial
• ${usedPrefix}addpremsubs - Add premium subbot

💳 *PREMIUM SUBSCRIPTION*
• ${usedPrefix}addprem - Add premium user
• ${usedPrefix}addpremium - Add premium alternative
• ${usedPrefix}delprem - Remove premium user
• ${usedPrefix}delpremium - Remove premium alternative

🌟 *PREMIUM BENEFITS*
• ${usedPrefix}benefits - All premium benefits
• ${usedPrefix}features - Premium-only features
• ${usedPrefix}unlimited - Unlimited usage features
• ${usedPrefix}priority - Priority support access
• ${usedPrefix}exclusive - Exclusive content access
• ${usedPrefix}advanced - Advanced features

🚀 *PREMIUM DOWNLOADS*
• ${usedPrefix}premiumdl - Premium downloader
• ${usedPrefix}hddownload - HD quality downloads
• ${usedPrefix}batchdownload - Batch downloading
• ${usedPrefix}fastdownload - High-speed downloads
• ${usedPrefix}qualityselect - Quality selection
• ${usedPrefix}formatselect - Format selection

🤖 *PREMIUM AI FEATURES*
• ${usedPrefix}gpt4 - GPT-4 access (Premium)
• ${usedPrefix}claude - Claude AI (Premium)
• ${usedPrefix}premiumai - Premium AI models
• ${usedPrefix}advancedai - Advanced AI features
• ${usedPrefix}aiplus - AI Plus features
• ${usedPrefix}unlimitedai - Unlimited AI usage

🎨 *PREMIUM MEDIA TOOLS*
• ${usedPrefix}hd - HD image enhancement
• ${usedPrefix}upscale - Image upscaling
• ${usedPrefix}enhance - Media enhancement
• ${usedPrefix}watermarkremoval - Remove watermarks
• ${usedPrefix}backgroundremoval - Advanced BG removal
• ${usedPrefix}advancedediting - Advanced editing tools

🔍 *PREMIUM SEARCH*
• ${usedPrefix}advancedsearch - Advanced search features
• ${usedPrefix}deepsearch - Deep web search
• ${usedPrefix}premiumapis - Premium API access
• ${usedPrefix}unlimitedsearch - Unlimited searches
• ${usedPrefix}fastsearch - High-speed search
• ${usedPrefix}exclusivedata - Exclusive data access

⚡ *PREMIUM PERFORMANCE*
• ${usedPrefix}fastprocessing - Fast processing
• ${usedPrefix}priorityqueue - Priority processing queue
• ${usedPrefix}unlimitedusage - No usage limits
• ${usedPrefix}highspeed - High-speed operations
• ${usedPrefix}instantresponse - Instant responses
• ${usedPrefix}serveraccess - Premium server access

🛡️ *PREMIUM SECURITY*
• ${usedPrefix}privatesession - Private sessions
• ${usedPrefix}encrypteddata - Encrypted data storage
• ${usedPrefix}secureapi - Secure API access
• ${usedPrefix}vpnaccess - VPN-like privacy
• ${usedPrefix}anonymousmode - Anonymous usage
• ${usedPrefix}datasecurity - Enhanced data security

💾 *PREMIUM STORAGE*
• ${usedPrefix}cloudstorage - Cloud storage access
• ${usedPrefix}backupservice - Backup services
• ${usedPrefix}unlimitedstorage - Unlimited storage
• ${usedPrefix}filemanager - Advanced file manager
• ${usedPrefix}syncdata - Data synchronization
• ${usedPrefix}archiveaccess - Archive access

🎯 *PREMIUM CUSTOMIZATION*
• ${usedPrefix}customthemes - Custom themes
• ${usedPrefix}personalization - Personalization options
• ${usedPrefix}customcommands - Custom commands
• ${usedPrefix}brandedbot - Branded bot features
• ${usedPrefix}whitelabel - White-label options
• ${usedPrefix}customization - Full customization

📊 *PREMIUM ANALYTICS*
• ${usedPrefix}advancedstats - Advanced statistics
• ${usedPrefix}detailedanalytics - Detailed analytics
• ${usedPrefix}usagereports - Usage reports
• ${usedPrefix}performancemetrics - Performance metrics
• ${usedPrefix}customreports - Custom reports
• ${usedPrefix}dataexport - Data export options

🎮 *PREMIUM GAMING*
• ${usedPrefix}premiumgames - Premium games
• ${usedPrefix}exclusivegames - Exclusive games
• ${usedPrefix}advancedgaming - Advanced gaming features
• ${usedPrefix}gameplus - Game Plus features
• ${usedPrefix}competitivemode - Competitive gaming
• ${usedPrefix}tournaments - Tournament access

💬 *PREMIUM SUPPORT*
• ${usedPrefix}prioritysupport - Priority support
• ${usedPrefix}dedicatedsupport - Dedicated support agent
• ${usedPrefix}livechat - Live chat support
• ${usedPrefix}phonesuport - Phone support
• ${usedPrefix}premiumhelp - Premium help desk
• ${usedPrefix}instantsupport - Instant support

🔄 *PREMIUM AUTOMATION*
• ${usedPrefix}autofeatures - Automation features
• ${usedPrefix}scheduledtasks - Scheduled tasks
• ${usedPrefix}bulkoperations - Bulk operations
• ${usedPrefix}workflows - Custom workflows
• ${usedPrefix}smartautomation - Smart automation
• ${usedPrefix}advancedscripts - Advanced scripting

📱 *PREMIUM INTEGRATIONS*
• ${usedPrefix}apiintegrations - API integrations
• ${usedPrefix}thirdpartyapps - Third-party app access
• ${usedPrefix}webhooks - Webhook support
• ${usedPrefix}crossplatform - Cross-platform sync
• ${usedPrefix}cloudintegration - Cloud integrations
• ${usedPrefix}enterprisetools - Enterprise tools

💎 *EXCLUSIVE FEATURES*
• ${usedPrefix}betafeatures - Beta feature access
• ${usedPrefix}earlyaccess - Early access to updates
• ${usedPrefix}exclusivecontent - Exclusive content
• ${usedPrefix}vipfeatures - VIP-only features
• ${usedPrefix}advancedtools - Advanced tool suite
• ${usedPrefix}experimentalfeatures - Experimental features

⚠️ *PREMIUM INFORMATION:*
• Premium subscription unlocks all advanced features
• Unlimited usage of AI, downloads, and tools
• Priority support with faster response times
• Access to beta features and exclusive content
• Enhanced security and privacy options
• Custom branding and personalization options

💰 *PRICING PLANS:*
• Monthly: $9.99/month
• Yearly: $99.99/year (Save 17%)
• Lifetime: $299.99 (One-time payment)
• Enterprise: Custom pricing available

📞 *CONTACT FOR PREMIUM:*
• Support: @premium_support
• Sales: @premium_sales
• Billing: @premium_billing`;

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
    console.error('Error in premium menu command:', error);
    await bot.sendMessage(m.chat, '❌ An error occurred while displaying the premium menu.');
  }
};

handler.help = ['premium', 'menupremium', 'premiummenu', 'vip'];
handler.tags = ['main'];
handler.command = ['premium', 'menupremium', 'premiummenu', 'vip', 'subscription'];

export default handler; 
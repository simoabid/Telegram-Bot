const handler = async (m, { bot, usedPrefix }) => {
  try {
    const userId = m.from_user?.id || m.chat;

    // Initialize user data if not exists
    if (!global.db.data.users[userId]) {
      global.db.data.users[userId] = { lastcofre: 0 };
    }

    let img = 'https://cdn-sunflareteam.vercel.app/images/fe2072569a.jpg';
    let texto = `👑 *OWNER & ADMIN MENU* 🔐

⚠️ *WARNING: ADMIN ONLY COMMANDS* ⚠️
*These commands are restricted to bot owners and authorized administrators.*

👑 *OWNER MANAGEMENT*
• ${usedPrefix}addowner @user - Add bot owner
• ${usedPrefix}delowner @user - Remove bot owner
• ${usedPrefix}dsowner @user - Demote from owner
• ${usedPrefix}listowner - List all owners
• ${usedPrefix}owner - Show owner info

🎖️ *PREMIUM MANAGEMENT*
• ${usedPrefix}addprem @user <days> - Add premium user
• ${usedPrefix}addpremium @user <days> - Add premium alternative
• ${usedPrefix}delprem @user - Remove premium user
• ${usedPrefix}delpremium @user - Remove premium alternative
• ${usedPrefix}addpremsubs @user - Add premium subbot
• ${usedPrefix}delpremsub @user - Remove premium subbot

💰 *ECONOMY CONTROL*
• ${usedPrefix}addcorazones @user <amount> - Add hearts
• ${usedPrefix}añadirdiamantes @user <amount> - Add diamonds
• ${usedPrefix}addd @user <amount> - Add diamonds short
• ${usedPrefix}dard @user <amount> - Give diamonds
• ${usedPrefix}dardiamantes @user <amount> - Give diamonds full
• ${usedPrefix}setmoneda <currency> - Set bot currency
• ${usedPrefix}quitarmonedas @user <amount> - Remove coins

🤖 *BOT MANAGEMENT*
• ${usedPrefix}update - Update bot
• ${usedPrefix}actualizar - Update alternative
• ${usedPrefix}fix - Fix bot
• ${usedPrefix}fixed - Fixed alternative
• ${usedPrefix}autoadmin - Auto admin mode
• ${usedPrefix}tenerpoder - Have power mode
• ${usedPrefix}backup - Create backup
• ${usedPrefix}restore - Restore from backup
• ${usedPrefix}cleartmp - Clear temp files

📊 *USER MANAGEMENT*
• ${usedPrefix}banlist - View banned users
• ${usedPrefix}ban @user - Ban user globally
• ${usedPrefix}unban @user - Unban user
• ${usedPrefix}chetar @user - Check user data
• ${usedPrefix}online - View online users

💬 *GROUP MANAGEMENT*
• ${usedPrefix}grouplist - List all groups
• ${usedPrefix}join <link> - Join group
• ${usedPrefix}leave <groupid> - Leave group
• ${usedPrefix}autoadmin on/off - Auto admin mode
• ${usedPrefix}banchat <groupid> - Ban group
• ${usedPrefix}unbanchat <groupid> - Unban group

📝 *PLUGIN MANAGEMENT*
• ${usedPrefix}saveplugin <name> - Save plugin
• ${usedPrefix}deleteplugin <name> - Delete plugin
• ${usedPrefix}loadplugin <name> - Load plugin
• ${usedPrefix}listplugins - List all plugins
• ${usedPrefix}disableplugin <name> - Disable plugin
• ${usedPrefix}enableplugin <name> - Enable plugin

🔧 *CONFIGURATION*
• ${usedPrefix}setprefix <prefix> - Set command prefix
• ${usedPrefix}setlang <language> - Set bot language
• ${usedPrefix}setname <name> - Set bot name
• ${usedPrefix}setstatus <status> - Set bot status
• ${usedPrefix}setbio <bio> - Set bot bio

📊 *MONITORING*
• ${usedPrefix}stats - Bot statistics
• ${usedPrefix}usage - Resource usage
• ${usedPrefix}logs - View bot logs
• ${usedPrefix}errors - View error logs
• ${usedPrefix}performance - Performance metrics

📢 *BROADCASTING*
• ${usedPrefix}broadcast <message> - Broadcast to all chats
• ${usedPrefix}broadcastgc <message> - Broadcast to groups
• ${usedPrefix}broadcastpc <message> - Broadcast to private chats
• ${usedPrefix}spam <count> <message> - Spam message

🎮 *SUBBOTS*
• ${usedPrefix}jadibot - Become subbot
• ${usedPrefix}stopjadibot - Stop subbot
• ${usedPrefix}listjadibot - List subbots
• ${usedPrefix}serbot - Subbot management

💾 *DATABASE*
• ${usedPrefix}backup-db - Backup database
• ${usedPrefix}restore-db - Restore database
• ${usedPrefix}clear-db - Clear database
• ${usedPrefix}export-db - Export database
• ${usedPrefix}import-db - Import database

🔒 *SECURITY*
• ${usedPrefix}block @user - Block user
• ${usedPrefix}unblock @user - Unblock user
• ${usedPrefix}blocklist - View blocked users
• ${usedPrefix}antidelete on/off - Anti-delete mode
• ${usedPrefix}antiviewonce on/off - Anti-view once

📋 *REPORTS & FEEDBACK*
• ${usedPrefix}reporte - View reports
• ${usedPrefix}feedback - View feedback
• ${usedPrefix}suggestions - View suggestions
• ${usedPrefix}bugreports - View bug reports

⚙️ *ADVANCED SETTINGS*
• ${usedPrefix}debug on/off - Debug mode
• ${usedPrefix}maintenance on/off - Maintenance mode
• ${usedPrefix}public on/off - Public bot mode
• ${usedPrefix}autoread on/off - Auto read messages

🚨 *EMERGENCY COMMANDS*
• ${usedPrefix}emergency - Emergency stop
• ${usedPrefix}force-restart - Force restart
• ${usedPrefix}kill-process - Kill bot process
• ${usedPrefix}safe-mode - Enter safe mode

⚠️ *IMPORTANT NOTES:*
• These commands require owner privileges
• Use with extreme caution
• Some commands can affect all bot users
• Always backup before making major changes
• Contact support if you encounter issues`;

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
    console.error('Error in owner menu command:', error);
    await bot.sendMessage(m.chat, '❌ An error occurred while displaying the owner menu.');
  }
};

handler.help = ['owner', 'menuowner', 'ownermenu', 'admin'];
handler.tags = ['main'];
handler.command = ['owner', 'menuowner', 'ownermenu', 'adminmenu', 'propietario'];

export default handler; 
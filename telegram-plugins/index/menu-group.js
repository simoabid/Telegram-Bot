const handler = async (m, { bot, usedPrefix }) => {
  try {
    const userId = m.from_user?.id || m.chat;

    // Initialize user data if not exists
    if (!global.db.data.users[userId]) {
      global.db.data.users[userId] = { lastcofre: 0 };
    }

    let img = 'https://cdn-sunflareteam.vercel.app/images/fe2072569a.jpg';
    let texto = `👥 *GROUP MANAGEMENT MENU* 👑

👑 *ADMIN CONTROLS*
• ${usedPrefix}promote @user - Promote user to admin
• ${usedPrefix}darpija @user - Give admin powers
• ${usedPrefix}demote @user - Demote admin to member
• ${usedPrefix}degradar @user - Demote alternative
• ${usedPrefix}kick @user - Remove user from group
• ${usedPrefix}add <number> - Add user to group
• ${usedPrefix}agregar <number> - Add alternative
• ${usedPrefix}añadir <number> - Add user alternative
• ${usedPrefix}unban @user - Unban user

🔧 *GROUP SETTINGS*
• ${usedPrefix}group open/close - Open/close group
• ${usedPrefix}setname <name> - Change group name
• ${usedPrefix}gpdesc <description> - Set group description
• ${usedPrefix}groupdesc <description> - Description alternative
• ${usedPrefix}link - Get group invite link
• ${usedPrefix}linkgroup - Group link alternative
• ${usedPrefix}resetlink - Reset group link
• ${usedPrefix}revoke - Revoke link alternative
• ${usedPrefix}anularlink - Cancel link
• ${usedPrefix}infogrupo - View group information
• ${usedPrefix}infogp - Group info short

👻 *MEMBER MANAGEMENT*
• ${usedPrefix}tagall - Tag all members
• ${usedPrefix}hidetag <message> - Hidden tag message
• ${usedPrefix}notify <message> - Notify all
• ${usedPrefix}n <message> - Short notify
• ${usedPrefix}noti <message> - Notification
• ${usedPrefix}verfantasmas - Find inactive members
• ${usedPrefix}listanum - List group numbers

💬 *WELCOME & FAREWELL*
• ${usedPrefix}setwelcome <message> - Set welcome message
• ${usedPrefix}bienvenida <message> - Welcome alternative
• ${usedPrefix}setbye <message> - Set farewell message
• ${usedPrefix}despedida <message> - Farewell alternative
• ${usedPrefix}bye on/off - Toggle farewell

🛡️ *SECURITY & MODERATION*
• ${usedPrefix}antilink on/off - Anti-link protection
• ${usedPrefix}antifakes on/off - Anti-fake numbers
• ${usedPrefix}antibot on/off - Anti-bot protection
• ${usedPrefix}antispam on/off - Anti-spam system
• ${usedPrefix}antiara on/off - Anti-Arabic protection
• ${usedPrefix}antiver on/off - Anti-view once

🔇 *CHAT CONTROLS*
• ${usedPrefix}banchat - Disable bot in chat
• ${usedPrefix}unbanchat - Enable bot in chat
• ${usedPrefix}mute @user - Mute user
• ${usedPrefix}unmute @user - Unmute user
• ${usedPrefix}delete - Delete replied message

📊 *GROUP INFORMATION*
• ${usedPrefix}admins - List group admins
• ${usedPrefix}profile @user - View user profile
• ${usedPrefix}grouplist - List bot groups
• ${usedPrefix}online - Check online members

📝 *GROUP ACTIVITIES*
• ${usedPrefix}poll <question> - Create poll
• ${usedPrefix}sorteo <items> - Group raffle
• ${usedPrefix}sugerir <suggestion> - Make suggestion
• ${usedPrefix}config - Group configuration
• ${usedPrefix}rules - Group rules

🎉 *FUN GROUP FEATURES*
• ${usedPrefix}formarparejas - Form couples from members
• ${usedPrefix}formartrio - Form groups of three
• ${usedPrefix}top <topic> - Group top lists
• ${usedPrefix}guerra - Group war game

⏰ *SCHEDULING*
• ${usedPrefix}config_time - Set time configuration
• ${usedPrefix}reunion - Schedule meeting
• ${usedPrefix}evento - Create event

⚠️ *IMPORTANT:* Most commands require admin privileges in the group. The bot must also be an admin to execute moderation commands.`;

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
    console.error('Error in group menu command:', error);
    await bot.sendMessage(m.chat, '❌ An error occurred while displaying the group menu.');
  }
};

handler.help = ['group', 'menugroup', 'groupmenu', 'admin'];
handler.tags = ['main'];
handler.command = ['group', 'menugroup', 'groupmenu', 'admin', 'grupo'];

export default handler; 
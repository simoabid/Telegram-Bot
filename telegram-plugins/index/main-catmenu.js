const handler = async (m, { bot, usedPrefix }) => {
  try {
    const userId = m.from_user?.id || m.chat;

    // Initialize user data if not exists
    if (!global.db.data.users[userId]) {
      global.db.data.users[userId] = { lastcofre: 0 };
    }

    let img = 'https://cdn-sunflareteam.vercel.app/images/fe2072569a.jpg';
    let texto = `📂 *CATEGORY COMMANDS MENU* 📋

📥 *DOWNLOADS & MEDIA*
• /downloads - Media downloads (YouTube, TikTok, Instagram, etc.)
• /audio - Audio processing and music tools
• /imagecat - Image generation and editing tools

🎮 *ENTERTAINMENT & GAMES*
• /fun - Fun commands, games, and entertainment
• /anime - Anime and manga content
• /random - Random content generators
• /freefire - Free Fire gaming commands

🤖 *AI & AUTOMATION*
• /ai - Artificial intelligence assistants
• /subbots - Subbot and clone bot management
• /premium - Premium features and subscriptions

🛠️ *UTILITIES & TOOLS*
• /tools - General tools and utilities
• /search - Search engines and information lookup
• /stalking - Social media investigation tools

👥 *USER & GROUP MANAGEMENT*
• /group - Group administration and moderation
• /owner - Owner and admin commands
• /registration - User profiles and registration
• /pets - Pet system and virtual companions

🎲 *RPG & ECONOMY*
• /rpg - RPG system, levels, economy, and battles

ℹ️ *INFORMATION & HELP*
• /info - Bot information and system stats
• /categories - Main categories overview

🔞 *ADULT CONTENT*
• /nsfw - Adult content (18+ only)`;

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
    console.error('Error in catmenu command:', error);
    await bot.sendMessage(m.chat, '❌ An error occurred while displaying the category commands menu.');
  }
};

handler.help = ['catmenu', 'categorycommands', 'allcategories'];
handler.tags = ['main'];
handler.command = ['catmenu', 'categorycommands', 'allcategories', 'catcommands'];

export default handler; 
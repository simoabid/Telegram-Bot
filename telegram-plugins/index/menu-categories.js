const handler = async (m, { bot, usedPrefix }) => {
  try {
    const userId = m.from_user?.id || m.chat;

    // Initialize user data if not exists
    if (!global.db.data.users[userId]) {
      global.db.data.users[userId] = { lastcofre: 0 };
    }

    let img = 'https://cdn-sunflareteam.vercel.app/images/fe2072569a.jpg';
    let texto = `📚 *COMMAND CATEGORIES MENU* 📋

🎯 *QUICK ACCESS TO COMMAND CATEGORIES*
*Choose a category to see all related commands!*

📥 *DOWNLOADS*
• /downloads - All download commands
• YouTube, TikTok, Instagram, Spotify, etc.
• Music, videos, files, and media downloads

🎉 *FUN & ENTERTAINMENT*
• /fun - Entertainment commands
• Games, jokes, memes, reactions
• Random generators and social activities

🌀 *RPG & ECONOMY*
• /rpg - RPG and economy system
• Daily rewards, levels, battles, adventures
• Profile management and virtual economy

👥 *GROUP MANAGEMENT*
• /group - Group administration
• Admin tools, moderation, security
• Welcome messages and member management

🤖 *ARTIFICIAL INTELLIGENCE*
• /ai - AI and chatbot features
• ChatGPT, Gemini, image generation
• Smart assistants and AI tools

🛠️ *TOOLS & UTILITIES*
• /tools - Utility commands
• Stickers, converters, image tools
• Text processing and web utilities

🔍 *SEARCH & INFORMATION*
• /search - Search commands
• Web search, social media stalking
• Information gathering and lookups

🔞 *NSFW CONTENT* (18+)
• /nsfw - Adult content (18+)
• ⚠️ Use responsibly and in appropriate chats

👑 *OWNER & ADMIN*
• /owner - Bot management (Owners only)
• Administrative controls and bot settings
• ⚠️ Restricted to authorized users only

🎭 *ANIME & MANGA*
• /anime - Anime and manga content
• Character info, downloads, images, reactions
• Japanese culture and otaku features

ℹ️ *BOT INFORMATION*
• /info - Bot status and information
• System stats, performance metrics
• User profiles and technical details

🎖️ *PREMIUM FEATURES*
• /premium - Premium subscription features
• Advanced AI, unlimited downloads, priority support
• Exclusive content and enhanced capabilities

🖼️ *IMAGE & LOGO GENERATION*
• /imagecat - Image creation and editing
• AI generation, photo effects, logo creation
• Artistic filters and professional tools

🔊 *AUDIO & MUSIC*
• /audio - Audio processing and music
• Voice effects, music generation, sound editing
• Format conversion and audio analysis

🤖 *SUBBOTS & CLONE BOTS*
• /subbots - Subbot and clone bot features
• Create, manage, and configure subbots
• Multi-instance bot management

🕵️ *STALKING & SOCIAL INTEL*
• /stalking - Social media investigation
• Profile analysis, deep search, intelligence gathering
• Ethical investigation tools

📝 *REGISTRATION & PROFILES*
• /registration - User registration and profiles
• Profile management, settings, customization
• Personal information and verification

🐾 *PETS & COMPANIONS*
• /pets - Pet system and companions
• Pet care, training, adventures, competitions
• Virtual pet management and activities

🎲 *RANDOM GENERATORS*
• /random - Random content generators
• Random facts, entertainment, predictions
• Creative inspiration and decision making

🎮 *FREE FIRE*
• /freefire - Free Fire gaming commands
• Maps, rules, tournaments, and gaming tools

📊 *ADDITIONAL MENUS*
• /menu - Complete command list
• /help - General help information
• /ping - Check bot status

🌟 *PREMIUM FEATURES*
• Some advanced features require premium access
• Contact admins for premium subscription
• Enhanced AI, unlimited downloads, priority support

💡 *USAGE TIPS:*
• Click on any category command above to explore
• Each category contains 20-50+ specialized commands
• Commands are organized for easy discovery
• Use ${usedPrefix}help <command> for specific command help

🔗 *QUICK LINKS:*
• Support Group: [Join Here]
• Updates Channel: [Subscribe]
• Bot Status: Online ✅
• Total Commands: 434+

📱 *PLATFORM SUPPORT:*
• ✅ Telegram (Current)
• ✅ WhatsApp (Available)
• 🔄 Multi-platform compatibility

⚡ *BOT STATISTICS:*
• Active Users: 10,000+
• Groups Served: 1,500+
• Commands Executed Daily: 50,000+
• Uptime: 99.9%

🎯 *FEATURED CATEGORIES:*
Most popular: Downloads, Fun, RPG, AI
Most useful: Tools, Search, Group Management
Most advanced: AI, Owner Commands`;

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
    console.error('Error in categories menu command:', error);
    await bot.sendMessage(m.chat, '❌ An error occurred while displaying the categories menu.');
  }
};

handler.help = ['categories', 'menucategories', 'categoriesmenu', 'menus'];
handler.tags = ['main'];
handler.command = ['categories', 'menucategories', 'categoriesmenu', 'menus', 'categorias'];

export default handler; 
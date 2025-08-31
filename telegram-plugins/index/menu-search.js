const handler = async (m, { bot, usedPrefix }) => {
  try {
    const userId = m.from_user?.id || m.chat;

    // Initialize user data if not exists
    if (!global.db.data.users[userId]) {
      global.db.data.users[userId] = { lastcofre: 0 };
    }

    let img = 'https://cdn-sunflareteam.vercel.app/images/fe2072569a.jpg';
    let texto = `🔍 *SEARCH & INFORMATION MENU* 🌐

🌐 *WEB SEARCH*
• ${usedPrefix}bingsearch <query> - Bing AI search
• ${usedPrefix}wiki <query> - Wikipedia search
• ${usedPrefix}rev <query> - Reverse search

🖼️ *IMAGE SEARCH*
• ${usedPrefix}image <query> - Image search
• ${usedPrefix}pinterest <query> - Pinterest images
• ${usedPrefix}pin <query> - Pinterest alternative

🎵 *MUSIC & VIDEO SEARCH*
• ${usedPrefix}ttsearch <query> - TikTok search
• ${usedPrefix}tiktoksearch <query> - TikTok search alternative
• ${usedPrefix}quemusica <audio> - What music is this
• ${usedPrefix}letra <song> - Song lyrics search

📱 *SOCIAL MEDIA STALKING*
• ${usedPrefix}igstalk <username> - Instagram stalker
• ${usedPrefix}instagramstalk <username> - Instagram alternative
• ${usedPrefix}ffstalk <username> - Free Fire stalker
• ${usedPrefix}ffplayer <username> - FF player info

🛒 *SHOPPING & APPS*
• ${usedPrefix}playstore <app> - Play Store search
• ${usedPrefix}phsearch <query> - Adult content search
• ${usedPrefix}xnxxsearch <query> - XNXX search
• ${usedPrefix}xnxxs <query> - XNXX short search
• ${usedPrefix}xvideosearch <query> - XVideos search

📊 *INFORMATION TOOLS*
• ${usedPrefix}weather <city> - Weather information
• ${usedPrefix}time <timezone> - World time zones
• ${usedPrefix}currency <amount> <from> <to> - Currency rates
• ${usedPrefix}crypto <coin> - Cryptocurrency prices
• ${usedPrefix}stocks <symbol> - Stock prices

🌍 *LOCATION & MAPS*
• ${usedPrefix}maps <location> - Google Maps
• ${usedPrefix}satellite <location> - Satellite view
• ${usedPrefix}directions <from> <to> - Directions
• ${usedPrefix}country <country> - Country info
• ${usedPrefix}city <city> - City information

📚 *EDUCATIONAL SEARCH*
• ${usedPrefix}define <word> - Dictionary definition
• ${usedPrefix}translate <text> - Language translation
• ${usedPrefix}synonym <word> - Synonyms
• ${usedPrefix}antonym <word> - Antonyms
• ${usedPrefix}encyclopedia <topic> - Encyclopedia

🎮 *GAMING & ANIME*
• ${usedPrefix}steam <game> - Steam game search
• ${usedPrefix}anime <title> - Anime information
• ${usedPrefix}manga <title> - Manga search
• ${usedPrefix}pokemon <name> - Pokémon info
• ${usedPrefix}character <name> - Character info

💻 *TECH SEARCH*
• ${usedPrefix}npm <package> - NPM packages
• ${usedPrefix}github <repo> - GitHub repositories
• ${usedPrefix}stackoverflow <query> - Stack Overflow
• ${usedPrefix}documentation <tech> - Tech docs
• ${usedPrefix}api <service> - API information

📰 *NEWS & TRENDS*
• ${usedPrefix}news <topic> - Latest news
• ${usedPrefix}trending - Trending topics
• ${usedPrefix}reddit <subreddit> - Reddit search
• ${usedPrefix}twitter-trends - Twitter trends
• ${usedPrefix}google-trends <topic> - Google Trends

🎬 *ENTERTAINMENT SEARCH*
• ${usedPrefix}movie <title> - Movie information
• ${usedPrefix}series <title> - TV series info
• ${usedPrefix}imdb <title> - IMDB ratings
• ${usedPrefix}netflix <title> - Netflix search
• ${usedPrefix}book <title> - Book search

🔍 *ADVANCED SEARCH*
• ${usedPrefix}reverse-image <image> - Reverse image search
• ${usedPrefix}barcode <code> - Barcode lookup
• ${usedPrefix}qr-decode <qr> - QR code decoder
• ${usedPrefix}domain <domain> - Domain information
• ${usedPrefix}ip <address> - IP address lookup

📞 *CONTACT & BUSINESS*
• ${usedPrefix}phone <number> - Phone number info
• ${usedPrefix}email <email> - Email validation
• ${usedPrefix}company <name> - Company search
• ${usedPrefix}linkedin <profile> - LinkedIn search
• ${usedPrefix}yellowpages <business> - Business lookup

🎯 *SPECIALIZED SEARCH*
• ${usedPrefix}recipe <dish> - Recipe search
• ${usedPrefix}health <symptom> - Health information
• ${usedPrefix}legal <topic> - Legal information
• ${usedPrefix}academic <paper> - Academic papers
• ${usedPrefix}patent <invention> - Patent search

📊 *ANALYTICS & DATA*
• ${usedPrefix}website-info <url> - Website analytics
• ${usedPrefix}seo-check <url> - SEO analysis
• ${usedPrefix}social-stats <profile> - Social media stats
• ${usedPrefix}competitor <website> - Competitor analysis

💡 *TIPS:*
• Be specific with your search queries for better results
• Some searches may take a few seconds to complete
• Use quotes for exact phrase searches
• Combine keywords for more accurate results`;

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
    console.error('Error in search menu command:', error);
    await bot.sendMessage(m.chat, '❌ An error occurred while displaying the search menu.');
  }
};

handler.help = ['search', 'menusearch', 'searchmenu', 'find'];
handler.tags = ['main'];
handler.command = ['search', 'menusearch', 'searchmenu', 'find', 'buscar'];

export default handler; 
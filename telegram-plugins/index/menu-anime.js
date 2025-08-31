const handler = async (m, { bot, usedPrefix }) => {
  try {
    const userId = m.from_user?.id || m.chat;

    // Initialize user data if not exists
    if (!global.db.data.users[userId]) {
      global.db.data.users[userId] = { lastcofre: 0 };
    }

    let img = 'https://cdn-sunflareteam.vercel.app/images/fe2072569a.jpg';
    let texto = `🎭 *ANIME & MANGA MENU* 🌸

🎌 *ANIME INFORMATION*
• ${usedPrefix}infoanime <title> - Anime information
• ${usedPrefix}animeinfo <title> - Anime info alternative

📺 *ANIME DOWNLOADS*
• ${usedPrefix}anime <name> - Download anime episodes
• ${usedPrefix}animemp4 <title> - Download anime in MP4
• ${usedPrefix}animedl <url> - Download from anime sites
• ${usedPrefix}crunchyroll <url> - Crunchyroll downloader
• ${usedPrefix}funimation <url> - Funimation downloader

🖼️ *ANIME IMAGES & WALLPAPERS*
• ${usedPrefix}waifu - Random waifu images
• ${usedPrefix}neko - Neko girl images

🎭 *ANIME REACTIONS*
• ${usedPrefix}acosar @user - Anime harassment reaction

🌸 *KAWAII CONTENT*
• ${usedPrefix}kawaii - Random kawaii images
• ${usedPrefix}chibi <character> - Chibi versions
• ${usedPrefix}moe - Moe anime girls
• ${usedPrefix}tsundere - Tsundere content
• ${usedPrefix}yandere - Yandere content
• ${usedPrefix}kuudere - Kuudere content

🎮 *ANIME GAMES & QUIZZES*
• ${usedPrefix}animequiz - Anime knowledge quiz
• ${usedPrefix}guesswaifu - Guess the waifu game
• ${usedPrefix}animetrivia - Anime trivia questions
• ${usedPrefix}waifubattle @user - Waifu battle game
• ${usedPrefix}animeguess - Guess the anime game

🎵 *ANIME MUSIC & OPENINGS*
• ${usedPrefix}animesong <anime> - Anime opening/ending songs
• ${usedPrefix}op <anime> - Opening themes
• ${usedPrefix}ed <anime> - Ending themes
• ${usedPrefix}ost <anime> - Original soundtracks
• ${usedPrefix}jpop - Japanese pop music
• ${usedPrefix}vocaloid - Vocaloid songs

📚 *MANGA FEATURES*
• ${usedPrefix}mangaread <title> - Read manga online
• ${usedPrefix}mangadownload <title> - Download manga chapters
• ${usedPrefix}manhwa <title> - Korean manhwa
• ${usedPrefix}manhua <title> - Chinese manhua
• ${usedPrefix}webtoon <title> - Webtoon comics

🗾 *JAPANESE CULTURE*
• ${usedPrefix}japanese <text> - Japanese translation
• ${usedPrefix}hiragana <text> - Convert to hiragana
• ${usedPrefix}katakana <text> - Convert to katakana
• ${usedPrefix}kanji <text> - Kanji information
• ${usedPrefix}jlpt <level> - JLPT study materials
• ${usedPrefix}japanfacts - Japanese culture facts

🎌 *SEASONAL ANIME*
• ${usedPrefix}seasonal - Current season anime
• ${usedPrefix}upcoming - Upcoming anime releases
• ${usedPrefix}airing - Currently airing anime
• ${usedPrefix}completed - Completed anime series
• ${usedPrefix}popular - Most popular anime
• ${usedPrefix}trending - Trending anime

🏆 *ANIME RANKINGS*
• ${usedPrefix}topanime - Top rated anime
• ${usedPrefix}topmanga - Top rated manga
• ${usedPrefix}animeranking - Anime rankings
• ${usedPrefix}waifuranking - Waifu rankings
• ${usedPrefix}bestgirl - Best girl contests
• ${usedPrefix}bestboy - Best boy contests

🎪 *ANIME COMMUNITY*
• ${usedPrefix}animerecommend - Get anime recommendations
• ${usedPrefix}similar <anime> - Find similar anime
• ${usedPrefix}animegenre <genre> - Anime by genre
• ${usedPrefix}animestudio <studio> - Anime by studio
• ${usedPrefix}seiyuu <name> - Voice actor information

🌟 *SPECIAL FEATURES*
• ${usedPrefix}randomanime - Random anime suggestion
• ${usedPrefix}animeoftheday - Anime of the day
• ${usedPrefix}animecalendar - Anime release calendar
• ${usedPrefix}animetrends - Current anime trends
• ${usedPrefix}otaku - Otaku culture content

💡 *TIPS:*
• Use specific anime titles for better search results
• Many commands support both English and Japanese titles
• Some features may require premium for unlimited access
• Join anime discussion groups for better experience`;

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
    console.error('Error in anime menu command:', error);
    await bot.sendMessage(m.chat, '❌ An error occurred while displaying the anime menu.');
  }
};

handler.help = ['anime', 'menuanime', 'animemenu', 'manga'];
handler.tags = ['main'];
handler.command = ['anime', 'menuanime', 'animemenu', 'manga', 'otaku'];

export default handler; 
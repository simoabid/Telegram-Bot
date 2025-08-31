const handler = async (m, { bot, usedPrefix }) => {
  try {
    const userId = m.from_user?.id || m.chat;

    // Initialize user data if not exists
    if (!global.db.data.users[userId]) {
      global.db.data.users[userId] = { lastcofre: 0 };
    }

    let img = 'https://cdn-sunflareteam.vercel.app/images/fe2072569a.jpg';
    let texto = `📥 *DOWNLOADS MENU* 📥

🎵 *MUSIC & AUDIO*
• ${usedPrefix}ytmp3 <url> - Download YouTube audio
• ${usedPrefix}bytmp4 <url> - Download YouTube video (Barboza)
• ${usedPrefix}music <song> - Download Spotify music
• ${usedPrefix}play <song name> - Search and download music
• ${usedPrefix}play1 <song> - Alternative music search
• ${usedPrefix}play2 <song> - SoundCloud alternative
• ${usedPrefix}ytmp3doc <url> - Download as document
• ${usedPrefix}ytmp4doc <url> - Download video as document
• ${usedPrefix}mp3doc <url> - Alternative doc download
• ${usedPrefix}mp4doc <url> - Video doc download

🎬 *VIDEOS*
• ${usedPrefix}tiktok2 <url> - Download TikTok videos (Barboza)
• ${usedPrefix}ttmp3 <url> - TikTok audio download
• ${usedPrefix}bttmp3 <url> - Barboza TikTok MP3
• ${usedPrefix}ttsearch <query> - Search TikTok videos
• ${usedPrefix}ig <url> - Download Instagram content
• ${usedPrefix}igdl <url> - Instagram downloader
• ${usedPrefix}igstory <username> - Download IG stories
• ${usedPrefix}x <url> - Download Twitter/X videos

📱 *SOCIAL MEDIA*
• ${usedPrefix}likee <url> - Download Likee videos
• ${usedPrefix}pinterest <url> - Download Pinterest images
• ${usedPrefix}pin <url> - Pinterest alternative
• ${usedPrefix}tweetposts <url> - Download Twitter posts

📁 *FILES & APPS*
• ${usedPrefix}mediafire2 <url> - Download MediaFire files
• ${usedPrefix}mdfire2 <url> - MediaFire alternative
• ${usedPrefix}mf2 <url> - MediaFire shortcut
• ${usedPrefix}apk2 <app> - Download APK files
• ${usedPrefix}happymodsearch <app> - Search modded APKs
• ${usedPrefix}hpmsearch <app> - HappyMod search
• ${usedPrefix}gitclone <repo> - Clone GitHub repository

🎭 *ANIME & ENTERTAINMENT*
• ${usedPrefix}anime <name> - Download anime episodes
• ${usedPrefix}peliculas <movie> - Download movies
• ${usedPrefix}pelisplus <movie> - Alternative movie source

🔗 *CONVERTERS*
• ${usedPrefix}tourl2 <media> - Convert media to URL
• ${usedPrefix}tomp3 <video> - Convert video to MP3
• ${usedPrefix}toaudio <video> - Convert to audio

📋 *PLAYLISTS*
• ${usedPrefix}playlist <url> - Download YouTube playlist

💡 *TIP:* Use these commands with URLs or search terms to download content from various platforms!`;

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
    console.error('Error in downloads menu command:', error);
    await bot.sendMessage(m.chat, '❌ An error occurred while displaying the downloads menu.');
  }
};

handler.help = ['downloads', 'menudownloads', 'downloadmenu'];
handler.tags = ['main'];
handler.command = ['downloads', 'menudownloads', 'downloadmenu', 'descargas'];

export default handler; 
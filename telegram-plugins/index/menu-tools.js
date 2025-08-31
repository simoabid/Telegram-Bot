const handler = async (m, { bot, usedPrefix }) => {
  try {
    const userId = m.from_user?.id || m.chat;

    // Initialize user data if not exists
    if (!global.db.data.users[userId]) {
      global.db.data.users[userId] = { lastcofre: 0 };
    }

    let img = 'https://cdn-sunflareteam.vercel.app/images/fe2072569a.jpg';
    let texto = `🛠️ *TOOLS & UTILITIES MENU* ⚙️

🎨 *STICKER TOOLS*
• ${usedPrefix}sticker - Convert image/video to sticker
• ${usedPrefix}stiker - Sticker alternative
• ${usedPrefix}s - Quick sticker conversion
• ${usedPrefix}take <text> - Take/steal sticker
• ${usedPrefix}robar <text> - Steal sticker (Spanish)
• ${usedPrefix}wm <text> - Add watermark to sticker
• ${usedPrefix}scat - Cat sticker generator
• ${usedPrefix}stickercat - Cat sticker alternative
• ${usedPrefix}cats - Cat stickers
• ${usedPrefix}emojimix <emoji1+emoji2> - Mix emojis
• ${usedPrefix}qc <text> - Quote to sticker
• ${usedPrefix}stikerly <text> - Text to sticker
• ${usedPrefix}brat <text> - Brat-style sticker

🔄 *CONVERTERS*
• ${usedPrefix}tourl2 <media> - Convert media to URL
• ${usedPrefix}tomp3 <video> - Convert video to MP3
• ${usedPrefix}toaudio <video> - Convert to audio
• ${usedPrefix}tts <text> - Text to speech

🖼️ *IMAGE TOOLS*
• ${usedPrefix}hd <image> - Enhance image quality
• ${usedPrefix}remini <image> - Enhance alternative
• ${usedPrefix}upscale <image> - Upscale image
• ${usedPrefix}removebg <image> - Remove background
• ${usedPrefix}bg <image> - Remove background short

🔍 *SEARCH & INFO*
• ${usedPrefix}google <query> - Google search
• ${usedPrefix}wikipedia <query> - Wikipedia search
• ${usedPrefix}imagen <query> - Image search
• ${usedPrefix}pinterest <query> - Pinterest search
• ${usedPrefix}ytsearch <query> - YouTube search
• ${usedPrefix}playstore <app> - Play Store search

🌐 *WEB TOOLS*
• ${usedPrefix}ssweb <url> - Website screenshot
• ${usedPrefix}shorturl <url> - Shorten URL
• ${usedPrefix}expandurl <url> - Expand shortened URL
• ${usedPrefix}qr <text> - Generate QR code
• ${usedPrefix}barcode <text> - Generate barcode

📊 *INFORMATION TOOLS*
• ${usedPrefix}weather <city> - Weather information
• ${usedPrefix}time <timezone> - World time
• ${usedPrefix}calc <expression> - Calculator
• ${usedPrefix}currency <amount> <from> <to> - Currency converter
• ${usedPrefix}translate <text> - Language translator

🔧 *UTILITY TOOLS*
• ${usedPrefix}fake <text> - Fake message generator
• ${usedPrefix}demo <command> - Command demonstration
• ${usedPrefix}inspect <link> - Inspect WhatsApp link
• ${usedPrefix}delete - Delete replied message
• ${usedPrefix}react <emoji> - React to message

📱 *SOCIAL MEDIA TOOLS*
• ${usedPrefix}igstalk <username> - Instagram stalker
• ${usedPrefix}ttstalk <username> - TikTok stalker
• ${usedPrefix}githubstalk <username> - GitHub stalker
• ${usedPrefix}npmstalk <package> - NPM package info

🎵 *AUDIO TOOLS*
• ${usedPrefix}bass <audio> - Bass boost audio
• ${usedPrefix}blown <audio> - Blown audio effect
• ${usedPrefix}deep <audio> - Deep audio effect
• ${usedPrefix}earrape <audio> - Earrape effect
• ${usedPrefix}fast <audio> - Speed up audio
• ${usedPrefix}nightcore <audio> - Nightcore effect

🔐 *SECURITY TOOLS*
• ${usedPrefix}encrypt <text> - Encrypt text
• ${usedPrefix}decrypt <text> - Decrypt text
• ${usedPrefix}hash <text> - Generate hash
• ${usedPrefix}base64 <text> - Base64 encode/decode

📋 *TEXT TOOLS*
• ${usedPrefix}reverse <text> - Reverse text
• ${usedPrefix}upper <text> - Uppercase text
• ${usedPrefix}lower <text> - Lowercase text
• ${usedPrefix}count <text> - Count characters/words
• ${usedPrefix}fancy <text> - Fancy text generator

🎲 *RANDOM GENERATORS*
• ${usedPrefix}uuid - Generate UUID
• ${usedPrefix}password <length> - Generate password
• ${usedPrefix}color - Random color generator
• ${usedPrefix}number <min> <max> - Random number

💡 *TIP:* Reply to media files when using conversion tools for best results!`;

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
    console.error('Error in tools menu command:', error);
    await bot.sendMessage(m.chat, '❌ An error occurred while displaying the tools menu.');
  }
};

handler.help = ['tools', 'menutools', 'toolsmenu', 'utilities'];
handler.tags = ['main'];
handler.command = ['tools', 'menutools', 'toolsmenu', 'utilities', 'herramientas'];

export default handler; 
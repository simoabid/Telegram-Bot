const handler = async (m, { bot, usedPrefix }) => {
  try {
    const userId = m.from_user?.id || m.chat;

    // Initialize user data if not exists
    if (!global.db.data.users[userId]) {
      global.db.data.users[userId] = { lastcofre: 0 };
    }

    let img = 'https://cdn-sunflareteam.vercel.app/images/fe2072569a.jpg';
    let texto = `🖼️ *IMAGE & LOGO GENERATION MENU* 🎨

🎨 *AI IMAGE GENERATION*
• ${usedPrefix}dalle <prompt> - DALL-E image generation
• ${usedPrefix}flux <prompt> - Flux AI images
• ${usedPrefix}barbozai <prompt> - Custom AI images

🖌️ *LOGO CREATION*
• ${usedPrefix}logo <text> - Generate logos
• ${usedPrefix}textlogo <text> - Text-based logos
• ${usedPrefix}3dlogo <text> - 3D logo creation
• ${usedPrefix}neonlogo <text> - Neon-style logos
• ${usedPrefix}glitchlogo <text> - Glitch effect logos
• ${usedPrefix}firelogo <text> - Fire effect logos
• ${usedPrefix}waterlogo <text> - Water effect logos
• ${usedPrefix}goldlogo <text> - Golden logos

🎭 *ANIME & WAIFU IMAGES*
• ${usedPrefix}waifu - Random waifu images
• ${usedPrefix}neko - Neko girl images
• ${usedPrefix}animegirl - Anime girl generator
• ${usedPrefix}husbando - Male anime characters
• ${usedPrefix}kawaii - Kawaii anime images
• ${usedPrefix}chibi <character> - Chibi-style images
• ${usedPrefix}animeprofile - Anime profile pictures

🔧 *IMAGE EDITING TOOLS*
• ${usedPrefix}hd <image> - Enhance image quality
• ${usedPrefix}remini <image> - Enhance alternative
• ${usedPrefix}upscale <image> - Image upscaling
• ${usedPrefix}removebg <image> - Remove background
• ${usedPrefix}bg <image> - Remove background short
• ${usedPrefix}imgg <image> - Image upload to ImgBB
• ${usedPrefix}imggblox <image> - Image upload alternative

🎪 *SPECIAL EFFECTS*
• ${usedPrefix}vintage <image> - Vintage filter
• ${usedPrefix}sepia <image> - Sepia effect
• ${usedPrefix}blackwhite <image> - Black & white
• ${usedPrefix}invert <image> - Invert colors
• ${usedPrefix}pixelate <image> - Pixelate effect
• ${usedPrefix}oil <image> - Oil painting effect
• ${usedPrefix}cartoon <image> - Cartoon effect
• ${usedPrefix}sketch <image> - Sketch effect

🌈 *COLOR MANIPULATION*
• ${usedPrefix}colorize <image> - Colorize black & white
• ${usedPrefix}hue <image> - Change hue
• ${usedPrefix}temperature <image> - Color temperature
• ${usedPrefix}tint <image> - Add color tint
• ${usedPrefix}gradient <colors> - Create gradients
• ${usedPrefix}palette <image> - Extract color palette
• ${usedPrefix}recolor <image> <color> - Recolor image

🖼️ *FRAME & BORDERS*
• ${usedPrefix}frame <image> - Add frames
• ${usedPrefix}border <image> - Add borders
• ${usedPrefix}rounded <image> - Rounded corners
• ${usedPrefix}shadow <image> - Drop shadow
• ${usedPrefix}glow <image> - Glow effect
• ${usedPrefix}outline <image> - Add outline
• ${usedPrefix}vignette <image> - Vignette effect

📐 *SIZE & CROP TOOLS*
• ${usedPrefix}resize <image> <size> - Resize image
• ${usedPrefix}crop <image> - Crop image
• ${usedPrefix}square <image> - Make square
• ${usedPrefix}circle <image> - Circular crop
• ${usedPrefix}rotate <image> <angle> - Rotate image
• ${usedPrefix}flip <image> - Flip horizontal/vertical
• ${usedPrefix}scale <image> - Scale image

✨ *ARTISTIC FILTERS*
• ${usedPrefix}watercolor <image> - Watercolor effect
• ${usedPrefix}pencil <image> - Pencil drawing
• ${usedPrefix}charcoal <image> - Charcoal sketch
• ${usedPrefix}pastel <image> - Pastel colors
• ${usedPrefix}impressionist <image> - Impressionist style
• ${usedPrefix}abstract <image> - Abstract art
• ${usedPrefix}mosaic <image> - Mosaic effect

🎯 *TEXT ON IMAGES*
• ${usedPrefix}addtext <image> <text> - Add text to image
• ${usedPrefix}meme <image> <text> - Create memes
• ${usedPrefix}caption <image> <text> - Add captions
• ${usedPrefix}watermark <image> <text> - Add watermark
• ${usedPrefix}quote <text> - Quote images
• ${usedPrefix}motivational <text> - Motivational posters
• ${usedPrefix}demotivational <text> - Demotivational posters

🔥 *TRENDING STYLES*
• ${usedPrefix}cyberpunk <prompt> - Cyberpunk style
• ${usedPrefix}steampunk <prompt> - Steampunk aesthetic
• ${usedPrefix}vaporwave <prompt> - Vaporwave style
• ${usedPrefix}synthwave <prompt> - Synthwave aesthetic
• ${usedPrefix}gothic <prompt> - Gothic style
• ${usedPrefix}minimalist <prompt> - Minimalist design
• ${usedPrefix}retro <prompt> - Retro style

🌟 *PROFILE PICTURES*
• ${usedPrefix}pfp <style> - Profile picture generator
• ${usedPrefix}avatar <description> - Custom avatars
• ${usedPrefix}dp <style> - Display picture maker
• ${usedPrefix}circle-pfp <image> - Circular profile pic
• ${usedPrefix}gaming-pfp <game> - Gaming profile pics
• ${usedPrefix}aesthetic-pfp - Aesthetic profile pics

🎪 *COLLAGE & COMBINATION*
• ${usedPrefix}collage <images> - Create collages
• ${usedPrefix}merge <images> - Merge images
• ${usedPrefix}split <image> - Split into parts
• ${usedPrefix}overlay <base> <overlay> - Image overlay
• ${usedPrefix}blend <images> - Blend images
• ${usedPrefix}composite <images> - Composite images

🔍 *IMAGE ANALYSIS*
• ${usedPrefix}analyze <image> - Analyze image content
• ${usedPrefix}describe <image> - Describe image
• ${usedPrefix}colors <image> - Extract dominant colors
• ${usedPrefix}metadata <image> - Image metadata
• ${usedPrefix}quality <image> - Image quality check
• ${usedPrefix}dimensions <image> - Get image dimensions

🎨 *DRAWING TOOLS*
• ${usedPrefix}canvas <size> - Create blank canvas
• ${usedPrefix}draw <description> - AI drawing
• ${usedPrefix}doodle <style> - Generate doodles
• ${usedPrefix}pattern <type> - Create patterns
• ${usedPrefix}texture <type> - Generate textures
• ${usedPrefix}mandala - Generate mandalas

💡 *TIPS & INFORMATION:*
• Use detailed prompts for better AI generation results
• High-quality input images produce better edited results
• Some features may require premium subscription
• Processing time varies based on image complexity
• Save your favorite generated images for future use`;

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
    console.error('Error in image menu command:', error);
    await bot.sendMessage(m.chat, '❌ An error occurred while displaying the image menu.');
  }
};

handler.help = ['imagecat', 'menuimage', 'imagemenu', 'logo'];
handler.tags = ['main'];
handler.command = ['imagecat', 'menuimage', 'imagemenu', 'logo', 'images'];

export default handler; 
const handler = async (m, { bot, usedPrefix }) => {
  try {
    const userId = m.from_user?.id || m.chat;

    // Initialize user data if not exists
    if (!global.db.data.users[userId]) {
      global.db.data.users[userId] = { lastcofre: 0 };
    }

    let img = 'https://cdn-sunflareteam.vercel.app/images/fe2072569a.jpg';
    let texto = `🔞 *NSFW CONTENT MENU* 🔞

⚠️ *WARNING: ADULT CONTENT (18+)* ⚠️
*This menu contains adult content. Use responsibly and only in appropriate groups/chats.*

🎭 *ANIME NSFW*
• ${usedPrefix}genshin - Genshin Impact NSFW
• ${usedPrefix}hololive - Hololive NSFW
• ${usedPrefix}touhou - Touhou NSFW
• ${usedPrefix}fateseries - Fate series NSFW
• ${usedPrefix}gamecg - Game CG NSFW
• ${usedPrefix}anime - General anime NSFW

👙 *CATEGORIES*
• ${usedPrefix}bikini - Bikini images
• ${usedPrefix}swimsuit - Swimsuit content
• ${usedPrefix}schoolswimsuit - School swimsuit
• ${usedPrefix}maid - Maid outfits
• ${usedPrefix}uniform - Uniform content
• ${usedPrefix}dress - Dress content

🎨 *CHARACTER TYPES*
• ${usedPrefix}catgirl - Cat girl content
• ${usedPrefix}foxgirl - Fox girl content
• ${usedPrefix}wolfgirl - Wolf girl content
• ${usedPrefix}bunnygirl - Bunny girl content
• ${usedPrefix}demon - Demon girl content
• ${usedPrefix}vampire - Vampire content

👗 *CLOTHING & ACCESSORIES*
• ${usedPrefix}bra - Bra content
• ${usedPrefix}nobra - No bra content
• ${usedPrefix}underwear - Underwear content
• ${usedPrefix}skirt - Skirt content
• ${usedPrefix}shorts - Shorts content
• ${usedPrefix}stockings - Stockings content

💄 *FEATURES & STYLES*
• ${usedPrefix}blonde - Blonde hair
• ${usedPrefix}pinkhair - Pink hair
• ${usedPrefix}whitehair - White hair
• ${usedPrefix}greenhair - Green hair
• ${usedPrefix}ponytail - Ponytail style
• ${usedPrefix}twintail - Twin tail style

👀 *ACCESSORIES*
• ${usedPrefix}glasses - Glasses content
• ${usedPrefix}sunglasses - Sunglasses content
• ${usedPrefix}headband - Headband content
• ${usedPrefix}headphone - Headphone content
• ${usedPrefix}tie - Tie content
• ${usedPrefix}chain - Chain accessories

🎪 *SPECIAL CONTENT*
• ${usedPrefix}idol - Idol content
• ${usedPrefix}gun - Gun themed
• ${usedPrefix}weapon - Weapon themed
• ${usedPrefix}food - Food themed
• ${usedPrefix}bed - Bed scenes
• ${usedPrefix}beach - Beach content

🔞 *EXPLICIT CONTENT*
• ${usedPrefix}nude - Nude content
• ${usedPrefix}topless - Topless content
• ${usedPrefix}sex - Adult scenes
• ${usedPrefix}sex2 - Adult scenes 2
• ${usedPrefix}sex3 - Adult scenes 3
• ${usedPrefix}breast - Breast focused
• ${usedPrefix}nipples - Nipple content
• ${usedPrefix}erectnipples - Erect nipples

💧 *ADVANCED CONTENT*
• ${usedPrefix}wet - Wet content
• ${usedPrefix}tears - Tears content
• ${usedPrefix}drunk - Drunk content
• ${usedPrefix}seethrough - See-through content
• ${usedPrefix}bondage - Bondage content
• ${usedPrefix}fingering - Fingering content

🎬 *VIDEO CONTENT*
• ${usedPrefix}xnxxdl <url> - XNXX downloader
• ${usedPrefix}phsearch <query> - PornHub search
• ${usedPrefix}videoxxx - XXX videos
• ${usedPrefix}vídeoxxx - XXX videos (Spanish)
• ${usedPrefix}videoxxxlesbi - Lesbian videos
• ${usedPrefix}videolesbixxx - Lesbian XXX videos
• ${usedPrefix}pornolesbivid - Lesbian porn videos
• ${usedPrefix}pornolesbianavid - Lesbian porn videos
• ${usedPrefix}pornolesbiv - Lesbian porn short
• ${usedPrefix}pornolesbianav - Lesbian porn alternative
• ${usedPrefix}pornolesv - Lesbian porn very short

📱 *PACKS & SEARCH*
• ${usedPrefix}pack - NSFW pack 1
• ${usedPrefix}pack2 - NSFW pack 2
• ${usedPrefix}pack3 - NSFW pack 3
• ${usedPrefix}packxxx - XXX packs
• ${usedPrefix}r34 <character> - Rule 34 search
• ${usedPrefix}rule34 <character> - Rule 34 alternative
• ${usedPrefix}xnxxsearch <query> - XNXX search
• ${usedPrefix}xvideosearch <query> - XVideos search

⚠️ *IMPORTANT NOTES:*
• This content is for adults only (18+)
• Use only in private chats or NSFW groups
• Respect others and use responsibly
• Some commands may require premium access
• Content availability may vary by region`;

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
    console.error('Error in NSFW menu command:', error);
    await bot.sendMessage(m.chat, '❌ An error occurred while displaying the NSFW menu.');
  }
};

handler.help = ['nsfw', 'menunsfw', 'nsfwmenu', 'adult'];
handler.tags = ['main'];
handler.command = ['nsfw', 'menunsfw', 'nsfwmenu', 'adult', '18+'];

export default handler; 
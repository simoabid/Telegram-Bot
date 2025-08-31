const handler = async (m, { bot, usedPrefix }) => {
  try {
    const userId = m.from_user?.id || m.chat;

    // Initialize user data if not exists
    if (!global.db.data.users[userId]) {
      global.db.data.users[userId] = { lastcofre: 0 };
    }

    let img = 'https://cdn-sunflareteam.vercel.app/images/fe2072569a.jpg';
    let texto = `🎲 *RANDOM GENERATORS MENU* 🔀

🎯 *RANDOM CONTENT*
• ${usedPrefix}meme - Random memes
• ${usedPrefix}mp4meme - Random MP4 memes
• ${usedPrefix}paisinfo <country> - Country information
• ${usedPrefix}flag <country> - Country flags

🎭 *RANDOM ENTERTAINMENT*
• ${usedPrefix}randomvideo - Random videos
• ${usedPrefix}randomimage - Random images
• ${usedPrefix}randommeme - Random memes
• ${usedPrefix}randomgif - Random GIFs
• ${usedPrefix}randomsticker - Random stickers
• ${usedPrefix}randomemoji - Random emojis
• ${usedPrefix}randomreaction - Random reactions

🎵 *RANDOM MEDIA*
• ${usedPrefix}randomsong - Random music
• ${usedPrefix}randomplaylist - Random playlists
• ${usedPrefix}randomartist - Random artists
• ${usedPrefix}randomalbum - Random albums
• ${usedPrefix}randomgenre - Random music genres
• ${usedPrefix}randomradio - Random radio stations
• ${usedPrefix}randompodcast - Random podcasts

🎬 *RANDOM MOVIES & TV*
• ${usedPrefix}randommovie - Random movies
• ${usedPrefix}randomseries - Random TV series
• ${usedPrefix}randomactor - Random actors
• ${usedPrefix}randomcharacter - Random characters
• ${usedPrefix}randomscene - Random movie scenes
• ${usedPrefix}randomtrailer - Random trailers
• ${usedPrefix}randomreview - Random reviews

📚 *RANDOM BOOKS & STORIES*
• ${usedPrefix}randombook - Random books
• ${usedPrefix}randomstory - Random stories
• ${usedPrefix}randompoem - Random poetry
• ${usedPrefix}randomauthor - Random authors
• ${usedPrefix}randomnovel - Random novels
• ${usedPrefix}randomfiction - Random fiction
• ${usedPrefix}randomnonfiction - Random non-fiction

🎮 *RANDOM GAMING*
• ${usedPrefix}randomgame - Random games
• ${usedPrefix}randomgamer - Random gamers
• ${usedPrefix}randomconsole - Random consoles
• ${usedPrefix}randomgenre - Random game genres
• ${usedPrefix}randomachievement - Random achievements
• ${usedPrefix}randomchallenge - Random challenges
• ${usedPrefix}randomquest - Random quests

🍔 *RANDOM FOOD & DRINKS*
• ${usedPrefix}randomfood - Random food
• ${usedPrefix}randomrecipe - Random recipes
• ${usedPrefix}randomdrink - Random drinks
• ${usedPrefix}randomcuisine - Random cuisines
• ${usedPrefix}randomingredient - Random ingredients
• ${usedPrefix}randomdessert - Random desserts
• ${usedPrefix}randomsnack - Random snacks

🌍 *RANDOM PLACES & TRAVEL*
• ${usedPrefix}randomcountry - Random countries
• ${usedPrefix}randomcity - Random cities
• ${usedPrefix}randomdestination - Random destinations
• ${usedPrefix}randomlandmark - Random landmarks
• ${usedPrefix}randombeach - Random beaches
• ${usedPrefix}randommountain - Random mountains
• ${usedPrefix}randommuseum - Random museums

🎨 *RANDOM ART & CREATIVITY*
• ${usedPrefix}randomart - Random artwork
• ${usedPrefix}randomartist - Random artists
• ${usedPrefix}randomcolor - Random colors
• ${usedPrefix}randompattern - Random patterns
• ${usedPrefix}randomdesign - Random designs
• ${usedPrefix}randomlogo - Random logos
• ${usedPrefix}randomfont - Random fonts

🔬 *RANDOM SCIENCE & TECH*
• ${usedPrefix}randomscience - Random science facts
• ${usedPrefix}randomtech - Random technology
• ${usedPrefix}randominvention - Random inventions
• ${usedPrefix}randomdiscovery - Random discoveries
• ${usedPrefix}randomexperiment - Random experiments
• ${usedPrefix}randomformula - Random formulas
• ${usedPrefix}randomtheory - Random theories

🏃 *RANDOM SPORTS & FITNESS*
• ${usedPrefix}randomsport - Random sports
• ${usedPrefix}randomathlete - Random athletes
• ${usedPrefix}randomteam - Random teams
• ${usedPrefix}randomexercise - Random exercises
• ${usedPrefix}randomworkout - Random workouts
• ${usedPrefix}randomyoga - Random yoga poses
• ${usedPrefix}randomdance - Random dance moves

🎪 *RANDOM ACTIVITIES*
• ${usedPrefix}randomactivity - Random activities
• ${usedPrefix}randomhobby - Random hobbies
• ${usedPrefix}randomchallenge - Random challenges
• ${usedPrefix}randomtask - Random tasks
• ${usedPrefix}randomproject - Random projects
• ${usedPrefix}randomskill - Random skills to learn
• ${usedPrefix}randomgoal - Random goals

👥 *RANDOM SOCIAL*
• ${usedPrefix}randomname - Random names
• ${usedPrefix}randomperson - Random person generator
• ${usedPrefix}randomprofile - Random profiles
• ${usedPrefix}randomconversation - Random conversation starters
• ${usedPrefix}randomquestion - Random questions
• ${usedPrefix}randomicebreaker - Random ice breakers
• ${usedPrefix}randomdate - Random date ideas

🎯 *RANDOM GENERATORS*
• ${usedPrefix}randomnumber - Random numbers
• ${usedPrefix}randomletter - Random letters
• ${usedPrefix}randomword - Random words
• ${usedPrefix}randompassword - Random passwords
• ${usedPrefix}randomcode - Random codes
• ${usedPrefix}randomid - Random IDs
• ${usedPrefix}randomuuid - Random UUIDs

🔮 *RANDOM PREDICTIONS*
• ${usedPrefix}randomfortune - Random fortune telling
• ${usedPrefix}randomhoroscope - Random horoscopes
• ${usedPrefix}randomprediction - Random predictions
• ${usedPrefix}randommagic8ball - Magic 8-ball answers
• ${usedPrefix}randomtarot - Random tarot cards
• ${usedPrefix}randomcrystalball - Crystal ball readings
• ${usedPrefix}randomfuture - Random future scenarios

🎊 *RANDOM CELEBRATIONS*
• ${usedPrefix}randomholiday - Random holidays
• ${usedPrefix}randomevent - Random events
• ${usedPrefix}randomcelebration - Random celebrations
• ${usedPrefix}randomfestival - Random festivals
• ${usedPrefix}randomparty - Random party ideas
• ${usedPrefix}randomgift - Random gift ideas
• ${usedPrefix}randomsurprise - Random surprises

🌟 *SPECIAL RANDOM FEATURES*
• ${usedPrefix}randomeverything - Random everything
• ${usedPrefix}surpriseme - Surprise me
• ${usedPrefix}luckyDip - Lucky dip
• ${usedPrefix}wheeloffortune - Wheel of fortune
• ${usedPrefix}randomroulette - Random roulette
• ${usedPrefix}mysterybox - Mystery box
• ${usedPrefix}randomadventure - Random adventure

💡 *RANDOM TIPS:*
• Use random generators for inspiration
• Great for breaking creative blocks
• Perfect for decision making
• Fun for group activities
• Discover new interests and hobbies
• Generate content ideas
• Add spontaneity to your day`;

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
    console.error('Error in random menu command:', error);
    await bot.sendMessage(m.chat, '❌ An error occurred while displaying the random menu.');
  }
};

handler.help = ['random', 'menurandom', 'randommenu', 'generators'];
handler.tags = ['main'];
handler.command = ['random', 'menurandom', 'randommenu', 'generators', 'aleatorio'];

export default handler; 
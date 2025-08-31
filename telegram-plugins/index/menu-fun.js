const handler = async (m, { bot, usedPrefix }) => {
  try {
    const userId = m.from_user?.id || m.chat;

    // Initialize user data if not exists
    if (!global.db.data.users[userId]) {
      global.db.data.users[userId] = { lastcofre: 0 };
    }

    let img = 'https://cdn-sunflareteam.vercel.app/images/fe2072569a.jpg';
    let texto = `🎉 *FUN & ENTERTAINMENT MENU* 🎪

🎮 *GAMES*
• ${usedPrefix}ppt <rock/paper/scissors> - Rock Paper Scissors
• ${usedPrefix}slot - Slot machine game
• ${usedPrefix}ruleta - Roulette game
• ${usedPrefix}acertijo - Riddles and puzzles
• ${usedPrefix}ahorcado - Hangman game
• ${usedPrefix}buscarpalabra - Word search game
• ${usedPrefix}apostar - Casino games
• ${usedPrefix}suitpvp @user - Battle another user

😂 *COMEDY & JOKES*
• ${usedPrefix}chiste - Random jokes
• ${usedPrefix}meme - Random memes
• ${usedPrefix}insulto @user - Playful insults
• ${usedPrefix}oracion - Random phrases
• ${usedPrefix}consejo - Random advice

🎲 *RANDOM & CHANCE*
• ${usedPrefix}gay @user - Gay percentage
• ${usedPrefix}love @user - Love compatibility
• ${usedPrefix}top <topic> - Top 10 lists
• ${usedPrefix}pregunta - Random question
• ${usedPrefix}facto - Random facts
• ${usedPrefix}sorteo - Random draw

💕 *RELATIONSHIPS & SOCIAL*
• ${usedPrefix}marry @user - Marry someone
• ${usedPrefix}divorce @user - Divorce someone
• ${usedPrefix}kiss @user - Kiss someone
• ${usedPrefix}besar @user - Kiss alternative
• ${usedPrefix}pat @user - Pet someone
• ${usedPrefix}acariciar @user - Pet alternative
• ${usedPrefix}formarpareja - Form couples
• ${usedPrefix}formarparejas - Form multiple couples
• ${usedPrefix}formartrio - Form groups of three
• ${usedPrefix}amigorandom - Find random friend

🎭 *REACTIONS & ANIME*
• ${usedPrefix}acariciar @user - Pet someone
• ${usedPrefix}golpear @user - Hit someone
• ${usedPrefix}lamer @user - Lick someone
• ${usedPrefix}morder @user - Bite someone
• ${usedPrefix}saludar @user - Greet someone
• ${usedPrefix}bailar @user - Dance with someone

🎪 *SPECIAL ACTIVITIES*
• ${usedPrefix}cazar - Go hunting
• ${usedPrefix}escape - Escape room
• ${usedPrefix}detective - Detective game
• ${usedPrefix}aventura - Adventure mode
• ${usedPrefix}magia - Magic tricks
• ${usedPrefix}robot - Robot mode
• ${usedPrefix}aliens - Alien encounter

🍳 *COOKING & FOOD*
• ${usedPrefix}receta <dish> - Get recipes
• ${usedPrefix}postres - Dessert recipes
• ${usedPrefix}chefextremo - Extreme chef mode
• ${usedPrefix}chefloco - Crazy chef mode
• ${usedPrefix}batallachef - Chef battle

🎨 *CREATIVE & MISC*
• ${usedPrefix}poesia - Generate poetry
• ${usedPrefix}morse <text> - Morse code converter
• ${usedPrefix}calculador <expression> - Calculator
• ${usedPrefix}sorteo <items> - Random picker
• ${usedPrefix}reto - Random challenge

💡 *TIP:* Most commands work better in groups and some require mentioning other users with @username!`;

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
    console.error('Error in fun menu command:', error);
    await bot.sendMessage(m.chat, '❌ An error occurred while displaying the fun menu.');
  }
};

handler.help = ['fun', 'menufun', 'funmenu', 'entertainment'];
handler.tags = ['main'];
handler.command = ['fun', 'menufun', 'funmenu', 'entertainment', 'diversion'];

export default handler; 
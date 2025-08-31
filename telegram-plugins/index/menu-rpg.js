const handler = async (m, { bot, usedPrefix }) => {
  try {
    const userId = m.from_user?.id || m.chat;

    // Initialize user data if not exists
    if (!global.db.data.users[userId]) {
      global.db.data.users[userId] = { lastcofre: 0 };
    }

    let img = 'https://cdn-sunflareteam.vercel.app/images/fe2072569a.jpg';
    let texto = `🌀 *RPG & ECONOMY MENU* 💰

💰 *ECONOMY & COINS*
• ${usedPrefix}daily - Daily reward
• ${usedPrefix}claim - Claim daily reward
• ${usedPrefix}semanal - Weekly bonus
• ${usedPrefix}weekly - Weekly alternative
• ${usedPrefix}mensual - Monthly reward
• ${usedPrefix}monthly - Monthly alternative
• ${usedPrefix}claim2 - Alternative claim
• ${usedPrefix}claim3 - Third claim option
• ${usedPrefix}dulces - Check wallet/candies
• ${usedPrefix}wallet - Check wallet
• ${usedPrefix}cartera - Check balance
• ${usedPrefix}bal - Balance check
• ${usedPrefix}coins - Check coins balance

📊 *LEVELS & EXPERIENCE*
• ${usedPrefix}perfil - View your profile
• ${usedPrefix}profile - Profile alternative
• ${usedPrefix}nivel - Check your level
• ${usedPrefix}level - Level check
• ${usedPrefix}levelup - Level up
• ${usedPrefix}lvl - Level shortcut
• ${usedPrefix}leaderboard - View leaderboard
• ${usedPrefix}lb - Leaderboard shortcut
• ${usedPrefix}top - Top users ranking

🎒 *INVENTORY & ITEMS*
• ${usedPrefix}inventario - View inventory
• ${usedPrefix}inv - Short inventory
• ${usedPrefix}buy - Buy items
• ${usedPrefix}buyall - Buy all items
• ${usedPrefix}buycoins - Buy coins
• ${usedPrefix}heal - Heal yourself
• ${usedPrefix}curar - Alternative heal
• ${usedPrefix}minar - Mining activity
• ${usedPrefix}mine - Mining alternative
• ${usedPrefix}excavar - Excavation activity
• ${usedPrefix}dig - Dig alternative

⚔️ *BATTLES & ADVENTURES*
• ${usedPrefix}aventura - Go on adventure
• ${usedPrefix}adventure - Adventure alternative
• ${usedPrefix}batalla @user - Battle another user
• ${usedPrefix}pelear @user - Fight someone
• ${usedPrefix}cazar - Hunt for resources
• ${usedPrefix}hunt - Hunt alternative
• ${usedPrefix}berburu - Hunt animals
• ${usedPrefix}explorar - Explore new areas
• ${usedPrefix}bosque - Explore forest
• ${usedPrefix}crimen - Commit crimes (risky!)
• ${usedPrefix}crime - Crime alternative

🐾 *PETS & COMPANIONS*
• ${usedPrefix}mascota - Check your pet
• ${usedPrefix}level - Pet level system
• ${usedPrefix}viajar - Travel with pet
• ${usedPrefix}topmascota - Top pets ranking

🏆 *ACHIEVEMENTS & STATS*
• ${usedPrefix}ki - Check your Ki energy
• ${usedPrefix}chekarti - Check artifacts
• ${usedPrefix}chetarki - Check special items
• ${usedPrefix}rf - Character collection
• ${usedPrefix}ib - Item bonuses

📖 *REGISTRATION & PROFILE*
• ${usedPrefix}reg <name>.<age> - Register profile
• ${usedPrefix}unreg - Unregister
• ${usedPrefix}setgenero <gender> - Set gender
• ${usedPrefix}setdescripcion <text> - Set description
• ${usedPrefix}setbirth <date> - Set birthday
• ${usedPrefix}perfildates - View profile details

🎃 *SPECIAL EVENTS*
• ${usedPrefix}halloween - Halloween event
• ${usedPrefix}biblia - Bible verses
• ${usedPrefix}confesion - Make confession

⚙️ *ADMIN COMMANDS*
• ${usedPrefix}quitarxp @user <amount> - Remove XP
• ${usedPrefix}quitardulces @user - Remove candies
• ${usedPrefix}quitarmonedas @user - Remove coins
• ${usedPrefix}dardulces @user <amount> - Give candies

💡 *TIP:* Start with ${usedPrefix}reg to register your profile, then use ${usedPrefix}daily to get your first coins!`;

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
    console.error('Error in RPG menu command:', error);
    await bot.sendMessage(m.chat, '❌ An error occurred while displaying the RPG menu.');
  }
};

handler.help = ['rpg', 'menurpg', 'rpgmenu', 'economy'];
handler.tags = ['main'];
handler.command = ['rpg', 'menurpg', 'rpgmenu', 'economy', 'economia'];

export default handler; 
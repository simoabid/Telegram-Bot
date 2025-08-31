const handler = async (m, { bot, usedPrefix }) => {
  try {
    const userId = m.from_user?.id || m.chat;

    // Initialize user data if not exists
    if (!global.db.data.users[userId]) {
      global.db.data.users[userId] = { lastcofre: 0 };
    }

    let img = 'https://cdn-sunflareteam.vercel.app/images/fe2072569a.jpg';
    let texto = `🐾 *PETS & COMPANIONS MENU* 🐕

🐕 *PET MANAGEMENT*
• ${usedPrefix}mascota - View your pet
• ${usedPrefix}topmascota - Top pets ranking
• ${usedPrefix}viajar - Travel with pet

🎯 *PET TYPES & ADOPTION*
• ${usedPrefix}petshop - Visit pet shop
• ${usedPrefix}availablepets - Available pets
• ${usedPrefix}dog - Adopt a dog
• ${usedPrefix}cat - Adopt a cat
• ${usedPrefix}bird - Adopt a bird
• ${usedPrefix}rabbit - Adopt a rabbit
• ${usedPrefix}hamster - Adopt a hamster
• ${usedPrefix}fish - Adopt a fish

📊 *PET STATISTICS*
• ${usedPrefix}petstats - Pet statistics
• ${usedPrefix}petlevel - Pet level information
• ${usedPrefix}petexp - Pet experience points
• ${usedPrefix}pethealth - Pet health status
• ${usedPrefix}pethappiness - Pet happiness level
• ${usedPrefix}petage - Pet age
• ${usedPrefix}petbirthday - Pet birthday

🍖 *PET CARE*
• ${usedPrefix}feedpet - Feed your pet
• ${usedPrefix}petfood - Pet food inventory
• ${usedPrefix}buyfood - Buy pet food
• ${usedPrefix}washpet - Wash your pet
• ${usedPrefix}groomPet - Groom your pet
• ${usedPrefix}petbath - Give pet a bath
• ${usedPrefix}brushpet - Brush your pet

🏥 *PET HEALTH*
• ${usedPrefix}healpet - Heal your pet
• ${usedPrefix}petdoctor - Visit pet doctor
• ${usedPrefix}petvaccine - Vaccinate pet
• ${usedPrefix}petmedicine - Pet medicine
• ${usedPrefix}petfirstaid - Pet first aid
• ${usedPrefix}petcheckup - Pet health checkup
• ${usedPrefix}petinsurance - Pet insurance

🎮 *PET ACTIVITIES*
• ${usedPrefix}playwithpet - Play with pet
• ${usedPrefix}petgames - Pet games
• ${usedPrefix}walkpet - Walk your pet
• ${usedPrefix}petexercise - Exercise with pet
• ${usedPrefix}petpark - Visit pet park
• ${usedPrefix}petplayground - Pet playground
• ${usedPrefix}pettoys - Pet toys

🎓 *PET TRAINING*
• ${usedPrefix}trainpet - Train your pet
• ${usedPrefix}petcommands - Teach commands
• ${usedPrefix}pettricks - Pet tricks
• ${usedPrefix}petobedience - Obedience training
• ${usedPrefix}petagility - Agility training
• ${usedPrefix}petschool - Pet training school
• ${usedPrefix}petcertificate - Training certificates

🌍 *PET ADVENTURES*
• ${usedPrefix}viajar - Travel with pet
• ${usedPrefix}petadventure - Pet adventure
• ${usedPrefix}explore - Explore with pet
• ${usedPrefix}pethunt - Hunt with pet
• ${usedPrefix}petquest - Pet quests
• ${usedPrefix}petmission - Pet missions
• ${usedPrefix}excavar - Dig with pet

🏆 *PET COMPETITIONS*
• ${usedPrefix}topmascota - Top pets ranking
• ${usedPrefix}petcompetition - Pet competitions
• ${usedPrefix}petshow - Pet shows
• ${usedPrefix}petcontest - Pet contests
• ${usedPrefix}petrace - Pet races
• ${usedPrefix}petbattle @user - Pet battle
• ${usedPrefix}pettournament - Pet tournaments

🛍️ *PET SHOPPING*
• ${usedPrefix}petstore - Pet store
• ${usedPrefix}petaccessories - Pet accessories
• ${usedPrefix}petclothes - Pet clothes
• ${usedPrefix}petcollars - Pet collars
• ${usedPrefix}pettags - Pet ID tags
• ${usedPrefix}petbeds - Pet beds
• ${usedPrefix}petcarriers - Pet carriers

🎨 *PET CUSTOMIZATION*
• ${usedPrefix}petcolor - Change pet color
• ${usedPrefix}petbreed - Pet breed info
• ${usedPrefix}petpattern - Pet patterns
• ${usedPrefix}petsize - Pet size
• ${usedPrefix}pethairstyle - Pet hairstyles
• ${usedPrefix}petmarkings - Pet markings
• ${usedPrefix}petfeatures - Pet features

🏠 *PET HOME*
• ${usedPrefix}pethouse - Pet house
• ${usedPrefix}petroom - Pet room
• ${usedPrefix}petgarden - Pet garden
• ${usedPrefix}petplayarea - Pet play area
• ${usedPrefix}petfurniture - Pet furniture
• ${usedPrefix}petdecorations - Pet decorations
• ${usedPrefix}pethomecleaning - Clean pet home

👥 *PET SOCIAL*
• ${usedPrefix}petfriends - Pet friends
• ${usedPrefix}petplaydates - Pet playdates
• ${usedPrefix}petcommunity - Pet community
• ${usedPrefix}petclub - Join pet club
• ${usedPrefix}petmeetup - Pet meetups
• ${usedPrefix}petparty - Pet parties
• ${usedPrefix}petsocial - Pet social activities

📱 *PET TECHNOLOGY*
• ${usedPrefix}petapp - Pet care app
• ${usedPrefix}pettracker - Pet GPS tracker
• ${usedPrefix}petcamera - Pet monitoring camera
• ${usedPrefix}petfeeder - Automatic pet feeder
• ${usedPrefix}pettechgadgets - Pet tech gadgets
• ${usedPrefix}petsmartdevices - Smart pet devices
• ${usedPrefix}petai - Pet AI assistant

🎪 *PET ENTERTAINMENT*
• ${usedPrefix}pettv - Pet TV shows
• ${usedPrefix}petmusic - Music for pets
• ${usedPrefix}petvideo - Pet videos
• ${usedPrefix}petphotos - Pet photo album
• ${usedPrefix}petmovies - Pet movies
• ${usedPrefix}petgames - Interactive pet games
• ${usedPrefix}petpuzzles - Pet puzzle games

💰 *PET ECONOMY*
• ${usedPrefix}petjob - Pet jobs
• ${usedPrefix}petearnings - Pet earnings
• ${usedPrefix}petsavings - Pet savings account
• ${usedPrefix}petinvestments - Pet investments
• ${usedPrefix}petshares - Pet stock shares
• ${usedPrefix}petbusiness - Pet business
• ${usedPrefix}petfranchise - Pet franchise

📚 *PET EDUCATION*
• ${usedPrefix}petfacts - Pet facts
• ${usedPrefix}petcare101 - Basic pet care
• ${usedPrefix}petbehavior - Pet behavior guide
• ${usedPrefix}petnutrition - Pet nutrition guide
• ${usedPrefix}petpsychology - Pet psychology
• ${usedPrefix}pettraining101 - Training basics
• ${usedPrefix}petfirstaid - Pet first aid guide

🎁 *PET REWARDS*
• ${usedPrefix}pettreats - Pet treats
• ${usedPrefix}petrewards - Pet reward system
• ${usedPrefix}petgifts - Gifts for pets
• ${usedPrefix}petloyalty - Pet loyalty program
• ${usedPrefix}petpoints - Pet reward points
• ${usedPrefix}petpremium - Premium pet features
• ${usedPrefix}petsubscription - Pet subscription box

💡 *PET CARE TIPS:*
• Feed your pet regularly to keep them healthy
• Play with your pet daily to maintain happiness
• Take your pet on adventures to gain experience
• Train your pet to learn new tricks and commands
• Participate in competitions to earn rewards
• Keep your pet clean and well-groomed
• Visit the pet doctor regularly for checkups`;

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
    console.error('Error in pets menu command:', error);
    await bot.sendMessage(m.chat, '❌ An error occurred while displaying the pets menu.');
  }
};

handler.help = ['pets', 'menupets', 'mascota', 'companions'];
handler.tags = ['main'];
handler.command = ['pets', 'menupets', 'mascota', 'companions', 'petmenu'];

export default handler; 
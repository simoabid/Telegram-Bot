const handler = async (m, { bot, usedPrefix }) => {
  try {
    const userId = m.from_user?.id || m.chat;

    // Initialize user data if not exists
    if (!global.db.data.users[userId]) {
      global.db.data.users[userId] = { lastcofre: 0 };
    }

    let img = 'https://cdn-sunflareteam.vercel.app/images/fe2072569a.jpg';
    let texto = `📝 *REGISTRATION & PROFILE MENU* 👤

🆔 *USER REGISTRATION*
• ${usedPrefix}reg <name>.<age> - Register your profile
• ${usedPrefix}unreg - Unregister your profile
• ${usedPrefix}unregister - Remove registration alternative

👤 *PROFILE MANAGEMENT*
• ${usedPrefix}perfil - View your profile
• ${usedPrefix}profile - Display profile information
• ${usedPrefix}perfildates - Profile dates and info
• ${usedPrefix}pedates - Profile dates short
• ${usedPrefix}perd - Profile dates very short

⚙️ *PROFILE SETTINGS*
• ${usedPrefix}setgenero <gender> - Set your gender
• ${usedPrefix}setgenre <gender> - Set gender alternative
• ${usedPrefix}setbirth <date> - Set birthday
• ${usedPrefix}setcumpleaños <date> - Set birthday (Spanish)
• ${usedPrefix}setdescription <text> - Set description
• ${usedPrefix}setdesc <text> - Set description short

🌍 *LOCATION & CONTACT*
• ${usedPrefix}setcountry <country> - Set your country
• ${usedPrefix}setcity <city> - Set your city
• ${usedPrefix}setlocation <location> - Set location
• ${usedPrefix}settimezone <timezone> - Set timezone
• ${usedPrefix}setlanguage <language> - Set language
• ${usedPrefix}setemail <email> - Set email address
• ${usedPrefix}setphone <number> - Set phone number

🎨 *APPEARANCE & STYLE*
• ${usedPrefix}setavatar <image> - Set profile avatar
• ${usedPrefix}setpfp <image> - Set profile picture
• ${usedPrefix}settheme <theme> - Set profile theme
• ${usedPrefix}setcolor <color> - Set profile color
• ${usedPrefix}setstatus <status> - Set status message
• ${usedPrefix}setmood <mood> - Set current mood
• ${usedPrefix}setbio <bio> - Set biography

💼 *PROFESSIONAL INFO*
• ${usedPrefix}setoccupation <job> - Set occupation
• ${usedPrefix}setjob <job> - Set job title
• ${usedPrefix}setcompany <company> - Set company
• ${usedPrefix}seteducation <education> - Set education
• ${usedPrefix}setskills <skills> - Set skills
• ${usedPrefix}setexperience <years> - Set experience
• ${usedPrefix}setwebsite <url> - Set personal website

🎯 *INTERESTS & HOBBIES*
• ${usedPrefix}setinterests <interests> - Set interests
• ${usedPrefix}sethobbies <hobbies> - Set hobbies
• ${usedPrefix}setmusic <genres> - Set music preferences
• ${usedPrefix}setmovies <genres> - Set movie preferences
• ${usedPrefix}setgames <games> - Set favorite games
• ${usedPrefix}setsports <sports> - Set sports interests
• ${usedPrefix}setbooks <genres> - Set reading preferences

📊 *PROFILE STATISTICS*
• ${usedPrefix}mystats - Your statistics
• ${usedPrefix}profilestats - Profile statistics
• ${usedPrefix}activitystats - Activity statistics
• ${usedPrefix}usagestats - Usage statistics
• ${usedPrefix}commandstats - Command usage stats
• ${usedPrefix}levelstats - Level statistics
• ${usedPrefix}achievements - Your achievements

🏆 *BADGES & ACHIEVEMENTS*
• ${usedPrefix}badges - View your badges
• ${usedPrefix}mybadges - My badge collection
• ${usedPrefix}achievements - Achievement list
• ${usedPrefix}titles - Available titles
• ${usedPrefix}settitle <title> - Set profile title
• ${usedPrefix}ranks - View ranking system
• ${usedPrefix}myrank - My current rank

🔐 *PRIVACY SETTINGS*
• ${usedPrefix}privacy - Privacy settings
• ${usedPrefix}setprivacy <level> - Set privacy level
• ${usedPrefix}hideemail - Hide email address
• ${usedPrefix}hidephone - Hide phone number
• ${usedPrefix}hidelocation - Hide location
• ${usedPrefix}hideage - Hide age
• ${usedPrefix}profilevisibility - Profile visibility

👥 *SOCIAL CONNECTIONS*
• ${usedPrefix}friends - View friends list
• ${usedPrefix}addfriend <user> - Add friend
• ${usedPrefix}removefriend <user> - Remove friend
• ${usedPrefix}friendrequests - Pending requests
• ${usedPrefix}followers - Your followers
• ${usedPrefix}following - Users you follow
• ${usedPrefix}connections - Social connections

📱 *SOCIAL MEDIA LINKS*
• ${usedPrefix}setinstagram <username> - Set Instagram
• ${usedPrefix}settiktok <username> - Set TikTok
• ${usedPrefix}settwitter <username> - Set Twitter
• ${usedPrefix}setfacebook <username> - Set Facebook
• ${usedPrefix}setyoutube <channel> - Set YouTube
• ${usedPrefix}setgithub <username> - Set GitHub
• ${usedPrefix}setlinkedin <profile> - Set LinkedIn

📈 *PROFILE ANALYTICS*
• ${usedPrefix}profileviews - Profile view count
• ${usedPrefix}viewhistory - Who viewed your profile
• ${usedPrefix}profileanalytics - Detailed analytics
• ${usedPrefix}engagementstats - Engagement statistics
• ${usedPrefix}popularityscore - Popularity score
• ${usedPrefix}influencescore - Influence rating
• ${usedPrefix}networkscore - Network score

🎨 *CUSTOMIZATION*
• ${usedPrefix}profilethemes - Available themes
• ${usedPrefix}customprofile - Custom profile options
• ${usedPrefix}profilelayout - Layout options
• ${usedPrefix}profilefonts - Font options
• ${usedPrefix}profilecolors - Color schemes
• ${usedPrefix}profilebackground - Background options
• ${usedPrefix}profileborder - Border styles

📋 *PROFILE VERIFICATION*
• ${usedPrefix}verify - Verify your profile
• ${usedPrefix}verification - Verification status
• ${usedPrefix}verificationbadge - Get verified badge
• ${usedPrefix}idverification - ID verification
• ${usedPrefix}emailverification - Email verification
• ${usedPrefix}phoneverification - Phone verification
• ${usedPrefix}socialverification - Social media verification

💾 *DATA MANAGEMENT*
• ${usedPrefix}exportprofile - Export profile data
• ${usedPrefix}importprofile - Import profile data
• ${usedPrefix}backupprofile - Backup profile
• ${usedPrefix}restoreprofile - Restore profile
• ${usedPrefix}deleteprofile - Delete profile data
• ${usedPrefix}profilehistory - Profile change history
• ${usedPrefix}datadownload - Download your data

🔄 *PROFILE SYNC*
• ${usedPrefix}syncprofile - Sync across platforms
• ${usedPrefix}crossplatform - Cross-platform profile
• ${usedPrefix}profilemigration - Migrate profile
• ${usedPrefix}accountlinking - Link accounts
• ${usedPrefix}profilemerge - Merge profiles
• ${usedPrefix}duplicatecheck - Check for duplicates
• ${usedPrefix}profileunify - Unify profiles

💡 *PROFILE TIPS:*
• Complete your profile for better experience
• Use a clear profile picture for recognition
• Keep your information updated
• Set appropriate privacy settings
• Verify your profile for authenticity
• Connect with friends and community
• Regularly backup your profile data`;

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
    console.error('Error in registration menu command:', error);
    await bot.sendMessage(m.chat, '❌ An error occurred while displaying the registration menu.');
  }
};

handler.help = ['registration', 'menuregistration', 'profile', 'reg'];
handler.tags = ['main'];
handler.command = ['registration', 'menuregistration', 'profile', 'reg', 'userprofile'];

export default handler; 
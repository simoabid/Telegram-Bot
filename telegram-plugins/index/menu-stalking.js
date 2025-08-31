const handler = async (m, { bot, usedPrefix }) => {
  try {
    const userId = m.from_user?.id || m.chat;

    // Initialize user data if not exists
    if (!global.db.data.users[userId]) {
      global.db.data.users[userId] = { lastcofre: 0 };
    }

    let img = 'https://cdn-sunflareteam.vercel.app/images/fe2072569a.jpg';
    let texto = `🕵️ *STALKING & SOCIAL MEDIA INTEL MENU* 👀

📱 *SOCIAL MEDIA STALKING*
• ${usedPrefix}igstalk <username> - Instagram profile stalker
• ${usedPrefix}instagramstalk <username> - Instagram alternative
• ${usedPrefix}ffstalk <username> - Free Fire profile stalker
• ${usedPrefix}ffplayer <username> - Free Fire player info

📊 *PROFILE ANALYSIS*
• ${usedPrefix}profilecheck <username> - Complete profile analysis
• ${usedPrefix}socialstats <username> - Social media statistics
• ${usedPrefix}followerstats <username> - Follower analytics
• ${usedPrefix}engagementstats <username> - Engagement analysis
• ${usedPrefix}contentanalysis <username> - Content analysis
• ${usedPrefix}activitytracker <username> - Activity tracking
• ${usedPrefix}socialhistory <username> - Social media history

🔍 *DEEP SEARCH*
• ${usedPrefix}inspeccionar <data> - Inspect information
• ${usedPrefix}channelinfo <channel> - Channel information
• ${usedPrefix}canalinfo <channel> - Channel info (Spanish)
• ${usedPrefix}groupinfo <group> - Group information
• ${usedPrefix}comunidadinfo <group> - Community info

📧 *CONTACT INVESTIGATION*
• ${usedPrefix}emailvalidator <email> - Email validation
• ${usedPrefix}phonelookup <number> - Phone number details
• ${usedPrefix}whoischeck <domain> - Domain information
• ${usedPrefix}iplookup <ip> - IP address investigation
• ${usedPrefix}locationtrack <data> - Location tracking
• ${usedPrefix}deviceinfo <data> - Device information
• ${usedPrefix}networkscan <target> - Network analysis

🌐 *WEB PRESENCE*
• ${usedPrefix}websitescan <url> - Website analysis
• ${usedPrefix}sociallinks <username> - Find all social links
• ${usedPrefix}onlinepresence <name> - Online presence check
• ${usedPrefix}digitalfootprint <username> - Digital footprint
• ${usedPrefix}accountfinder <username> - Account discovery
• ${usedPrefix}profilelinks <username> - Profile link finder
• ${usedPrefix}mentionsearch <username> - Mention tracker

📈 *ANALYTICS & METRICS*
• ${usedPrefix}growthmeter <username> - Growth analysis
• ${usedPrefix}influencerscore <username> - Influence scoring
• ${usedPrefix}trendanalysis <username> - Trend analysis
• ${usedPrefix}hashtagstalk <hashtag> - Hashtag stalking
• ${usedPrefix}competitorcheck <username> - Competitor analysis
• ${usedPrefix}brandmentions <brand> - Brand monitoring
• ${usedPrefix}sentimentanalysis <username> - Sentiment analysis

💼 *BUSINESS INTELLIGENCE*
• ${usedPrefix}companystalk <company> - Company investigation
• ${usedPrefix}businesscheck <business> - Business verification
• ${usedPrefix}employeefinder <company> - Employee search
• ${usedPrefix}executivesearch <company> - Executive profiles
• ${usedPrefix}competitorspy <company> - Competitor intelligence
• ${usedPrefix}marketresearch <industry> - Market research
• ${usedPrefix}industryscan <sector> - Industry analysis

🎭 *IDENTITY VERIFICATION*
• ${usedPrefix}identitycheck <data> - Identity verification
• ${usedPrefix}fakedetector <profile> - Fake profile detection
• ${usedPrefix}botdetector <account> - Bot account detection
• ${usedPrefix}ageestimator <profile> - Age estimation
• ${usedPrefix}genderanalysis <profile> - Gender analysis
• ${usedPrefix}locationguess <profile> - Location estimation
• ${usedPrefix}languagedetect <content> - Language detection

🔐 *PRIVACY & SECURITY*
• ${usedPrefix}privacycheck <username> - Privacy analysis
• ${usedPrefix}securityscan <profile> - Security assessment
• ${usedPrefix}databreachcheck <email> - Data breach check
• ${usedPrefix}leakedinfo <username> - Leaked information
• ${usedPrefix}vulnerabilityscan <target> - Vulnerability scan
• ${usedPrefix}exposurecheck <data> - Exposure analysis
• ${usedPrefix}riskscore <profile> - Risk assessment

📱 *MOBILE INVESTIGATION*
• ${usedPrefix}appusage <username> - App usage analysis
• ${usedPrefix}devicefingerprint <data> - Device fingerprinting
• ${usedPrefix}carrierinfo <number> - Carrier information
• ${usedPrefix}siminfo <number> - SIM card details
• ${usedPrefix}locationhistory <data> - Location history
• ${usedPrefix}contactsync <data> - Contact synchronization
• ${usedPrefix}appconnections <username> - App connections

🎯 *TARGETED RESEARCH*
• ${usedPrefix}interestanalysis <username> - Interest profiling
• ${usedPrefix}behaviorpattern <username> - Behavior analysis
• ${usedPrefix}connectionmap <username> - Connection mapping
• ${usedPrefix}influencenetwork <username> - Influence network
• ${usedPrefix}collaborators <username> - Collaboration finder
• ${usedPrefix}mutualconnections <user1> <user2> - Mutual connections
• ${usedPrefix}relationshipmap <username> - Relationship mapping

📊 *REPORTING & EXPORT*
• ${usedPrefix}stalkreport <username> - Generate stalk report
• ${usedPrefix}profilesummary <username> - Profile summary
• ${usedPrefix}dataexport <username> - Export collected data
• ${usedPrefix}investigationlog <target> - Investigation history
• ${usedPrefix}evidencecollector <data> - Evidence collection
• ${usedPrefix}timelinebuilder <username> - Timeline creation
• ${usedPrefix}relationshipchart <username> - Relationship chart

⚠️ *ETHICAL GUIDELINES:*
• Use these tools responsibly and legally
• Respect privacy and terms of service
• Only investigate public information
• Do not use for harassment or stalking
• Follow local laws and regulations
• Obtain proper authorization when required

🔒 *PRIVACY NOTICE:*
• All searches are logged for security
• Premium users get advanced features
• Some tools require special permissions
• Data retention follows privacy policies
• Users are responsible for their actions
• Report misuse to administrators

💡 *INVESTIGATION TIPS:*
• Cross-reference multiple sources
• Verify information accuracy
• Use multiple search methods
• Keep detailed investigation notes
• Respect privacy boundaries
• Stay updated on platform changes`;

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
    console.error('Error in stalking menu command:', error);
    await bot.sendMessage(m.chat, '❌ An error occurred while displaying the stalking menu.');
  }
};

handler.help = ['stalking', 'menustalking', 'stalk', 'intel'];
handler.tags = ['main'];
handler.command = ['stalking', 'menustalking', 'stalk', 'intel', 'investigation'];

export default handler; 
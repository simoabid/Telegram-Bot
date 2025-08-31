const handler = async (m, { bot }) => {
    let helpMessage = `🔞 *Pornhub Bot - Complete Command Guide*\n\n`;
    
    helpMessage += `🔍 *Basic Search Commands:*\n`;
    helpMessage += `• \`!pornhub <query>\` - Basic video search\n`;
    helpMessage += `• \`!phinfo <video_id>\` - Get video details\n`;
    helpMessage += `• \`!phactive <video_id>\` - Check video status\n\n`;
    
    helpMessage += `🚀 *Advanced Search Commands:*\n`;
    helpMessage += `• \`!phsearch <query> [options]\` - Advanced search with filters\n`;
    helpMessage += `• \`!phsearchtags <query> <tag1,tag2>\` - Search by specific tags\n`;
    helpMessage += `• \`!phsearchby <category> [query]\` - Search within category\n\n`;
    
    helpMessage += `📹 *Enhanced Video Commands:*\n`;
    helpMessage += `• \`!phvideo <video_id> [thumbsize]\` - Enhanced video information\n`;
    helpMessage += `• \`!phstats <video_id>\` - Detailed analytics & statistics\n`;
    helpMessage += `• \`!phrelated <video_id> [limit]\` - Find similar videos\n\n`;
    
    helpMessage += `📂 *Browse Commands:*\n`;
    helpMessage += `• \`!phcategories\` - List all categories\n`;
    helpMessage += `• \`!phtags <letter>\` - Browse tags by letter\n`;
    helpMessage += `• \`!phstars [detailed]\` - List performers\n`;
    helpMessage += `• \`!phtrending [period] [limit]\` - Show trending videos\n\n`;
    
    helpMessage += `📋 *Basic Usage Examples:*\n`;
    helpMessage += `• \`!pornhub amateur\` - Search for amateur videos\n`;
    helpMessage += `• \`!phinfo ph560b93077ddae\` - Get video info\n`;
    helpMessage += `• \`!phcategories\` - Browse all categories\n`;
    helpMessage += `• \`!phtags a\` - Browse tags starting with 'a'\n\n`;
    
    helpMessage += `🚀 *Advanced Search Examples:*\n`;
    helpMessage += `• \`!phsearch amateur ordering:mostviewed period:weekly\`\n`;
    helpMessage += `• \`!phsearch lesbian category:lesbian ordering:rating\`\n`;
    helpMessage += `• \`!phsearchtags milf big-tits,brunette\`\n`;
    helpMessage += `• \`!phsearchby anal hardcore ordering:newest\`\n\n`;
    
    helpMessage += `📹 *Enhanced Video Examples:*\n`;
    helpMessage += `• \`!phvideo ph560b93077ddae large_hd\` - HD enhanced info\n`;
    helpMessage += `• \`!phstats ph560b93077ddae\` - Complete analytics\n`;
    helpMessage += `• \`!phrelated ph560b93077ddae 15\` - Find 15 similar videos\n\n`;
    
    helpMessage += `⚙️ *Advanced Search Options:*\n`;
    helpMessage += `• \`ordering:\` featured, newest, mostviewed, rating\n`;
    helpMessage += `• \`period:\` weekly, monthly, alltime\n`;
    helpMessage += `• \`category:\` any valid category name\n`;
    helpMessage += `• \`tags:\` comma-separated tag list\n`;
    helpMessage += `• \`page:\` page number (default: 1)\n\n`;
    
    helpMessage += `🖼️ *Thumbnail Options:*\n`;
    helpMessage += `• \`small\` - 320x240 standard\n`;
    helpMessage += `• \`medium\` - Default size\n`;
    helpMessage += `• \`large\` - High resolution\n`;
    helpMessage += `• \`small_hd\`, \`medium_hd\`, \`large_hd\` - HD versions\n\n`;
    
    helpMessage += `📊 *Available Periods:*\n`;
    helpMessage += `• \`daily\` - Trending today\n`;
    helpMessage += `• \`weekly\` - Trending this week (default)\n`;
    helpMessage += `• \`monthly\` - Trending this month\n`;
    helpMessage += `• \`yearly\` - Trending this year\n\n`;
    
    helpMessage += `⚠️ *Important Notes:*\n`;
    helpMessage += `• This bot provides content discovery, not video downloads\n`;
    helpMessage += `• All links point to Pornhub.com\n`;
    helpMessage += `• Use specific keywords for better search results\n`;
    helpMessage += `• Video IDs are found in Pornhub URLs\n\n`;
    
    helpMessage += `💡 *Pro Tips:*\n`;
    helpMessage += `• Use enhanced video commands for detailed analysis\n`;
    helpMessage += `• Combine advanced search filters for precision\n`;
    helpMessage += `• Analyze video stats to find high-quality content\n`;
    helpMessage += `• Use related videos to build personalized playlists\n\n`;
    
    helpMessage += `🆘 *Need More Help?*\n`;
    helpMessage += `• \`!phsearch\` - Advanced search help\n`;
    helpMessage += `• \`!phvideo\` - Enhanced video info help\n`;
    helpMessage += `• \`!phstats\` - Analytics help\n`;
    helpMessage += `• \`!phrelated\` - Related videos help\n\n`;
    
    helpMessage += `🔥 *Featured Workflows:*\n`;
    helpMessage += `• \`!phtrending\` → \`!phstats <id>\` → \`!phrelated <id>\`\n`;
    helpMessage += `• \`!phsearch query\` → \`!phvideo <id> large_hd\`\n`;
    helpMessage += `• \`!phsearchtags query tag1,tag2\` → \`!phstats <id>\`\n`;
    helpMessage += `• \`!phrelated <id> 20\` → Discover new favorites!`;

    await bot.sendMessage(m.chat, helpMessage, { parse_mode: 'Markdown' });
};

handler.help = ['phhelp'];
handler.tags = ['search'];
handler.command = /^(phhelp|pornhelp|pornhubhelp)$/i;

export default handler; 
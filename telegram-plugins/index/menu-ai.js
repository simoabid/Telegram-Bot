const handler = async (m, { bot, usedPrefix }) => {
  try {
    const userId = m.from_user?.id || m.chat;

    // Initialize user data if not exists
    if (!global.db.data.users[userId]) {
      global.db.data.users[userId] = { lastcofre: 0 };
    }

    let img = 'https://cdn-sunflareteam.vercel.app/images/fe2072569a.jpg';
    let texto = `🤖 *ARTIFICIAL INTELLIGENCE MENU* 🧠

🤖 *MAIN AI ASSISTANTS*
• ${usedPrefix}gemini <message> - Google Gemini AI
• ${usedPrefix}assistant <message> - AI assistant
• ${usedPrefix}chatgpt <message> - OpenAI ChatGPT
• ${usedPrefix}chat <message> - Chat alternative
• ${usedPrefix}gpt <message> - GPT shortcut
• ${usedPrefix}ia <message> - General AI assistant
• ${usedPrefix}ai <message> - AI response
• ${usedPrefix}simi <message> - SimSimi chatbot

🎨 *AI IMAGE GENERATION*
• ${usedPrefix}dalle <prompt> - DALL-E image generation
• ${usedPrefix}flux <prompt> - Flux AI images
• ${usedPrefix}barbozai <prompt> - Custom AI images
• ${usedPrefix}waifu <prompt> - Anime waifu generator

💭 *CONVERSATION & CHAT*
• ${usedPrefix}botai <message> - Advanced bot AI
• ${usedPrefix}chatbot <message> - Chat AI system
• ${usedPrefix}askai <message> - Ask AI questions
• ${usedPrefix}blackboxai <message> - BlackBox AI
• ${usedPrefix}bingsearch <query> - Bing AI search

🧠 *SMART TOOLS*
• ${usedPrefix}wpm <text> - AI writing assistant
• ${usedPrefix}newname - AI name generator
• ${usedPrefix}letra <song> - AI lyrics finder
• ${usedPrefix}translate <text> - AI translation
• ${usedPrefix}summary <text> - AI text summarizer

🎭 *CHARACTER AI*
• ${usedPrefix}character <name> - Character roleplay
• ${usedPrefix}personality - AI personality test
• ${usedPrefix}emotion <text> - Emotion analysis
• ${usedPrefix}sentiment <text> - Sentiment analysis

📝 *AI WRITING*
• ${usedPrefix}poem <topic> - AI poetry generator
• ${usedPrefix}story <prompt> - AI story writer
• ${usedPrefix}essay <topic> - AI essay writer
• ${usedPrefix}code <description> - AI code generator

🔍 *AI ANALYSIS*
• ${usedPrefix}analyze <image> - Image analysis
• ${usedPrefix}ocr <image> - Text recognition from image
• ${usedPrefix}describe <image> - Image description
• ${usedPrefix}whatmusic <audio> - Music identification

🎯 *SPECIALIZED AI*
• ${usedPrefix}recipe <ingredients> - AI recipe generator
• ${usedPrefix}fitness <goal> - AI fitness advice
• ${usedPrefix}study <topic> - AI study assistant
• ${usedPrefix}math <problem> - AI math solver

⚙️ *AI CONFIGURATION*
• ${usedPrefix}setmenu - AI menu customization
• ${usedPrefix}aimode on/off - Toggle AI mode
• ${usedPrefix}aipersonality <type> - Set AI personality
• ${usedPrefix}ailang <language> - Set AI language

🌟 *PREMIUM AI FEATURES*
• ${usedPrefix}gpt4 <message> - GPT-4 access (Premium)
• ${usedPrefix}claude <message> - Claude AI (Premium)
• ${usedPrefix}premium-ai <message> - Premium AI features

💡 *TIPS:*
• Be specific with your prompts for better results
• Some AI features may require premium subscription
• Use clear and detailed descriptions for image generation
• AI responses may take a few seconds to generate`;

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
    console.error('Error in AI menu command:', error);
    await bot.sendMessage(m.chat, '❌ An error occurred while displaying the AI menu.');
  }
};

handler.help = ['ai', 'menuai', 'aimenu', 'artificial'];
handler.tags = ['main'];
handler.command = ['ai', 'menuai', 'aimenu', 'artificial', 'ia'];

export default handler; 
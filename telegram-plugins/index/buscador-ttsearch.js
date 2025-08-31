import fetch from 'node-fetch'
 
let handler = async (m, { text, bot, command }) => {
  try {
    // Get chat ID safely
    const chatId = m.chat?.id || m.chat || m.from?.id;

    if (!chatId) {
      console.error('No chat ID found in message:', m);
      return;
    }

    if (!text) {
      return await bot.sendMessage(chatId, '¡Ingresa una palabra clave para buscar videos de TikTok!\nEjemplo: .ttsearch tobrut', {
        reply_to_message_id: m.message_id || m.id
      });
    }

    await bot.sendMessage(chatId, '⏰ Buscando videos en TikTok...', {
      reply_to_message_id: m.message_id || m.id
    });

    let res = await fetch(`https://www.sankavolereii.my.id/search/tiktok?apikey=planaai&q=${encodeURIComponent(text)}`);
    let json = await res.json();

    if (!json.status || !json.result || !json.result.length) {
      return await bot.sendMessage(chatId, '❌ No se encontraron resultados.', {
        reply_to_message_id: m.message_id || m.id
      });
    }

    let random = json.result[Math.floor(Math.random() * json.result.length)];
    let {
      title,
      duration,
      play,
      digg_count,
      comment_count,
      share_count,
      author
    } = random;

    let caption = `🎬 *${title}*\n👤 *${author.nickname}* (@${author.unique_id})\n⏱️ *Duración:* ${duration}s\n❤️ *Me gusta:* ${digg_count.toLocaleString()}\n💬 *Comentarios:* ${comment_count.toLocaleString()}\n🔁 *Compartir:* ${share_count.toLocaleString()}`;

    // Send video using proper Telegram API format
    await bot.sendVideo(chatId, play, {
      caption: caption,
      reply_to_message_id: m.message_id || m.id
    });

  } catch (e) {
    console.error('TikTok search error:', e);

    // Get chat ID safely for error message
    const chatId = m.chat?.id || m.chat || m.from?.id;

    if (chatId) {
      await bot.sendMessage(chatId, `❌ Error\nRegistro de error: ${e.message || e}`, {
        reply_to_message_id: m.message_id || m.id
      });
    }
  }
}
 
handler.help = ['ttsearch <consulta>']
handler.tags = ['buscador']
handler.command = ['ttsearch', 'tiktoksearch']
 
export default handler

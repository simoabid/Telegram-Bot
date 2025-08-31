
import fetch from 'node-fetch';

const handler = async (m, { bot, args }) => {
  if (!args[0]) {
    return bot.reply(m.chat, '🤖 Por favor, proporciona el nombre de la aplicación que deseas buscar.\nEjemplo: .playstore WhatsApp', m);
  }

  const query = args.join(' ');
  const apiUrl = `https://api.vreden.my.id/api/playstore?query=${encodeURIComponent(query)}`;

  try {
    // Send processing message instead of reaction
    await bot.sendMessage(m.chat, '⏳ Buscando en Play Store...', { reply_to_message_id: m.id });

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data || !data.result || data.result.length === 0) {
      return bot.sendMessage(m.chat, '❌ No se encontraron aplicaciones. Intenta con otro nombre.', { reply_to_message_id: m.id });
    }

    let results = `📱 *Resultados de la búsqueda en Play Store para:* ${query}\n\n`;
    data.result.forEach((app, index) => {
      results += `🔗 [Enlace ${index + 1}](${app.link || 'Enlace no disponible'})\n`;
    });

    await bot.sendMessage(m.chat, results.trim(), { reply_to_message_id: m.id });

  } catch (error) {
    console.error('Error al realizar la búsqueda:', error);
    bot.sendMessage(m.chat, `❌ Ocurrió un error al realizar la búsqueda: ${error.message}`, { reply_to_message_id: m.id });
  }
};

handler.command = ['playstore'];
handler.help = ['playstore <nombre>'];
handler.tags = ['search'];

export default handler;

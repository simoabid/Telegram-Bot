import yts from 'yt-search';

let ytSearchHandler = async (m, { bot, text, usedPrefix, command }) => {
  // Verificar que se haya proporcionado un término de búsqueda
  if (!text || !text.trim()) {
    await bot.reply(
      m.chat,
      `Uso: ${usedPrefix + command} <término de búsqueda>\nEjemplo: ${usedPrefix + command} Nio Garcia Infinitamente remix`,
      m
    );
    return;
  }
  text = text.trim();

  // Notificar que se está realizando la búsqueda
  await bot.reply(m.chat, `Buscando en YouTube por: ${text}`, m);

  try {
    // Realizar la búsqueda en YouTube
    const searchResults = await yts(text);
    if (!searchResults?.videos?.length) throw new Error("No se encontraron resultados en YouTube.");

    // Seleccionar los primeros 5 resultados
    const videos = searchResults.videos.slice(0, 5);

    // Enviar cada resultado por separado
    for (const video of videos) {
      let caption = `⌘━─━─≪𓄂*Barboza*𝄢─━─━⌘\n\n`;
      caption += `➷ Título: ${video.title}\n`;
      caption += `➷ Duración: ${video.timestamp || "Desconocida"}\n`;
      caption += `SI QUIERES DESCARGAR AUDIO/VIDEO USA LOS COMANDOS MAS LA URL DEL VIDEO\n`;
      caption += `.ytmp3+ ${video.url} Audio\n`;
      caption += `.ytmp4+ ${video.url} Video\n\n`;
      caption += `> © Prohibido la copia, Código Oficial de Barboza MD™`;

      // Enviar mensaje con imagen y descripción usando Telegram format
      await bot.sendPhoto(m.chat, video.image, {
        caption: caption,
        reply_to_message_id: m.id
      });
    }
  } catch (error) {
    console.error("❌ Error:", error);
    await bot.reply(m.chat, `🚨 *Error:* ${error.message || "Error desconocido"}`, m);
  }
};

ytSearchHandler.help = ['ytsearch/yts <texto>']
ytSearchHandler.tags = ['búsquedas']
ytSearchHandler.command = /^(yts|ytsearch)$/i
export default ytSearchHandler
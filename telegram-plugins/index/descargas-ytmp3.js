import axios from 'axios';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchDownloadUrl = async (videoUrl) => {
  const apis = [
    'https://api.vreden.my.id/api/ytmp3?url=',
    'https://mahiru-shiina.vercel.app/download/ytmp3?url=',
    'https://api.siputzx.my.id/api/d/ytmp3?url='
  ];

  for (let api of apis) {
    try {
      const fullUrl = `${api}${encodeURIComponent(videoUrl)}`;
      const { data } = await axios.get(fullUrl, { timeout: 10000 });

      let result = data?.result || data?.data;

      // Adaptación para la estructura de Vreden
      const audioUrl = result?.download?.url || result?.dl_url || result?.download || result?.dl;
      const title = result?.metadata?.title || result?.title || "audio";

      if (audioUrl) {
        return {
          url: audioUrl.trim(),
          title
        };
      }
    } catch (error) {
      console.error(`Error con API: ${api}`, error.message);
      await wait(5000);
    }
  }

  return null;
};

const sendAudioWithRetry = async (bot, chat, audioUrl, videoTitle, maxRetries = 2) => {
  let attempt = 0;
  let thumbnailBuffer;
  try {
    const response = await axios.get('https://files.catbox.moe/l81ahk.jpg', { responseType: 'arraybuffer' });
    thumbnailBuffer = Buffer.from(response.data, 'binary');
  } catch (error) {
    console.error("Error al obtener thumbnail:", error.message);
  }

  while (attempt < maxRetries) {
    try {
      // Use Telegram's sendAudio method
      await bot.sendAudio(chat, audioUrl, {
        caption: `🎵 *${videoTitle}*\n\n🤖 Descargado por Barboza Bot`,
        title: videoTitle,
        performer: 'YouTube Audio'
      });
      return;
    } catch (error) {
      console.error(`Error al enviar audio, intento ${attempt + 1}:`, error.message);
      if (attempt < maxRetries - 1) await wait(12000);
    }
    attempt++;
  }
};

let handler = async (m, { bot, text }) => {
  if (!text?.trim() || (!text.includes('youtube.com') && !text.includes('youtu.be'))) {
    await bot.reply(m.chat, `❗ *Debes Ingresar Un Enlace De YouTube Válido.*`, m);
    return;
  }

  // Send processing message
  await bot.sendMessage(m.chat, '🔍 *Procesando El Enlace 😉...*', { reply_to_message_id: m.id });

  try {
    const downloadData = await fetchDownloadUrl(text);
    if (!downloadData || !downloadData.url) throw new Error("No Se Pudo Obtener La Descarga.");

    // Send success message
    await bot.sendMessage(m.chat, '🎶 Descarga completada, enviando audio...');
    await sendAudioWithRetry(bot, m.chat, downloadData.url, downloadData.title);
  } catch (error) {
    console.error("❌ Error:", error);
    await bot.sendMessage(m.chat, `⚠️ *Error:* ${error.message || "Desconocido"}`, { reply_to_message_id: m.id });
  }
};

handler.help = ['ytmp3 <url de youtube>'];
handler.tags = ['descargas'];
handler.command = /^ytmp3$/i;

export default handler;
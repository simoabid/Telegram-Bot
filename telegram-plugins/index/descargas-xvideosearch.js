import fetch from 'node-fetch';

// Simplified NSFW search for Telegram
let handler = async (m, { bot, text, usedPrefix, command }) => {
  if (!global.db.data.chats[m.chat].nsfw && m.isGroup) return bot.sendMessage(m.chat, '🚩 *¡Estos comandos están desactivados!*', { reply_to_message_id: m.id });
  if (!text) return bot.sendMessage(m.chat, 'Ingresa el texto de lo que quieres buscar en Xvideo 🤍', { reply_to_message_id: m.id });

  await bot.sendMessage(m.chat, '🕓 Buscando contenido...', { reply_to_message_id: m.id });
  try {
    async function createImage(url) {
      const { imageMessage } = await generateWAMessageContent({ image: { url } }, { upload: bot.waUploadToServer });
      return imageMessage;
    }

    let push = [];
    const apiUrl = `https://dark-core-api.vercel.app/api/search/xvideo?key=user1&text=${encodeURIComponent(text)}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error al realizar la búsqueda: ${response.status} - ${response.statusText}`);
    }

    const json = await response.json();

    if (!json.success || !json.results || json.results.length === 0) {
      throw new Error('No se encontraron resultados');
    }

    for (let video of json.results) {
      let image = await createImage(video.videoImageSrc);

      push.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: `◦ *Título:* ${video.videoTitle}\n◦ *Resolución:* ${video.videoResolution}\n◦ *Duración:* ${video.videoDuration}\n◦ *Enlace:* ${video.videoLink}`,
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: '' // Se puede agregar texto personalizado si lo necesitas
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: '',
          hasMediaAttachment: true,
          imageMessage: image,
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [
            {
              "name": "cta_copy",
              "buttonParamsJson": `{"display_text":"🎬 Ver Video","id":"123456789","copy_code":"/xvideo ${video.videoLink}"}`
            },
          ]
        }),
      });
    }

    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2,
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({ text: `*Resultados de búsqueda para:* ${text}` }),
            footer: proto.Message.InteractiveMessage.Footer.create({ text: 'Powered by Dark Team' }),
            header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: [...push] }),
          })
        }
      }
    }, {
      quoted: m
    });

    await bot.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('❌');
    m.reply(`❌ *Error:* ${error.message || 'Ocurrió un error desconocido'}`);
  }
};

handler.help = ['xvideosearch'];
handler.command = ['xvideosearch', 'xvideosearch'];
handler.register = false

export default handler;
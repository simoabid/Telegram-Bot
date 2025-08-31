import { igdl } from "ruhend-scraper";

let handler = async (m, { args, bot }) => { 
    if (!args[0]) {
        return bot.reply(m.chat, '*\`Ingresa El link Del vídeo a descargar 🤍\`*', m, fake);
    }

    try {
        // Send processing message instead of reaction
        await bot.sendMessage(m.chat, '🕑 Procesando descarga...');

        let res = await igdl(args[0]);
        let data = res.data; 

        for (let media of data) {
            await new Promise(resolve => setTimeout(resolve, 1000));

            try {
                // Determine if it's a video or image
                if (media.url.includes('.mp4') || media.type === 'video') {
                    await bot.sendVideo(m.chat, media.url, {
                        caption: '✅ Video de Instagram descargado',
                        reply_to_message_id: m.id
                    });
                } else {
                    await bot.sendPhoto(m.chat, media.url, {
                        caption: '✅ Imagen de Instagram descargada',
                        reply_to_message_id: m.id
                    });
                }
            } catch (mediaError) {
                console.log('Error sending media:', mediaError);
                // Fallback to document if video/photo fails
                await bot.sendDocument(m.chat, media.url, {
                    caption: '✅ Contenido de Instagram descargado',
                    reply_to_message_id: m.id
                });
            }
        }
    } catch {
        // Send error message instead of reaction
        await bot.sendMessage(m.chat, '❌ Error al descargar el video');
    }
}

handler.corazones = 2
handler.command = ['ig', 'igdl', 'instagram'];
handler.tags = ['dl'];
handler.help = ['ig *<link>*'];

export default handler;
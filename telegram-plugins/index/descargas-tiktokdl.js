
import axios from "axios";
import * as cheerio from 'cheerio';
const handler = async (m, { bot, args}) => {
    if (!args[0]) return bot.reply(m.chat, '❌ *Debes proporcionar un enlace de TikTok!*', m);

    const url = args[0];
    const apiUrl = `https://api.nekorinn.my.id/downloader/tikwm?url=${encodeURIComponent(url)}`;

    try {
        // Send processing message
        await bot.sendMessage(m.chat, '🕒 Procesando video de TikTok...', { reply_to_message_id: m.id });

        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data && data.video && data.video.url) {
            // Use Telegram's sendVideo method
            await bot.sendVideo(m.chat, data.video.url, {
                caption: `✅ *Descarga completada!* 🎥\n🔗 *Fuente:* ${url}`,
                reply_to_message_id: m.id
            });
        } else {
            await bot.sendMessage(m.chat, '⚠️ *No se pudo obtener el video. Intenta con otro enlace.*', { reply_to_message_id: m.id });
        }
} catch (error) {
        console.error(error);
        await bot.reply(m.chat, '❌ *Hubo un problema con la API. Inténtalo más tarde.*', m);
}
};

handler.command = ["tiktokdl"];
export default handler;
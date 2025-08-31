
import axios from 'axios';

let handler = async (m, { bot, args }) => {
    if (!args[0]) return bot.reply(m.chat, `[ ✰ ]  Ingresa un link de CapCut`, m);
    if (!args[0].match(/capcut/gi)) return bot.reply(m.chat, `[ ✰ ]  Verifica que el link sea de *CapCut*`, m);

    await m.react('🕓');
    try {
        const response = await axios.get(`https://api.siputzx.my.id/api/d/capcut?url=${encodeURIComponent(args[0])}`);
        const data = response.data;

        if (data.status) {
            let videoUrl = data.data.originalVideoUrl;

            const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
            await bot.sendDocument(m.chat, videoResponse.data, 'video.mp4', 'Aquí tienes tu video de CapCut', m);
            await m.react('✅');
        } else {
            await bot.reply(m.chat, `[ ✰ ]  Ocurrió un error: ${data.data}`, m);
            await m.react('✖️');
        }
    } catch (error) {
        console.error(error);
        await bot.reply(m.chat, `[ ✰ ]  Ocurrió un error al procesar tu solicitud.`, m);
        await m.react('✖️');
    }
};

handler.help = ['capcutdownload *<url cc>*'];
handler.tags = ['downloader'];
handler.command = ['capcut', 'ccdownload'];
handler.register = false

export default handler;

import fetch from 'node-fetch';

let handler = async(m, { bot, text, usedPrefix, command }) => {

await bot.sendMessage(m.chat, '🕑 Buscando contenido...', { reply_to_message_id: m.id });

let txt = 'Disfruta 🔥🥵';

let img = 'https://delirius-apiofc.vercel.app/nsfw/boobs';

await bot.sendPhoto(m.chat, img, {
    caption: txt,
    reply_to_message_id: m.id
});
}

handler.command = ['packxxx'];
handler.tags = ['nsfw'];
export default handler;
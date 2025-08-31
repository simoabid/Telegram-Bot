/* By WillZek
- https:// github.com/WillZek 
*/

import fetch from 'node-fetch';
// import fg from 'senna-fg'; // Package not available, using alternative API

let handler = async (m, { bot, args, command }) => {

if (!args[0]) return bot.sendMessage(m.chat, `🍭 Ingresa Un Link De YouTube.`, { reply_to_message_id: m.id });

let pene = await(await fetch(`https://delirius-apiofc.vercel.app/download/ytmp4?url=${args[0]}`)).json();

const dev = 'Barboza Team'; // Define dev variable
let texto = `「❖」𝗥𝗲𝘀𝘂𝗹𝘁𝗮𝗱𝗼 𝗗𝗲 ${pene.data.title}\n\n✦ *Autor:* ${pene.data.author}\n✦ *Duración:* ${pene.data.duration}\n✦ *Comentarios:* ${pene.data.comments}\n✦ *Vistas:* ${pene.data.views}\n> ${dev}`

await bot.sendMessage(m.chat, '🕒 Procesando...', { reply_to_message_id: m.id });
await bot.sendPhoto(m.chat, pene.data.image, { caption: texto, reply_to_message_id: m.id });
await bot.sendMessage(m.chat, '✅ Información obtenida', { reply_to_message_id: m.id });

if (command == 'ytmp3doc' || command == 'mp3doc' || command == 'ytadoc') {
let api = await(await fetch(`https://api.neoxr.eu/api/youtube?url=${args[0]}&type=audio&quality=128kbps&apikey=GataDios`)).json();

if (!api?.data.url) return bot.sendMessage(m.chat, 'No Se  Encontraron Resultados', { reply_to_message_id: m.id });

await bot.sendDocument(m.chat, api.data.url, {
  caption: `🎵 ${pene.data.title}.mp3`,
  reply_to_message_id: m.id
});
 }

if (command == 'ytmp4doc' || command == 'mp4doc' || command == 'ytvdoc') {
let video = await (await fetch(`https://api.agungny.my.id/api/youtube-video?url=${args[0]}`)).json();

// Alternative API since senna-fg is not available
let data = await (await fetch(`https://api.neoxr.eu/api/youtube?url=${args[0]}&type=video&quality=720p&apikey=GataDios`)).json();
let url = data?.data?.url;

if (!url) return bot.sendMessage(m.chat, 'No Hubo Resultados', { reply_to_message_id: m.id });

await bot.sendDocument(m.chat, url, {
  caption: `🎥 ${pene.data.title}.mp4\n> ${global.wm || 'Barboza Bot'}`,
  reply_to_message_id: m.id
});
   }
}

handler.help = ['ytmp3doc', 'ytmp4doc'];
handler.tag = ['descargas'];
handler.command = ['ytmp3doc', 'mp3doc', 'ytmp4doc', 'mp4doc', 'ytadoc', 'ytvdoc'];

export default handler;
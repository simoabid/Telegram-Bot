/*
- By WillZek 
- https://github.com/WillZek
- 🌃 Moon Force Team
- https://whatsapp.com/channel/0029Vb4Dnh611ulGUbu7Xg1q
*/

// SPOTIFY - DOWNLOADER 🌟

import fetch from 'node-fetch';

let MF = async (m, { bot, args, command, usedPrefix }) => {

if (!args[0]) return bot.sendMessage(m.chat, `🌙 INGRESE UN Link De Spotify\n> *Ejemplo:* ${usedPrefix + command} https://open.spotify.com/track/0jH15Y9z2EpwTWRQI11xbj`, { reply_to_message_id: m.id });

let api = await (await fetch(`https://archive-ui.tanakadomp.biz.id/download/spotify?url=${args[0]}`)).json();

let force = api.result.data;
let imagen = force.image;

let moon = `\`𝚂𝙿𝙾𝚃𝙸𝙵𝚈 𝑋 𝙳𝙴𝚂𝙲𝙰𝚁𝙶𝙰\`.\n\n`
moon += `☪︎ *Título:* ${force.title}\n`
moon += `☪︎ *Artista:* ${force.artis}\n`
moon += `☪︎ *Duración:* ${force.durasi}\n`
moon += `───── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ─────`;

// Send image with caption
await bot.sendPhoto(m.chat, imagen, {
  caption: moon,
  reply_to_message_id: m.id
});

// Send audio file
await bot.sendAudio(m.chat, force.download, {
  caption: '🎵 Spotify Audio',
  reply_to_message_id: m.id
});
}

MF.command = ['spotifydl', 'spdl'];

export default MF;
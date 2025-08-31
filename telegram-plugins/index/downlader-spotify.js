
import fetch from 'node-fetch';

let handler = async (m, { bot, args, command, usedPrefix}) => {
  const text = args.join(" ");
  if (!text) {
    return m.reply(
      `╭─⬣「 *Barboza AI* 」⬣
│ ≡◦ 🎧 *Uso correcto del comando:*
│ ≡◦ ${usedPrefix + command} shakira soltera
╰─⬣\n> © Barboza AI`
);
}

  try {
    const res = await fetch(`https://api.nekorinn.my.id/downloader/spotifyplay?q=${encodeURIComponent(text)}`);
    const json = await res.json();

    if (!json.status ||!json.result?.downloadUrl) {
      return m.reply(
        `╭─⬣「 *Barboza AI* 」⬣
│ ≡◦ ❌ *No se encontró resultado para:* ${text}
╰─⬣`
);
}

    const { title, artist, duration, cover, url} = json.result.metadata;
    const audio = json.result.downloadUrl;

    // Enviar imagen con detalles
    await bot.sendMessage(m.chat, {
      image: { url: cover},
      caption: `╭─⬣「 *MÚSICA SPOTIFY* 」⬣
│ ≡◦ 🎵 *Título:* ${title}
│ ≡◦ 👤 *Artista:* ${artist}
│ ≡◦ ⏱️ *Duración:* ${duration}
│ ≡◦ 🌐 *Spotify:* ${url}
╰─⬣`
}, { quoted: m});

    // Enviar el archivo de audio
    await bot.sendMessage(m.chat, {
      audio: { url: audio},
      mimetype: 'audio/mp4',
      ptt: false,
      fileName: `${title}.mp3`
}, { quoted: m});

} catch (e) {
    console.error(e);
    return m.reply(
      `╭─⬣「 *Barboza AI* 」⬣
│ ≡◦ ⚠️ *Error al procesar la solicitud.*
│ ≡◦ Intenta nuevamente más tarde.
╰─⬣`
);
}
};

handler.help = ['spotify <nombre>'];
handler.tags = ['descargas'];
handler.command = /^spotify$/i;

export default handler;
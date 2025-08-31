let handler = async (m, { bot, usedPrefix, command, args, users, setting }) => {
    try {
        if (!args || !args[0]) {
            return bot.reply(m.chat, `🪐 Ingresé El Link De Mediafire.\n*Ejemplo:* ${usedPrefix}${command} https://www.mediafire.com/file/c2fyjyrfckwgkum/ZETSv1%25282%2529.zip/file`, m);
        }

        if (!args[0].match(/(https:\/\/www.mediafire.com\/)/gi)) {
            return bot.reply(m.chat, `Enlace inválido.`, m);
        }

        m.react('🕒');
        const json = await (await fetch(`https://api.sylphy.xyz/download/mediafire?url=${args[0]}&apikey=tesis-te-amo`)).json()

        if (!json.data.download) {
            return bot.reply(m.chat, "No se pudo obtener la información del archivo.", m);
        }
        let info = `
✦ \`Nombre :\` ${json.data.filename}
✧ \`Peso :\` ${json.data.size}
✦ \`Link :\` ${args[0]}
✧ \`Mime :\` ${json.data.mimetype}
`;
m.reply(info)
await bot.sendDocument(m.chat, json.data.download, json.data.filename, "", m);
    } catch (e) {
        return bot.reply(m.chat, `Error: ${e.message}`, m);
    }
};

// Renamed to avoid conflicts with downloader-mediafire.js
handler.command = handler.help = ['mfire', 'mfara', 'mfdlara'];
handler.tags = ["descargas"];;
export default handler;

 let handler = async (m, { bot, text, usedPrefix, command, nombre }) => {
    if (!text) return bot.reply(m.chat, '🐉 Que comando quieres sugerir?', m)
    if (text.length < 10) return bot.reply(m.chat, '☁️ La sugerencia debe ser más de 10 caracteres.', m)
    if (text.length > 1000) return bot.reply(m.chat, '💨 Máximo de la sugerencia es de 1000 caracteres.', m)

    // Asegúrate de que 'nombre' esté definido
    if (!nombre) nombre = "Usuario Desconocido"; // Valor por defecto si no se proporciona

    const teks = `🐲 Sugerencia de un nuevo comando del usuario *${nombre}*

🐉 Comando Sugerido:
> ${text}`

    await bot.reply('584146277368', m.quoted ? teks + m.quoted.text : teks, m, { mentions: bot.parseMention(teks) })

    m.reply('☁️ La sugerencia se envió a mi propietario🖥️.')
}

handler.help = ['newcommand']
handler.tags = ['info']
handler.command = ['newcommand', 'sug']

export default handler
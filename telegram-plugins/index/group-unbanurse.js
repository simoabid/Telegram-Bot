let handler = async (m, { bot, text, usedPrefix, command }) => {
   let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    else who = m.chat
    let user = global.db.data.users[who]
    if (!who) return m.reply(`🚩 Etiqueta a un usuario.`)
    let users = global.db.data.users
    users[who].banned = false
    bot.reply(m.chat, `🚩 @${who.split`@`[0]} ha sido desbaneado con exito, ahora podrá volver a usar mis comandos.`, m, { mentions: [who] })
}
handler.help = ['unban *@user*']
handler.command = /^unban$/i

export default handler
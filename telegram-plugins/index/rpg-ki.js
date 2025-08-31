let handler = async (m, {bot, usedPrefix}) => {
   let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
   if (who == bot.user.jid) return error 
   if (!(who in global.db.data.users)) return bot.reply(m.chat, 'El usuario no se encuentra en mi base de Datos.', m)
   let user = global.db.data.users[who]
   await m.reply(`${who == m.sender ? `Tienes *${user.limit} ⚡ KI* en tu Cartera` : `El usuario @${who.split('@')[0]} tiene *${user.limit} ⚡ KI* en su Cartera`}. `, null, { mentions: [who] })
}

handler.help = ['ki']
handler.tags = ['rpg']
handler.command = ['ki']
export default handler
let handler = async (m, { bot, usedPrefix, command }) => {

if (!m.quoted) return bot.reply(m.chat, `✍️ Responde al mensaje que deseas eliminar.`, m, {})
try {
let delet = m.message.extendedTextMessage.contextInfo.participant
let bang = m.message.extendedTextMessage.contextInfo.stanzaId
return bot.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
} catch {
return bot.sendMessage(m.chat, { delete: m.quoted.vM.key })
}}

handler.help = ['delete']
handler.tags = ['grupo']
handler.command = ['del','delete']
handler.group = false
handler.admin = true
handler.botAdmin = true

export default handler
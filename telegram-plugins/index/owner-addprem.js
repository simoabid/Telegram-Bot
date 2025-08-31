let handler = async (m, { bot, text, usedPrefix, command }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    else who = m.chat
    let user = db.data.users[who]
    if (!who) return bot.sendMessage(m.chat, `Etiqueta o menciona a alguien`, { reply_to_message_id: m.id })
    let txt = text.replace('@' + who.toString().split('@')[0], '').trim()
    if (!txt) return bot.sendMessage(m.chat, `Agrega el número de días que el usuario sera *Premium*`, { reply_to_message_id: m.id })
    if (isNaN(txt)) return bot.sendMessage(m.chat, `Solo números!\n\*Ejemplo*\n${usedPrefix + command} @${m.sender.toString().split('@')[0]} 7`, { reply_to_message_id: m.id })
    global.prems.push(`${who.toString().split('@')[0]}`)
    var jumlahHari = 86400000 * txt
    var now = new Date() * 1
    if (now < user.premiumTime) user.premiumTime += jumlahHari
    else user.premiumTime = now + jumlahHari
user.premium = true
    bot.sendMessage(m.chat, `✅ *PREMIUM AGREGADO*\n\n▢ *Usuario:* ${who.toString().split('@')[0]}\n▢ *Días:* ${txt} días`, { reply_to_message_id: m.id })
} 
handler.help = ['addprem *@user*']
handler.tags = ['owner']
handler.command = /^(addprem|addpremium)$/i

handler.group = true
handler.rowner = true

export default handler
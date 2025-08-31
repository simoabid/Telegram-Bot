let toM = a => '@' + a.split('@')[0]
async function handler(m, { bot }) {
try {
  const groupMetadata = await bot.getChat(m.chat)
  let ps = groupMetadata.participants || []
  if (ps.length < 2) return bot.sendMessage(m.chat, 'Se necesitan al menos 2 personas en el grupo', { reply_to_message_id: m.id })

  let a = ps[Math.floor(Math.random() * ps.length)]
  let b
  do b = ps[Math.floor(Math.random() * ps.length)]
  while (b === a)

  await bot.sendMessage(m.chat, `*${toM(a)}, 𝙳𝙴𝙱𝙴𝚁𝙸𝙰𝚂 𝙲𝙰𝚂𝙰𝚁𝚃𝙴 💍 𝙲𝙾𝙽 ${toM(b)}, 𝙷𝙰𝙲𝙴𝙽 𝚄𝙽𝙰 𝙱𝚄𝙴𝙽𝙰 𝙿𝙰𝚁𝙴𝙹𝙰 💓*`, { reply_to_message_id: m.id })
} catch (e) {
  await bot.sendMessage(m.chat, 'Error al obtener información del grupo', { reply_to_message_id: m.id })
}
}
handler.help = ['formarpareja']
handler.tags = ['fun']
handler.command = ['formarpareja','formarparejas']
handler.group = true
export default handler
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

  await bot.sendMessage(m.chat, `*🔰 Vamos a hacer algunas amistades 🔰*\n\n*Oye ${toM(a)} hablale al privado a ${toM(b)} para que jueguen y se haga una amistad 🙆*\n\n*Las mejores amistades empiezan con un juego 😉*`, { reply_to_message_id: m.id })
} catch (e) {
  await bot.sendMessage(m.chat, 'Error al obtener información del grupo', { reply_to_message_id: m.id })
}
}
handler.help = ['amistad']
handler.tags = ['fun']
handler.command = ['amigorandom','amistad']
handler.group = true
handler.register = false
export default handler
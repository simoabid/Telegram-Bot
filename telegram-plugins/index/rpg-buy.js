const xpperlimit = 450
let handler = async (m, { bot, command, args }) => {
  let count = command.replace(/^buycoins/i, '')
  count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].exp / xpperlimit) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
  count = Math.max(1, count)
  if (global.db.data.users[m.sender].exp >= xpperlimit * count) {
    global.db.data.users[m.sender].exp -= xpperlimit * count
    global.db.data.users[m.sender].limit += count
    bot.reply(m.chat, `╭────═[ *R P G  -  B U Y* ]═─────⋆
│╭───────────────···
││✯ *Compra* : + ${count} ❇️ Estrellas 
││✯ *Costo* : -${xpperlimit * count} 💫 XP
│╰────────────────···
╰───────────═┅═──────────`, m, {})
  } else bot.reply(m.chat, `🚩 Lo siento, no tienes suficientes *⭐ XP* para comprar *${count} ❇️ Estrellas.*`, m, {})
}
handler.help = ['buycoins', 'buyall']
handler.tags = ['fun']
handler.command = ['buycoins', 'buyall', 'buy'] 



export default handler
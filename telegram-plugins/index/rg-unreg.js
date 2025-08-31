
let handler = async (m, { bot, text }) => {

let user = global.db.data.users[m.sender]

user.registered = false
return bot.reply(m.chat, `*『✅』 Usted Ya No Está En Mi Base De Datos*`, m, {})

}
handler.help = ['unreg']
handler.tags = ['rg']
handler.command = /^unreg(ister)?$/i
handler.register = false
export default handler
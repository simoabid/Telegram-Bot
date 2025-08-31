let handler = async (m, { bot, command, text }) => {
let love = `*❤️❤️ MEDIDOR DE AMOR ❤️❤️*
*El amor de ${text} por ti es de* *${Math.floor(Math.random() * 100)}%* *de un 100%*
*Deberias pedirle que sea tu  novia/o ?*
`.trim()
m.reply(love, null, { mentions: bot.parseMention(love) })}
handler.help = ['love *@user*']
handler.tags = ['fun']
handler.command = /^(love)$/i
export default handler
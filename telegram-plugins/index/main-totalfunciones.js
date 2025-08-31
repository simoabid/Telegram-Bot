let handler = async (m, { bot }) => {
let totalf = Object.values(global.plugins).filter(
    (v) => v.help && v.tags
  ).length;
bot.reply(m.chat, `*🫰🏻 Total de Funciones* : ${totalf}`,m)
}

handler.help = ['totalfunciones']
handler.tags = ['main']
handler.command = ['totalfunciones']
handler.register = false
export default handler 

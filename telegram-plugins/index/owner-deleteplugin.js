import { tmpdir } from 'os'
import path, { join } from 'path'
import {
  readdirSync,
  statSync,
  unlinkSync,
  existsSync,
  readFileSync,
  watch
} from 'fs'
let handler = async (m, { bot, usedPrefix: _p, command, __dirname, args, text }) => {

let ar = Object.keys(plugins)
    let ar1 = ar.map(v => v.replace('.js', ''))
    if (!text) return bot.reply(m.chat, `👊 *Y EL NOMBRE DEL PLUGIN QUE QUIERES BORRAR?*`)
    if (!ar1.includes(args[0])) return bot.reply(m.chat,  `*😄 NO ENCONTRADO!*\n•••••••••••••••••••••••••••••••••••••••••••••••••••••••\n\n${ar1.map(v => ' ' + v).join`\n`}`)
const file = join(__dirname, '../plugins/' + args[0] + '.js')
unlinkSync(file)
bot.reply(m.chat, `✅️ *"plugins/${args[0]}.js" Eliminado Correctamente*`)

}
handler.help = ['deleteplugin <nombre>']
handler.tags = ['owner']
handler.command = /^(deleteplugin|dp|deleteplu)$/i

handler.rowner = true

export default handler
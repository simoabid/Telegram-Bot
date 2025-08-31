import util from 'util'
import path from 'path'

async function handler(m, { command, bot, text, usedPrefix}) {

let user = a => '@' + a.split('@')[0]
if (!text) throw `*Ejemplo:*\n${usedPrefix + command} texto`

try {
  const groupMetadata = await bot.getChat(m.chat)
  let ps = groupMetadata.participants || []
  if (ps.length === 0) return bot.sendMessage(m.chat, 'No hay participantes en el grupo', { reply_to_message_id: m.id })

  let a = ps[Math.floor(Math.random() * ps.length)]
  let k = Math.floor(Math.random() * 70)
  let vn = `https://hansxd.nasihosting.com/sound/sound${k}.mp3`
  let top = `*\`[ 🥳 ＦＥＬＩＣＩＤＡＤＥＳ 🥳]\`*\n\n${user(a)} 🥳\nAcaba de ganar el sorteo felicitaciones 🎉`
  let txt = ''
  let count = 0
  for (const c of top) {
    await new Promise(resolve => setTimeout(resolve, 15))
    txt += c
    count++

    if (count % 10 === 0) {
      await bot.sendChatAction(m.chat, 'typing');
    }
  }
  await bot.sendMessage(m.chat, txt.trim(), { reply_to_message_id: m.id })
} catch (e) {
  await bot.sendMessage(m.chat, 'Error al realizar el sorteo', { reply_to_message_id: m.id })
}

}
handler.help = ['sorteo']
handler.command = ['sorteo']
handler.tags = ['fun']
handler.group = true

export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]}
import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'

let handler = async (m, {
    bot
}) => {
    let res = await fetch('https://nekos.life/api/v2/img/meow')
    let json = await res.json()
    let stiker = await sticker(null, json.url, global.packname, global.author)
    if (stiker) return bot.sendDocument(m.chat, stiker, {
        filename: 'sticker.webp',
        reply_to_message_id: m.id
    })
    throw stiker.toString()
}
handler.help = ['scat']
handler.tags = ['sticker']
handler.command = ["scat", "stickercat", "cats"]
handler.register = false
export default handler
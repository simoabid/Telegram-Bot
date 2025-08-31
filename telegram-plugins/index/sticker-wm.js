import { addExif } from '../lib/sticker.js'
let handler = async (m, { bot, text }) => {
  if (!m.quoted) return bot.reply(m.chat, `🚩 Responde a a un *Sticker.*`, m, {})
  let stiker = false
  try {
    let [packname, ...author] = text.split('|')
    author = (author || []).join('|')
    let mime = m.quoted.mimetype || ''
    if (!/webp/.test(mime)) return bot.reply(m.chat, `🚩 Responde a a un *Sticker.*`, m, {})
    let img = await m.quoted.download()
    if (!img) return bot.reply(m.chat, `🚩 Responde a a un *Sticker.*`, m, {})
    stiker = await addExif(img, packname || '', author || '')
  } catch (e) {
    console.error(e)
    if (Buffer.isBuffer(e)) stiker = e
  } finally {
    if (stiker) bot.sendDocument(m.chat, stiker, {
      filename: 'wm.webp',
      reply_to_message_id: m.id
    })
    else return bot.reply(m.chat, `🚩 Responde a a un *Sticker.*`, m, {})
  }
}
handler.help = ['wm *<nombre>|<autor>*']
handler.tags = ['sticker']
handler.command = ['take', 'robar', 'wm'] 

export default handler
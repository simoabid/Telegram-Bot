import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'
import fs from "fs"
const fetchJson = (url, options) => new Promise(async (resolve, reject) => {
fetch(url, options)
.then(response => response.json())
.then(json => {
resolve(json)
})
.catch((err) => {
reject(err)
})})
let handler = async (m, { bot, text, args, usedPrefix, command }) => {
if (!args[0]) return bot.sendMessage(m.chat, `✨ Ejemplo: *${usedPrefix + command}* 😎+🤑`, { reply_to_message_id: m.id })
let [emoji, emoji2] = text.split`+`
let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji)}_${encodeURIComponent(emoji2)}`)
for (let res of anu.results) {
let stiker = await sticker(false, res.url, global.packname, global.author)
bot.sendDocument(m.chat, stiker, {
    filename: 'emojimix.webp',
    reply_to_message_id: m.id
})
}}
handler.help = ['emojimix *<emoji+emoji>*']
handler.tags = ['sticker']
handler.command = ['emojimix'] 
//handler.limit = 1
handler.register = false

export default handler
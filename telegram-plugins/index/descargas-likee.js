//Para Usuarios De Likee 🙃
import fetch from 'node-fetch'

let handler = async (m, { bot, text }) => {
if (!text) return bot.reply(m.chat, '🚩 Ingrese la url de un video de *Likee*.', m, {})
await m.react('🕓')
try {
let app = await fetch(`https://apis-starlights-team.koyeb.app/starlight/like-downloader?url=${text}`, { headers: { 'Content-Type': 'application/json' }})
let json = await app.json()
let video = json.links['no watermark']
await bot.sendDocument(m.chat, video, 'samu.mp4', `*✔️🍟Downloader likee.*`, m)
await m.react('✅')
} catch {
await m.react('✖️')
}}
handler.help = ['likee *<url>*']
handler.tags = ['dl']
handler.command = /^(likee)$/i
handler.register = false
export default handler
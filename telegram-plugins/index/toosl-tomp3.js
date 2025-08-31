import { toAudio } from '../lib/converter.js'

let handler = async (m, { bot, usedPrefix, command }) => {
let q = m.quoted ? m.quoted : m
let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
if (!/video|audio/.test(mime)) throw `✅ Responde al *Video* o *Nota de Voz* que desea convertir a mp3.`
try {
let media = await q.download?.()
if (!media) return null
let audio = await toAudio(media, 'mp4')
if (!audio.data) return null
await bot.sendAudio(m.chat, audio.data, {
  caption: '🎵 Audio convertido a MP3',
  reply_to_message_id: m.id
})
} catch {
}}
handler.help = ['tomp3']
handler.tags = ['tools']
handler.command = ['tomp3', 'toaudio'] 
handler.register = false

export default handler
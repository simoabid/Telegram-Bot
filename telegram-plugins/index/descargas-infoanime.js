import fetch from 'node-fetch'

var handler = async (m, { bot, usedPrefix, command, text }) => {

if (!text) return bot.sendMessage(m.chat, `『✎』 *Ingrese el nombre de algun anime*\n\nEjemplo, ${usedPrefix + command} Roshidere`, { reply_to_message_id: m.id })
let res = await fetch('https://api.jikan.moe/v4/manga?q=' + text)
if (!res.ok) return bot.sendMessage(m.chat, `⚠️ *Ocurrió un fallo*`, { reply_to_message_id: m.id })

let json = await res.json()
let { chapters, title_japanese, url, type, score, members, background, status, volumes, synopsis, favorites } = json.data[0]
let author = json.data[0].authors[0].name
let animeingfo = `✨ Título: ${title_japanese}
🎞️ Capítulo: ${chapters}
💫 Transmisión: ${type}
🗂 Estado: ${status}
🗃 Volumes: ${volumes}
🌟 Favorito: ${favorites}
🧮 Puntaje: ${score}
👥 Miembros: ${members}
🔗 Url: ${url}
👨‍🔬 Autor: ${author}
📝 Fondo: ${background}
💬 Sinopsis: ${synopsis}
 ` 
await bot.sendPhoto(m.chat, json.data[0].images.jpg.image_url, {
  caption: '      ✨ *I N F O - A N I M E* ✨\n\n' + animeingfo,
  reply_to_message_id: m.id
})

} 
handler.help = ['infoanime'] 
handler.tags = ['anime'] 
handler.group = true;
handler.register = false
handler.command = ['infoanime','animeinfo'] 

export default handler
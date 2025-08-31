import fetch from 'node-fetch'
import axios from 'axios'

let handler = async (m, { bot, args}) => {
  if (!args[0]) throw `
╭─❍ *⚔️ RETO 8 VS 8 ⚔️*
│
│⏳ *Horario:*
│🇲🇽 MÉXICO:
│🇨🇴 COLOMBIA:
│
│🎮 *Modalidad:*
│👥 *Jugadores:*
│
│🏆 *Escuadra 1:*
│   👑 •
│   🥷🏻 •
│   🥷🏻 •
│   🥷🏻 •
│
│🏆 *Escuadra 2:*
│   👑 •
│   🥷🏻 •
│   🥷🏻 •
│   🥷🏻 •
│
│🔄 *Suplentes:*
│   🥷🏻 •
│   🥷🏻 •
╰────────────────❍
`

  const textos = [
    "🔥 𝘋𝘶𝘦𝘭𝘰 𝘎𝘳𝘶𝘱𝘢𝘭 𝘈𝘤𝘵𝘪𝘷𝘢𝘥𝘰",
    "⚡ 𝘙𝘦𝘵𝘰 𝘊𝘭𝘢𝘯 𝘝𝘴 𝘊𝘭𝘢𝘯",
    "🛡️ 𝘊𝘰𝘮𝘣𝘢𝘵𝘦 𝘋𝘦𝘧𝘪𝘯𝘪𝘵𝘪𝘷𝘰 8𝘹8"
  ]
  const imagenes = [
    "https://iili.io/FKVDVAN.jpg",
    "https://iili.io/FKVbUrJ.jpg",
    "https://iili.io/HZOHhlx.jpg"
  ]

  const titulo = textos[Math.floor(Math.random() * textos.length)]
  const imagen = imagenes[Math.floor(Math.random() * imagenes.length)]
  const thumbBuffer = Buffer.from(
    (await axios.get(imagen, { responseType: 'arraybuffer'})).data
)

  const izumi = {
    key: {
      fromMe: false,
      participant: "0",
      remoteJid: "status@broadcast"
},
    message: {
      orderMessage: {
        itemCount: 8,
        message: titulo,
        footerText: "Sasuke Bot MD",
        thumbnail: thumbBuffer,
        surface: 2,
        sellerJid: "0"
}
}
}

  await bot.sendMessage(m.chat, {
    image: { url: 'https://cdn.russellxz.click/16b3faeb.jpeg'},
    caption:
`╭─❍ *⚔️ 8 VS 8 | RETO SASUKE ⚔️*
│
│⏳ *Horario:*
│🇲🇽 MÉXICO: ${args[0]}
│🇨🇴 COLOMBIA: ${args[0]}
│
│🎮 *Modalidad:*
│👥 *Jugadores:*
│
│🏆 *Escuadra 1:*
│   👑 •
│   🥷🏻 •
│   🥷🏻 •
│   🥷🏻 •
│
│🏆 *Escuadra 2:*
│   👑 •
│   🥷🏻 •
│   🥷🏻 •
│   🥷🏻 •
│
│🔄 *Suplentes:*
│   🥷🏻 •
│   🥷🏻 •
╰────────────────❍`,
    mentions: []
}, { quoted: izumi})
}

handler.help = ['8vs8']
handler.tags = ['freefire']
handler.command = /^(vs8|8vs8|masc8)$/i
handler.group = true
handler.admin = false

export default handler
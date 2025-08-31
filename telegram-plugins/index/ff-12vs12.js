import axios from 'axios'

let handler = async (m, { bot, args}) => {
  if (!args[0]) throw `
╭─❍ *🚀 RETO 12 VS 12 - SASUKE BOT MD*
│
│⏳ *Horario:*
│🇲🇽 MÉXICO:
│🇨🇴 COLOMBIA:
│
│🎮 *Modalidad:*
│👥 *Jugadores:*
│
│🥷 *Escuadra 1:*
│   👑 •
│   🥷🏻 •
│   🥷🏻 •
│   🥷🏻 •
│
│🥷 *Escuadra 2:*
│   👑 •
│   🥷🏻 •
│   🥷🏻 •
│   🥷🏻 •
│
│🥷 *Escuadra 3:*
│   👑 •
│   🥷🏻 •
│   🥷🏻 •
│   🥷🏻 •
│
│🔁 *Suplentes:*
│   🥷🏻 •
│   🥷🏻 •
╰────────────────────❍
`

  const textos = [
    "⚔️ 𝘙𝘦𝘵𝘰 12𝘹12 | 𝘊𝘭𝘢𝘯 𝘊𝘰𝘮𝘣𝘢𝘵𝘦",
    "🔥 𝘋𝘶𝘦𝘭𝘰 𝘔𝘶𝘭𝘵𝘪𝘦𝘴𝘤𝘶𝘢𝘥𝘳𝘢",
    "🎖️ 𝘈𝘭𝘪𝘢𝘯𝘻𝘢 𝘈𝘤𝘵𝘪𝘷𝘢 | 𝘙𝘦𝘵𝘰 12𝘝𝘚12"
  ]
  const imagenes = [
    "https://iili.io/FKVDVAN.jpg",
    "https://iili.io/FKVbUrJ.jpg",
    "https://iili.io/HZOHhlx.jpg"
  ]

  const titulo = textos[Math.floor(Math.random() * textos.length)]
  const imagen = imagenes[Math.floor(Math.random() * imagenes.length)]

  let thumbBuffer
  try {
    const res = await axios.get(imagen, { responseType: 'arraybuffer'})
    thumbBuffer = Buffer.from(res.data)
} catch (e) {
    console.log("Error al cargar imagen:", e)
    thumbBuffer = Buffer.alloc(0)
}

  const izumi = {
    key: {
      fromMe: false,
      participant: "0",
      remoteJid: "status@broadcast"
},
    message: {
      orderMessage: {
        itemCount: 12,
        message: titulo,
        footerText: "Sasuke Bot MD",
        thumbnail: thumbBuffer,
        surface: 2,
        sellerJid: "0"
}
}
}

  // Imagen épica adicional estilo portada
  await bot.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/1j784p.jpg'},
    caption: '*🛡️ Sasuke Bot MD ha convocado el RETO 12 VS 12*\nPrepárate para el combate 🎮'
}, { quoted: izumi})

  // Imagen principal con listado completo
  await bot.sendMessage(m.chat, {
    image: { url: 'https://cdn.russellxz.click/16b3faeb.jpeg'},
    caption: `╭─❍ *⚔️ 12 VS 12 | SASUKE BOT MD*\n│\n│⏳ *Horario:*\n│🇲🇽 MÉXICO: ${args[0]}\n│🇨🇴 COLOMBIA: ${args[0]}\n│\n│🎮 *Modalidad:*\n│👥 *Jugadores:*\n│\n│🥷 *Escuadra 1:*\n│   👑 • \n│   🥷🏻 • \n│   🥷🏻 • \n│   🥷🏻 • \n│\n│🥷 *Escuadra 2:*\n│   👑 • \n│   🥷🏻 • \n│   🥷🏻 • \n│   🥷🏻 • \n│\n│🥷 *Escuadra 3:*\n│   👑 • \n│   🥷🏻 • \n│   🥷🏻 • \n│   🥷🏻 • \n│\n│🔁 *Suplentes:*\n│   🥷🏻 • \n│   🥷🏻 • \n╰────────────────────❍`,
    mentions: []
}, { quoted: izumi})
}

handler.help = ['12vs12']
handler.tags = ['freefire']
handler.command = /^(vs12|12vs12)$/i
handler.group = true
handler.admin = true

export default handler
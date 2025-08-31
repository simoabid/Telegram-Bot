import axios from 'axios'

let handler = async (m, { bot, args}) => {
  if (!args[0]) throw `
╭─❍ *🔥 RETO 16 VS 16 | SASUKE BOT MD*
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
│🏆 *Escuadra 3:*
│   👑 •
│   🥷🏻 •
│   🥷🏻 •
│   🥷🏻 •
│
│🏆 *Escuadra 4:*
│   👑 •
│   🥷🏻 •
│   🥷🏻 •
│   🥷🏻 •
│
│🔄 *Suplentes:*
│   🥷🏻 •
│   🥷🏻 •
╰────────────────────❍
`

  // Mensaje citado tipo Izumi con imagen y título dinámico
  const encabezados = [
    "⚡ INVOCACIÓN DE BATALLA | 16x16",
    "🎖️ RETO MULTIESCUADRA ACTIVADO",
    "🔥 COMBATE TOTAL - CLAN VS CLAN"
  ]
  const imagenes = [
    "https://iili.io/FKVDVAN.jpg",
    "https://iili.io/FKVbUrJ.jpg",
    "https://iili.io/HZOHhlx.jpg"
  ]

  const titulo = encabezados[Math.floor(Math.random() * encabezados.length)]
  const img = imagenes[Math.floor(Math.random() * imagenes.length)]

  const thumbnail = Buffer.from(
    (await axios.get(img, { responseType: 'arraybuffer'})).data
)

  const izumi = {
    key: {
      fromMe: false,
      participant: "0",
      remoteJid: "status@broadcast"
},
    message: {
      orderMessage: {
        itemCount: 16,
        message: titulo,
        footerText: "Sasuke Bot MD",
        thumbnail: thumbnail,
        surface: 2,
        sellerJid: "0"
}
}
}

  await bot.sendMessage(m.chat, {
    image: { url: 'https://cdn.russellxz.click/16b3faeb.jpeg'},
    caption: `╭─❍ *🔥 16 VS 16 | SASUKE BOT MD*\n│\n│⏳ *Horario:*\n│🇲🇽 MÉXICO: ${args[0]}\n│🇨🇴 COLOMBIA: ${args[0]}\n│\n│🎮 *Modalidad:*\n│👥 *Jugadores:*\n│\n│🏆 *Escuadra 1:*\n│   👑 • \n│   🥷🏻 • \n│   🥷🏻 • \n│   🥷🏻 • \n│\n│🏆 *Escuadra 2:*\n│   👑 • \n│   🥷🏻 • \n│   🥷🏻 • \n│   🥷🏻 • \n│\n│🏆 *Escuadra 3:*\n│   👑 • \n│   🥷🏻 • \n│   🥷🏻 • \n│   🥷🏻 • \n│\n│🏆 *Escuadra 4:*\n│   👑 • \n│   🥷🏻 • \n│   🥷🏻 • \n│   🥷🏻 • \n│\n│🔄 *Suplentes:*\n│   🥷🏻 • \n│   🥷🏻 • \n╰────────────────────❍`,
    mentions: []
}, { quoted: izumi})
}

handler.help = ['16vs16']
handler.tags = ['freefire']
handler.command = /^(vs16|16vs16)$/i
handler.group = true
handler.admin = false

export default handler
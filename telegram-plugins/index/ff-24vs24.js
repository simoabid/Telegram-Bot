import axios from 'axios'

let handler = async (m, { bot, args}) => {
  if (!args[0]) throw `
╭─❍ *🔥 RETO 24 VS 24 | SASUKE BOT MD*
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
│🥷 *Escuadra 4:*
│   👑 •
│   🥷🏻 •
│   🥷🏻 •
│   🥷🏻 •
│
│🥷 *Escuadra 5:*
│   👑 •
│   🥷🏻 •
│   🥷🏻 •
│   🥷🏻 •
│
│🥷 *Escuadra 6:*
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

  const encabezados = [
    "🎖️ RETO CLAN VS CLAN | 24x24",
    "🔥 BATALLA TOTAL ACTIVADA",
    "⚡ ALIANZA MULTIESCUADRA EN PROGRESO"
  ]
  const imagenes = [
    "https://iili.io/FKVDVAN.jpg",
    "https://iili.io/FKVbUrJ.jpg",
    "https://iili.io/HZOHhlx.jpg"
  ]

  const titulo = encabezados[Math.floor(Math.random() * encabezados.length)]
  const imagen = imagenes[Math.floor(Math.random() * imagenes.length)]

  let thumbBuffer = Buffer.alloc(0)
  try {
    const res = await axios.get(imagen, { responseType: 'arraybuffer'})
    thumbBuffer = Buffer.from(res.data)
} catch (e) {
    console.log("Error al cargar imagen:", e)
}

  const izumi = {
    key: {
      fromMe: false,
      participant: "0",
      remoteJid: "status@broadcast"
},
    message: {
      orderMessage: {
        itemCount: 24,
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
    caption: `╭─❍ *🔥 24 VS 24 | SASUKE BOT MD*\n│\n│⏳ *Horario:*\n│🇲🇽 MÉXICO: ${args[0]}\n│🇨🇴 COLOMBIA: ${args[0]}\n│\n│🎮 *Modalidad:*\n│👥 *Jugadores:*\n│\n│🥷 *Escuadra 1:*\n│   👑 • \n│   🥷🏻 • \n│   🥷🏻 • \n│   🥷🏻 • \n│\n│🥷 *Escuadra 2:*\n│   👑 • \n│   🥷🏻 • \n│   🥷🏻 • \n│   🥷🏻 • \n│\n│🥷 *Escuadra 3:*\n│   👑 • \n│   🥷🏻 • \n│   🥷🏻 • \n│   🥷🏻 • \n│\n│🥷 *Escuadra 4:*\n│   👑 • \n│   🥷🏻 • \n│   🥷🏻 • \n│   🥷🏻 • \n│\n│🥷 *Escuadra 5:*\n│   👑 • \n│   🥷🏻 • \n│   🥷🏻 • \n│   🥷🏻 • \n│\n│🥷 *Escuadra 6:*\n│   👑 • \n│   🥷🏻 • \n│   🥷🏻 • \n│   🥷🏻 • \n│\n│🔄 *Suplentes:*\n│   🥷🏻 • \n│   🥷🏻 • \n╰────────────────────❍`,
    mentions: []
}, { quoted: izumi})
}

handler.help = ['24vs24']
handler.tags = ['freefire']
handler.command = /^(vs24|24vs24)$/i
handler.group = true

export default handler
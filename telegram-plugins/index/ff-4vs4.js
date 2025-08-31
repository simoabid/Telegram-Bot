import fg from 'api-dylux'
import fetch from 'node-fetch'
import axios from 'axios'

let handler = async (m, { bot, args, command, usedPrefix}) => {
  if (!args[0]) throw `
╭─❍ *🔱 RETO 4 VS 4 🔱*
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
│🧱 *Suplentes:*
│   🥷🏻 •
│   🥷🏻 •
╰───────────────❍
`

  // Send initial message
  await bot.sendMessage(m.chat, '🎯 *Reto grupal activo | Sasuke Bot MD*', {
    parse_mode: 'Markdown'
  })

  // Send main visual message with image
  try {
    await bot.sendPhoto(m.chat, 'https://cdn.russellxz.click/16b3faeb.jpeg', {
      caption: `╭─❍ *4 VS 4 | RETO SASUKE* 🔥
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
│🧱 *Suplentes:*
│   🥷🏻 •
│   🥷🏻 •
╰───────────────❍`,
      parse_mode: 'Markdown'
    })
  } catch (error) {
    // Fallback to text message if image fails
    await bot.sendMessage(m.chat, `╭─❍ *4 VS 4 | RETO SASUKE* 🔥
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
│🧱 *Suplentes:*
│   🥷🏻 •
│   🥷🏻 •
╰───────────────❍`, {
      parse_mode: 'Markdown'
    })
  }
}

handler.help = ['4vs4']
handler.tags = ['freefire']
handler.command = /^(vs4|4vs4|masc4)$/i
handler.group = true

export default handler
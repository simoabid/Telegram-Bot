
const salas = {}
let contadorSalas = 1
const REACCION_JOIN = '👍'
const REACCION_EXIT = '❌'

const reglasPvP = `📋 *REGLAS GENERALES PVP*
1. Sin doble vector ❌
2. Sin lanzapapas 🧨
3. Sin curas ⚕️
4. No granadas ni minas 💣
5. No emulador ni hacks 💻
6. Solo M10/MP40 y Desert 🧨
7. Respeto obligatorio 🤝
`

const handler = async (m, { bot, command, args, usedPrefix }) => {
  const chatId = m.chat

  if (command === 'cancelarsala') {
    const sala = salas[chatId]
    if (!sala) return m.reply('❌ No hay ninguna sala activa en este chat.')
    if (m.sender !== sala.creador) return m.reply('❌ Solo el creador de la sala puede cancelarla.')
    clearTimeout(sala.timeout)
    delete salas[chatId]
    return await bot.sendMessage(chatId, {
      text: `❌ *${sala.id} fue cancelada por el creador*\n\nGracias por participar.`,
      mentions: [m.sender],
    })
  }

  const input = args[0]
  const match = input?.toLowerCase().match(/^(\d+)vs(\d+)$/)

  if (!match) {
    return m.reply(`❌ Formato incorrecto.\nUsa: *${usedPrefix + command} 4vs4* o *${usedPrefix + command} 10vs10*`)
  }

  const num1 = parseInt(match[1])
  const num2 = parseInt(match[2])
  const total = num1 + num2

  if (isNaN(num1) || isNaN(num2) || num1 <= 0 || num2 <= 0 || total < 2) {
    return m.reply(`❌ Formato inválido. Mínimo deben ser 2 jugadores.\nUsa: *${usedPrefix + command} 4vs4*`)
  }

  if (salas[chatId]) return m.reply('⚠️ Ya hay una sala activa en este chat.')

  const nombreSala = `Sala #${contadorSalas++} - ${input.toUpperCase()}`
  const creador = m.sender

  const mensaje = await bot.sendMessage(chatId, {
    text: `🎮 *${nombreSala}*\n👤 *Creada por:* @${creador.split('@')[0]}\n\n${reglasPvP}\n👥 *Jugadores (0/${total})*\n_Reacciona con ${REACCION_JOIN} para unirte_\n_Reacciona con ${REACCION_EXIT} para salir_`,
    mentions: [creador],
  })

  salas[chatId] = {
    id: nombreSala,
    tipo: input,
    jugadores: [],
    creador,
    mensajeID: mensaje.key.id,
    total,
    timeout: setTimeout(() => {
      if (salas[chatId]) {
        bot.sendMessage(chatId, { text: `⌛ *${nombreSala} cancelada por inactividad.*` })
        delete salas[chatId]
      }
    }, 5 * 60 * 1000)
  }
}

handler.reaction = async (reaction, { bot }) => {
  const chatId = reaction.chat
  const sala = salas[chatId]

  if (
    !reaction || !reaction.key || !reaction.reaction ||
    !sala || reaction.key.id !== sala.mensajeID
  ) return

  const jugador = reaction.sender

  if (reaction.reaction === REACCION_JOIN) {
    if (sala.jugadores.includes(jugador)) return
    if (sala.jugadores.length >= sala.total) return

    sala.jugadores.push(jugador)
  }

  else if (reaction.reaction === REACCION_EXIT) {
    if (!sala.jugadores.includes(jugador)) return
    sala.jugadores = sala.jugadores.filter(j => j !== jugador)
  } else return // Si no es ninguna de las dos reacciones esperadas
// barboza is gei
 
  const nombres = await Promise.all(
    sala.jugadores.map(u => bot.getName(u).catch(() => '@' + u.split('@')[0]))
  )

  const lista = nombres.map((n, i) => `*${i + 1}.* ${n}`).join('\n')
  const texto = `🎮 *${sala.id}*\n👤 *Creada por:* @${sala.creador.split('@')[0]}\n\n${reglasPvP}\n👥 *Jugadores (${sala.jugadores.length}/${sala.total})*\n${lista || '_Nadie aún_'}\n\n_Reacciona con ${REACCION_JOIN} para unirte_\n_Reacciona con ${REACCION_EXIT} para salir_`

  await bot.sendMessage(chatId, {
    text: texto,
    mentions: sala.jugadores.length > 0 ? sala.jugadores : [sala.creador],
  })

  if (sala.jugadores.length === sala.total) {
    clearTimeout(sala.timeout)
    const mitad = Math.floor(sala.total / 2)
    const mezclado = [...sala.jugadores].sort(() => Math.random() - 0.5)
    const rojo = mezclado.slice(0, mitad)
    const azul = mezclado.slice(mitad)

    const nombresRojo = await Promise.all(rojo.map(u => bot.getName(u).catch(() => '@' + u.split('@')[0])))
    const nombresAzul = await Promise.all(azul.map(u => bot.getName(u).catch(() => '@' + u.split('@')[0])))

    const listaRojo = nombresRojo.map(n => `🔴 ${n}`).join('\n')
    const listaAzul = nombresAzul.map(n => `🔵 ${n}`).join('\n')

    await bot.sendMessage(chatId, {
      text: `✅ *${sala.id} COMPLETA*\n\n╭─🔴 *Equipo Rojo* ──╮\n${listaRojo}\n╰────────────────╯\n\n╭─🔵 *Equipo Azul* ──╮\n${listaAzul}\n╰────────────────╯`,
      mentions: [...rojo, ...azul],
    })

    delete salas[chatId]
  }
}

handler.help = ['pvp <4vs4|10vs10>', 'cancelarsala']
handler.tags = ['ff']
handler.command = /^pvp$|^cancelarsala$/i

export default handler
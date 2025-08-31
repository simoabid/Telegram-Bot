import axios from 'axios'

async function buscarJugadorFF(nickname) {
  const { data} = await axios.get(`https://discordbot.freefirecommunity.com/search_player_api?nickname=${encodeURIComponent(nickname)}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, como Gecko) Chrome/138.0.0.0 Mobile Safari/537.36',
      'Accept': '*/*',
      'Referer': 'https://www.freefirecommunity.com/ff-player-search/'
}
})
  return data
}

let handler = async (m, { bot, args}) => {
  try {
    if (!args[0]) return m.reply('📌 Por favor, proporciona el Nickname de Free Fire.')

    let datos = await buscarJugadorFF(args[0])

    if (datos.error) return m.reply('❌ Error: ' + datos.error)

    let texto = `🔍 Resultados para: ${args[0]}\n\n`

    datos.forEach((jugador, index) => {
      const ultimaConexion = new Date(jugador.lastLogin * 1000).toLocaleDateString('en-US') // Región EEUU
      texto += `${index + 1}. 🧑 Nickname: ${jugador.nickname}\n`
      texto += `🆔 ID de cuenta: ${jugador.accountId}\n`
      texto += `🎮 Nivel: ${jugador.level}\n`
      texto += `🌎 Región: ${jugador.region}\n`
      texto += `⏰ Última conexión: ${ultimaConexion}\n\n`
})

    m.reply(texto.trim())
} catch (e) {
    m.reply(`❌ Error: ${e.message}`)
}
}

handler.help = ['ffsearch']
handler.command = ['ffstalk', 'ffplayer']
handler.tags = ['internet']

export default handler
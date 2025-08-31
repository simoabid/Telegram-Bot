import axios from 'axios'
import { v4 as uuidv4} from 'uuid'
import readline from 'readline'

let handler = async (m, { bot, text, usedPrefix, command}) => {
  try {
    if (!text.includes('|')) return m.reply(`Ejemplo de uso:\n.sonu título | letra | estado de ánimo | género | voz`)
    let [titulo, letra, estado, genero, voz] = text.split('|').map(v => v.trim())

    if (!titulo) return m.reply('⚠️ El título de la canción no puede estar vacío.')
    if (!letra) return m.reply('⚠️ Falta la letra de la canción.')
    if (letra.length> 1500) return m.reply('⚠️ La letra no puede superar los 1500 caracteres.')

    m.reply('⏳ Generando canción, espera un momento...')

    const deviceId = uuidv4()
    const userHeaders = {
      'user-agent': 'NB Android/1.0.0',
      'content-type': 'application/json',
      'accept': 'application/json',
      'x-platform': 'android',
      'x-app-version': '1.0.0',
      'x-country': 'VE',
      'accept-language': 'es-ES',
      'x-client-timezone': 'America/Caracas',
}

    const msgId = uuidv4()
    const time = Date.now().toString()

    const registerHeaders = {
...userHeaders,
      'x-device-id': deviceId,
      'x-request-id': msgId,
      'x-message-id': msgId,
      'x-request-time': time
}

    const fcmToken = 'eqnTqlxMTSKQL5NQz6r5aP:APA91bHa3CvL5Nlcqx2yzqTDAeqxm_L_vIYxXqehkgmTsCXrV29eAak6_jqXv5v1mQrdw4BGMLXl_BFNrJ67Em0vmdr3hQPVAYF8kR7RDtTRHQ08F3jLRRI'

    const reg = await axios.put('https://musicai.apihub.today/api/v1/users', {
      deviceId,
      fcmToken
}, { headers: registerHeaders})

    const userId = reg.data.id

    const createHeaders = {
...registerHeaders,
      'x-client-id': userId
}

    const cuerpo = {
      type: 'lyrics',
      name: titulo,
      lyrics: letra
}
    if (estado) cuerpo.mood = estado
    if (genero) cuerpo.genre = genero
    if (voz) cuerpo.gender = voz

    const create = await axios.post('https://musicai.apihub.today/api/v1/song/create', cuerpo, { headers: createHeaders})
    const idCancion = create.data.id

    const checkHeaders = {
...userHeaders,
      'x-client-id': userId
}

    const esperar = ms => new Promise(resolve => setTimeout(resolve, ms))
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout})
    let intentos = 0
    let encontrada = null

    while (true) {
      const check = await axios.get('https://musicai.apihub.today/api/v1/song/user', {
        params: {
          userId,
          isFavorite: false,
          page: 1,
          searchText: ''
},
        headers: checkHeaders
})

      encontrada = check.data.datas.find(song => song.id === idCancion)

      if (!encontrada) {
        rl.close()
        return m.reply("⚠️ Parece que la canción aún no está lista.")
}

      readline.cursorTo(process.stdout, 0)
      process.stdout.write(`🔄 [${++intentos}] Estado: ${encontrada.status} | Proceso: ${encontrada.url? '✅ Finalizado': '⏳ Generando...'}`)

      if (encontrada.url) {
        rl.close()

        await bot.sendMessage(m.chat, {
          audio: { url: encontrada.url},
          mimetype: 'audio/mpeg',
          fileName: `${encontrada.name}.mp3`,
          ptt: false,
          contextInfo: {
            forwardingScore: 999999,
            isForwarded: true,
            externalAdReply: {
              title: `Suno Music AI`,
              body: `${encontrada.name} | Estado: ${encontrada.status}`,
              mediaType: 1,
              previewType: 0,
              renderLargerThumbnail: true,
              thumbnailUrl: encontrada.thumbnail_url,
              sourceUrl: encontrada.url
}
}
}, { quoted: m})

        return
}

      await esperar(3000)
}

} catch (e) {
    return m.reply(`❌ Error: ${e?.message || e}`)
}
}

handler.command = ['sonu']
handler.tags = ['inteligencia_artificial']
handler.help = ['sonu <título | letra | estado | género | voz>']

export default handler;
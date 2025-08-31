
import axios from 'axios'

let handler = async (m, { bot, args, usedPrefix, command}) => {
  let url = args[0] || (m.quoted && m.quoted.text)
  if (!url ||!url.includes('/post/')) {
    return m.reply(`🔗 Por favor ingresa una URL de Threads válida.\nEjemplo: ${usedPrefix + command} https://www.threads.net/@infopop.id/post/DMk2wrVzIoP`)
}

  let threadId = url.match(/\/post\/([a-zA-Z0-9]+)/)?.[1]
  if (!threadId) return m.reply('❌ Error: No se pudo extraer el ID de la publicación.')

  try {
    m.reply('🔄 Recuperando datos...')

    const res = await axios.get(`https://www.dolphinradar.com/api/threads/post_detail/${threadId}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, como Gecko) Chrome/138.0.0.0 Mobile Safari/537.36',
        'Accept': 'application/json'
}
})

    const data = res.data?.data
    if (!data ||!data.post_detail ||!data.user) throw '❌ Datos no encontrados.'

    const { post_detail: post, user} = data
    const media = post.media_list || []
    const mediaUrls = media.map(m => m.url)

    let mensaje = `👤 Nombre: ${user.full_name}\n`
    mensaje += `📱 Usuario: @${user.username}\n`
    mensaje += `✅ Verificado: ${user.verified? 'Sí': 'No'}\n`
    mensaje += `👥 Seguidores: ${user.follower_count}\n\n`
    mensaje += `📝 Publicación:\n${post.caption_text || '-'}\n\n`
    mensaje += `❤️ Me gusta: ${post.like_count}`

    for (let i = 0; i < mediaUrls.length; i++) {
      await bot.sendDocument(m.chat, mediaUrls[i], null, i === 0? mensaje: '', m)
}

} catch (err) {
    console.error(err)
    m.reply(`❌ Error: ${err?.message || err}`)
}
}

handler.help = ['threads <url>', 'tredl <url>']
handler.tags = ['descargas']
handler.command = ['threads', 'tredl']

export default handler;
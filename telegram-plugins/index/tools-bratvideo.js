import fetch from 'node-fetch'
import { Sticker} from 'wa-sticker-formatter'

let handler = async (m, { bot, args}) => {
  await bot.sendMessage(m.chat, '⏳ Creando sticker de video...', { reply_to_message_id: m.id })

  try {
    const texto = args.join(' ')
    if (!texto) throw new Error('Ejemplo:.bratv hola mundo')

    const urlApi = `https://api.ypnk.dpdns.org/api/video/bratv?text=${encodeURIComponent(texto)}`
    const respuesta = await fetch(urlApi)
    if (!respuesta.ok) throw new Error('Error al obtener el video')

    const videoBuffer = await respuesta.buffer()
    const sticker = new Sticker(videoBuffer, {
      pack: 'Video BRAT',
      author: 'Yupra AI',
      type: 'crop',
      quality: 50
    })

    await bot.sendSticker(m.chat, await sticker.toBuffer(), { reply_to_message_id: m.id })
    await bot.sendMessage(m.chat, '✅ Sticker de video creado', { reply_to_message_id: m.id })
    await bot.sendMessage(m.chat, { react: { text: '✅', key: m.key}})

  } catch (e) {
    console.error(e)
    await bot.sendMessage(m.chat, '❌ Error al crear el sticker de video', { reply_to_message_id: m.id })
  }
}

handler.help = ['bratv <texto>']
handler.tags = ['sticker']
handler.command = /^bratv$/i

export default handler
export const handler = async (m, { bot, args, usedPrefix, command }) => {
  const texto = args.join(' ')
  if (!texto) {
    return bot.reply(
      m.chat,
      `✳️ *Uso correcto:*\n${usedPrefix + command} <texto>\n\n📌 *Ejemplo:*\n${usedPrefix + command} Hola, ¿cómo estás?`,
      m
    )
  }

  // Reacción de inicio
  await bot.sendMessage(m.chat, { react: { text: '🔵', key: m.key } })

  try {
    const url = `https://api.siputzx.my.id/api/tools/ttsgoogle?text=${encodeURIComponent(texto)}`
    const res = await fetch(url)

    if (!res.ok) throw 'Error al obtener el audio.'

    const buffer = await res.arrayBuffer()

    await bot.sendMessage(
      m.chat,
      {
        audio: Buffer.from(buffer),
        mimetype: 'audio/mp4',
        ptt: true
      },
      { quoted: m }
    )

    // Reacción de éxito
    await bot.sendMessage(m.chat, { react: { text: '🟢', key: m.key } })

  } catch (e) {
    console.error(e)
    await bot.sendMessage(m.chat, { react: { text: '🔴', key: m.key } })
    bot.reply(m.chat, '🔴 Ocurrió un error al generar el audio.', m)
  }
}

handler.help = ['tts <texto-voz>']
handler.tags = ['herramientas']
handler.command = /^tts$/i
export default handler
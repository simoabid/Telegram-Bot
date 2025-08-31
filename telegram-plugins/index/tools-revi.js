let handler = async (m, { bot, text}) => {
  if (!text) return bot.sendMessage(m.chat, '📌 Ejemplo de uso:\n.iqc Pollo frito con papas', { reply_to_message_id: m.id })

  let hora = new Intl.DateTimeFormat('es-ES', {
    timeZone: 'America/Caracas', // Puedes ajustarlo a tu zona
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
}).format(new Date())

  await bot.sendPhoto(m.chat, `https://brat.siputzx.my.id/iphone-quoted?time=${encodeURIComponent(hora)}&batteryPercentage=${Math.floor(Math.random() * 100) + 1}&carrierName=CLARO&messageText=${encodeURIComponent(text.trim())}&emojiStyle=apple`, {
    caption: '📱 iPhone Quote generado',
    reply_to_message_id: m.id
  })
}

handler.help = ['iqc <mensaje>']
handler.tags = ['creador']
handler.command = ['iqc']

export default handler
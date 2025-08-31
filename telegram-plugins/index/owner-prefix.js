let subbotPrefixes = {}  // Prefijos por instancia en memoria

let handler = async (m, { bot, text, args}) => {
  const jid = bot.user?.id?.split(':')[0] + ''

  if (!m.key.fromMe) {
    return m.reply('🔒 Este comando solo puede usarlo el *propietario del subbot* (mensajes enviados desde el propio bot).')
}

  const prefix = text?.trim()
  if (!prefix || prefix.length> 2) {
    return m.reply(`❌ Prefijo inválido.\n\n✅ Ejemplo:.setprefijo ⚡`)
}

  subbotPrefixes[jid] = prefix

  m.reply(`
✅ *Prefijo actualizado localmente para este subbot.*
📌 Nuevo prefijo: *${prefix}*
🚫 No afecta al prefijo del bot principal.
`)
}

handler.command = ['setprefijo']
handler.owner = true
handler.register = false

export const getSubbotPrefix = (jid) => subbotPrefixes[jid] || '.'

export default handler
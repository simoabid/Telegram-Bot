let handler = async (m, { bot, usedPrefix, command }) => {

if (!m.quoted) return bot.sendMessage(m.chat, `🚩 Responde al mensaje que deseas eliminar.`, { reply_to_message_id: m.id })

try {
    // Use Telegram's deleteMessage method
    await bot.deleteMessage(m.chat, m.quoted.id);
    await bot.sendMessage(m.chat, '✅ Mensaje eliminado correctamente.', { reply_to_message_id: m.id });
} catch (error) {
    console.error('Error deleting message:', error);
    await bot.sendMessage(m.chat, '❌ No se pudo eliminar el mensaje. Verifica que tenga permisos de administrador.', { reply_to_message_id: m.id });
}
}
handler.help = ['delete']
handler.tags = ['group']
handler.command = /^del(ete)?$/i
handler.group = false
handler.admin = true
handler.botAdmin = true

export default handler
let handler = async (m, { bot, text, participants, isAdmin, isOwner, usedPrefix, command}) => {
    try {
        if (!m.reply_to_message) {
            return bot.sendMessage(m.chat, `👀 Responde a un mensaje para poder usar el comando correctamente.`)
        }

        // Forward the replied message for Telegram
        await bot.forwardMessage(m.chat, m.reply_to_message.chat.id, m.reply_to_message.message_id)

    } catch (error) {
        console.error('Error in reenviar command:', error)
        await bot.sendMessage(m.chat, '❌ Error al reenviar el mensaje')
    }
}
handler.help = ['reenviar']
handler.tags = ['tools']
handler.command = ['reenviar']

export default handler
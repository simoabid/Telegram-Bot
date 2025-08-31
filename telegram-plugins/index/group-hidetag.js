
let handler = async (m, { bot, text }) => {
    try {
        // Check if it's a group
        const chatInfo = await bot.getChat(m.chat)
        if (chatInfo.type !== 'group' && chatInfo.type !== 'supergroup') {
            return bot.sendMessage(m.chat, '⚠️ Este comando solo funciona en grupos.')
        }

        // Get the message to send
        let messageText = text || 'Notificación grupal'

        // If replying to a message, use that content
        if (m.reply_to_message) {
            messageText = m.reply_to_message.text || messageText
        }

        // Send the message (Telegram doesn't have "hidetag" like WhatsApp)
        // This will just send a regular message to the group
        await bot.sendMessage(m.chat, messageText, {
            parse_mode: 'Markdown'
        })

    } catch (error) {
        console.error('Error in hidetag command:', error)
        await bot.sendMessage(m.chat, '❌ Error al ejecutar el comando')
    }
}
handler.help = ['hidetag']
handler.tags = ['group']
handler.command = ['hidetag', 'notify','n','noti'] 
handler.group = true
export default handler
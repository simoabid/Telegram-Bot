
let handler = async (m, { bot, text }) => {
    try {
        // Check if user is mentioned or replied to
        let targetUser = null
        let mentionedName = 'Usuario'

        if (m.reply_to_message) {
            targetUser = m.reply_to_message.from
            mentionedName = targetUser.first_name || targetUser.username || 'Usuario'
        } else if (text && text.includes('@')) {
            // Extract username from text
            const username = text.replace('@', '').trim()
            mentionedName = username
        } else {
            return bot.sendMessage(m.chat, "Por favor, menciona a un usuario o responde a un mensaje. Ejemplo: .adoptado @usuario")
        }

        let adoptedMessage = `*@${mentionedName}* *ES/IS* *%* *ADOPTADO* _Sus padres se fueron x pañales 😞😂_`

        // Send the message to chat
        await bot.sendMessage(m.chat, adoptedMessage, {
            parse_mode: 'Markdown'
        })
    } catch (error) {
        console.error('Error in adoptado command:', error)
        await bot.sendMessage(m.chat, '❌ Error al ejecutar el comando')
    }
}

handler.help = ['adoptado @usuario'];
handler.tags = ['diversión'];
handler.command = ['adoptado'];

export default handler;
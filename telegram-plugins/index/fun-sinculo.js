
let handler = async (m, { bot, args }) => {
    try {
        // Check if user is mentioned or replied to
        let targetUser = null
        let mentionedName = 'Usuario'

        if (m.reply_to_message) {
            targetUser = m.reply_to_message.from
            mentionedName = targetUser.first_name || targetUser.username || 'Usuario'
        } else if (args[0] && args[0].includes('@')) {
            const username = args[0].replace('@', '').trim()
            mentionedName = username
        } else {
            return bot.sendMessage(m.chat, "⚠️ Debes mencionar a un usuario o responder a un mensaje. Usa el formato: .sinculo @usuario")
        }

        // Fixed percentage
        const porcentaje = 85;

        // Message to send
        const mensaje = `_*@${mentionedName}* *ES/IS* *${porcentaje}%* *SINCULO,* *ASI CREE QUE TIENE UN CULAZO? 😂*_`;

        // Send message to chat
        await bot.sendMessage(m.chat, mensaje, {
            parse_mode: 'Markdown'
        });
    } catch (error) {
        console.error('Error in sinculo command:', error)
        await bot.sendMessage(m.chat, '❌ Error al ejecutar el comando')
    }
}
handler.help = ['sinculo @usuario'];
handler.tags = ['diversión'];
handler.command = ['sinculo'];

export default handler;

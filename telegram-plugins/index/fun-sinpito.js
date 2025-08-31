
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
            return bot.sendMessage(m.chat, "⚠️ Debes mencionar a un usuario o responder a un mensaje. Usa el formato: .sinpito @usuario")
        }

        // Generate random percentage between 1 and 100
        let porcentaje = Math.floor(Math.random() * 100) + 1;

        // Message to send
        const mensaje = `_*@${mentionedName}* *ES/IS* *${porcentaje}%* *SINPITO,* *ASI CREE QUE LA TIENE GRANDE? 😂 XD*_`;

        // Send message to chat
        await bot.sendMessage(m.chat, mensaje, {
            parse_mode: 'Markdown'
        });
    } catch (error) {
        console.error('Error in sinpito command:', error)
        await bot.sendMessage(m.chat, '❌ Error al ejecutar el comando')
    }
}
handler.help = ['sinpito @usuario'];
handler.tags = ['diversión'];
handler.command = ['sinpito'];

export default handler;
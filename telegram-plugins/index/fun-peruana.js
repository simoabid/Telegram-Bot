
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
            return bot.sendMessage(m.chat, "⚠️ Debes mencionar a un usuario o responder a un mensaje. Usa el formato: .peruana @usuario")
        }

        // Generate random percentage between 1 and 100
        let porcentaje = Math.floor(Math.random() * 100) + 1;

        // Message to send
        const mensaje = `💫 *CALCULADORA*\n\n🤮 Los cálculos han arrojado que @${mentionedName} es *${porcentaje}%* peruana 🇵🇪\n> ✰ Despegala De Aqui Cacorro!\n\n➤ ¡Sorpresa!`;

        // Send message to chat
        await bot.sendMessage(m.chat, mensaje, {
            parse_mode: 'Markdown'
        });
    } catch (error) {
        console.error('Error in peruana command:', error)
        await bot.sendMessage(m.chat, '❌ Error al ejecutar el comando')
    }
}
handler.help = ['peruana @usuario'];
handler.tags = ['diversión'];
handler.command = ['peruana'];

export default handler;
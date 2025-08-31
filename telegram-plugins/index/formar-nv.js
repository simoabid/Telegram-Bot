let toM = a => '@' + a.split('@')[0];

async function handler(m, { bot }) {
    try {
        // Get group members for Telegram
        const chatInfo = await bot.getChat(m.chat)
        const members = await bot.getChatMembersCount(m.chat)

        if (members < 2) {
            return bot.sendMessage(m.chat, '❌ Se necesitan al menos 2 miembros en el grupo')
        }

        // For now, we'll use a simple approach since Telegram doesn't easily provide member lists
        // This would need to be enhanced with actual member data
        const message = `*¡Pareja formada!* 💓\n\n*Deberían hacerse novios y formar una buena pareja* 💕`

        await bot.sendMessage(m.chat, message, {
            parse_mode: 'Markdown'
        })
    } catch (error) {
        console.error('Error in formar-nv:', error)
        await bot.sendMessage(m.chat, '❌ Error al ejecutar el comando')
    }
}

handler.help = ['formarnv'];
handler.tags = ['fun'];
handler.command = ['formarnv'];
handler.group = true;

export default handler;
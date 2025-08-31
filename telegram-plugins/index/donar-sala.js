let toM = a => '@' + a.split('@')[0]

async function handler(m, { bot }) {
    try {
        // Get group metadata for Telegram
        const chatInfo = await bot.getChat(m.chat)
        const admins = await bot.getChatAdministrators(m.chat)

        if (admins.length < 2) {
            return bot.sendMessage(m.chat, '❌ Se necesitan al menos 2 administradores para usar este comando')
        }

        // Get random admins
        let a = admins[Math.floor(Math.random() * admins.length)]
        let b
        do {
            b = admins[Math.floor(Math.random() * admins.length)]
        } while (b.user.id === a.user.id && admins.length > 1)

        const message = `*@${a.user.username || a.user.first_name},* _Busca la salita bebe que ya viene el vs_ 📌\nsᥲsᥙkᥱ ᑲ᥆𝗍 🤖`

        await bot.sendMessage(m.chat, message, {
            parse_mode: 'Markdown'
        })
    } catch (error) {
        console.error('Error in donar-sala:', error)
        await bot.sendMessage(m.chat, '❌ Error al ejecutar el comando')
    }
}
handler.help = ['donarsala']
handler.tags = ['freefire']
handler.command = ['donarsala', 'sala']
handler.group = true 
export default handler
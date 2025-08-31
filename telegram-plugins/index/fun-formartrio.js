let toM = a => '@' + a.split('@')[0]

async function handler(m, { bot }) {
    try {
        // For Telegram, we'll create a simplified version
        const names = ['Usuario1', 'Usuario2', 'Usuario3', 'Usuario4', 'Usuario5', 'Usuario6']

        // Shuffle and pick 3 random names
        const shuffled = names.sort(() => 0.5 - Math.random())
        const [a, b, c] = shuffled.slice(0, 3)

        const message = `*Hey!!! @${a}, @${b} y @${c} han pensado en hacer un trio? ustedes 3 hacen un buen trio 😳😏*`

        await bot.sendMessage(m.chat, message, {
            parse_mode: 'Markdown'
        })
    } catch (error) {
        console.error('Error in formartrio command:', error)
        await bot.sendMessage(m.chat, '❌ Error al ejecutar el comando')
    }
}
handler.help = ['formartrio']
handler.tags = ['fun']
handler.command = ['formartrio','formartrios']
handler.group = true
export default handler 
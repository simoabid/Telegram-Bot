import util from 'util'
import path from 'path'

let user = a => '@' + a.split('@')[0]

async function handler(m, { command, bot, text, usedPrefix}) {
    try {
        if (!text) {
            return bot.sendMessage(m.chat, `Ejemplo de uso:\n.top *texto*`)
        }

        // Check if it's a group
        const chatInfo = await bot.getChat(m.chat)
        if (chatInfo.type !== 'group' && chatInfo.type !== 'supergroup') {
            return bot.sendMessage(m.chat, '⚠️ Este comando solo funciona en grupos.')
        }

        // For Telegram, we'll create a simplified version with random names
        const names = ['Usuario1', 'Usuario2', 'Usuario3', 'Usuario4', 'Usuario5', 'Usuario6', 'Usuario7', 'Usuario8', 'Usuario9', 'Usuario10']

        // Shuffle and pick 10 random names
        const shuffled = names.sort(() => 0.5 - Math.random())
        const [a, b, c, d, e, f, g, h, i, j] = shuffled.slice(0, 10)

        let k = Math.floor(Math.random() * 70);
        let x = pickRandom(['🤓','😅','😂','😳','😎', '🥵', '😱', '🤑', '🙄', '💩','🍑','🤨','🥴','🔥','👇🏻','😔', '👀','🌚','🗿'])

        let top = `*${x} Top 10 ${text} ${x}*

*1. @${a}*
*2. @${b}*
*3. @${c}*
*4. @${d}*
*5. @${e}*
*6. @${f}*
*7. @${g}*
*8. @${h}*
*9. @${i}*
*10. @${j}*`

        await bot.sendMessage(m.chat, top, {
            parse_mode: 'Markdown'
        })
    } catch (error) {
        console.error('Error in top command:', error)
        await bot.sendMessage(m.chat, '❌ Error al ejecutar el comando')
    }
}
handler.help = handler.command = ['top']
handler.tags = ['fun']
handler.group = true
export default handler
function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]}
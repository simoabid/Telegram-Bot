import speed from 'performance-now'
import { spawn, exec, execSync } from 'child_process'

let handler = async (m, { bot }) => {
         let timestamp = speed();
         let latensi = speed() - timestamp;

         // Simple ping response for Telegram (neofetch not needed)
         await bot.sendMessage(m.chat, `*Pong* 🏓 ${latensi.toFixed(4)} ms`, { reply_to_message_id: m.id });
}
handler.help = ['ping']
handler.tags = ['info']
handler.command = ['ping']
handler.register = false

export default handler

let handler = async (m, { bot, text, usedPrefix, command, args, participants, isOwner }) => {
    try {
        const userId = m.from_user?.id || m.chat

        // Initialize user data if not exists
        if (!global.db.data.users[userId]) {
            global.db.data.users[userId] = { lastjoin: 0 }
        }

        let time = global.db.data.users[userId].lastjoin + 86400000
        let linkRegex = /t\.me\/joinchat\/([0-9A-Za-z_-]+)/i // Telegram invite link regex
        let delay = time => new Promise(res => setTimeout(res, time))

        let name = userId
        let [_, code] = text.match(linkRegex) || []

        if (!args[0]) {
            return bot.sendMessage(m.chat, `✳️ Envie el link del Grupo de Telegram\n\n 📌 Ejemplo:\n *${usedPrefix + command}* <link_telegram> <dias>\n\n_el número son los días que el bot estará en el grupo_`)
        }
        if (!code) {
            return bot.sendMessage(m.chat, `✳️ Link de Telegram inválido`)
        }
        if (!args[1]) {
            return bot.sendMessage(m.chat, `📌 Falta el número de días\n\n Ejemplo:\n *${usedPrefix + command}* <link_telegram> 2`)
        }
        if (isNaN(args[1])) {
            return bot.sendMessage(m.chat, `✳️ Solo número, que representa los días que el bot estará en el grupo!`)
        }

        let owbot = global.owner[1] || 'owner'
        await bot.sendMessage(m.chat, `😎 Espere 3 segundos, intentaré unirme al grupo`)
        await delay(3000)

        // For Telegram, joining groups via invite links requires different approach
        // This is a simplified version as Telegram bot API has restrictions
        await bot.sendMessage(m.chat, `📝 *Nota:* En Telegram, los bots no pueden unirse automáticamente a grupos mediante enlaces de invitación.\n\nPara agregar el bot a un grupo:\n1. Agrega el bot como administrador del grupo\n2. El bot podrá funcionar en el grupo\n\n_Esta funcionalidad está limitada por las restricciones de la API de Telegram._`)

    } catch (error) {
        console.error('Error in join command:', error)
        await bot.sendMessage(m.chat, '❌ Error al ejecutar el comando')
    }

}
handler.help = ['join <chat.whatsapp.com> <dias>']
handler.tags = ['owner']
handler.command = ['join', 'invite'] 

handler.owner = true

export default handler

function msToDate(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [d, 'd ', h, 'h ', m, 'm ', s, 's '].map(v => v.toString().padStart(2, 0)).join('')
}
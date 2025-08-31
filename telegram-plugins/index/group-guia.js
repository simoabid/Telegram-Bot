let handler = async (m, { isPrems, bot }) => {
    try {
        const userId = m.from_user?.id || m.chat

        // Initialize user data if not exists
        if (!global.db.data.users[userId]) {
            global.db.data.users[userId] = { lastcofre: 0 }
        }

        let time = global.db.data.users[userId].lastcofre + 0
        if (new Date - global.db.data.users[userId].lastcofre < 0) {
            return bot.sendMessage(m.chat, `[❗𝐈𝐍𝐅𝐎❗] 𝚈𝙰 𝚁𝙴𝙲𝙻𝙰𝙼𝙰𝚂𝚃𝙴 𝚃𝚄 𝙲𝙾𝙵𝚁𝙴\n𝚅𝚄𝙴𝙻𝚅𝙴 𝙴𝙽 *${msToTime(time - new Date())}* 𝙿𝙰𝚁𝙰 𝚅𝙾𝙻𝚅𝙴𝚁 𝙰 𝚁𝙴𝙲𝙻𝙰𝙼𝙰𝚁`)
        }

        let img = 'https://cdn-sunflareteam.vercel.app/images/fe2072569a.jpg'
        let texto = `📋 𝙂𝙪𝙞́𝙖 𝙗𝙖́𝙨𝙞𝙘𝙖 𝙙𝙚 𝙘𝙤𝙢𝙖𝙣𝙙𝙤𝙨 𝙥𝙖𝙧𝙖 𝙏𝙚𝙡𝙚𝙜𝙧𝙖𝙢:

/menu 📚 - Muestra todos los comandos
/help - Ayuda general
/start - Inicia el bot
/info - Información del bot
/ping - Verifica conexión

*Comandos de grupo:*
/todos - Etiqueta a todos
/grupo abrir/cerrar - Abre/cierra grupo
/promote @usuario - Da admin
/demote @usuario - Quita admin

*Comandos de diversión:*
/top texto - Top 10 de algo
/gay @usuario - Porcentaje gay
/love @usuario - Compatibilidad

*Comandos de descarga:*
/ytmp3 url - Descarga audio de YouTube
/ytmp4 url - Descarga video de YouTube
/tiktok url - Descarga de TikTok

*Soporte:*
t.me/tu_canal_soporte`

        // Send photo with caption for Telegram
        try {
            await bot.sendPhoto(m.chat, img, {
                caption: texto,
                parse_mode: 'Markdown'
            })
        } catch (error) {
            // Fallback to text message if image fails
            await bot.sendMessage(m.chat, texto, {
                parse_mode: 'Markdown'
            })
        }

        global.db.data.users[userId].lastcofre = new Date() * 1
    } catch (error) {
        console.error('Error in guia command:', error)
        await bot.sendMessage(m.chat, '❌ Error al ejecutar el comando')
    }
}
handler.command = ['guia'] 
handler.register = false
export default handler

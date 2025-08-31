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

        let img = 'https://telegra.ph/file/2f2d54f056e716d68d4d9.jpg'
        let texto = `» 𝙍𝙀𝙂𝙇𝘼𝙎 𝙇𝙄𝘿𝙀𝙍𝙀𝙎 𝘽𝘼𝙎𝙄𝘾𝘼𝙎 *2*`

        // Send photo with caption for Telegram
        await bot.sendPhoto(m.chat, img, {
            caption: texto,
            parse_mode: 'Markdown'
        })

        global.db.data.users[userId].lastcofre = new Date() * 1
    } catch (error) {
        console.error('Error in reglaslideres2 command:', error)
        await bot.sendMessage(m.chat, '❌ Error al ejecutar el comando')
    }
}
handler.help = ['reglaslideres2']
handler.tags = ['freefire']
handler.command = ['reglaslideres2'] 
handler.register = false
handler.admin = false
export default handler

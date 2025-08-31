let handler = async (m, { isPrems, bot }) => {
    try {
        // Initialize user data if not exists
        if (!global.db.data.users[m.from_user.id]) {
            global.db.data.users[m.from_user.id] = { lastcofre: 0 }
        }

        let time = global.db.data.users[m.from_user.id].lastcofre + 0
        if (new Date - global.db.data.users[m.from_user.id].lastcofre < 0) {
            return bot.sendMessage(m.chat, `[❗𝐈𝐍𝐅𝐎❗] 𝚈𝙰 𝚁𝙴𝙲𝙻𝙰𝙼𝙰𝚂𝚃𝙴 𝚃𝚄 𝙲𝙾𝙵𝚁𝙴\n𝚅𝚄𝙴𝙻𝚅𝙴 𝙴𝙽 *${msToTime(time - new Date())}* 𝙿𝙰𝚁𝙰 𝚅𝙾𝙻𝚅𝙴𝚁 𝙰 𝚁𝙴𝙲𝙻𝙰𝙼𝙰𝚁`)
        }

        let img = 'https://cdn.russellxz.click/b7a5b400.jpeg'
        let texto = `» 𝙈𝘼𝙋𝘼 𝘿𝙀 𝙆𝘼𝙇𝘼𝙃𝘼𝙍𝙄 𝙁𝙍𝙀𝙀 𝙁𝙄𝙍𝙀 ✅`

        // Send photo with caption for Telegram
        await bot.sendPhoto(m.chat, img, {
            caption: texto,
            parse_mode: 'Markdown'
        })

        global.db.data.users[m.from_user.id].lastcofre = new Date() * 1
    } catch (error) {
        console.error('Error in kalahari command:', error)
        await bot.sendMessage(m.chat, '❌ Error al ejecutar el comando')
    }
}
handler.command = ['kalahari'] 
handler.register = false
handler.admin = true
export default handler
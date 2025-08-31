let handler = async (m, { isPrems, bot }) => {
    try {
        // Initialize user data if not exists
        if (!global.db.data.users[m.from_user.id]) {
            global.db.data.users[m.from_user.id] = { lastcofre: 0 }
        }

        let time = global.db.data.users[m.from_user.id].lastcofre + 86400000; // 86400000 24 Horas
        if (new Date() - global.db.data.users[m.from_user.id].lastcofre < 0) {
            return bot.sendMessage(m.chat, `[❗𝐈𝐍𝐅𝐎❗] 𝚈𝙰 𝚁𝙴𝙲𝙻𝙰𝙼𝙰𝚂𝚃𝙴 𝚃𝚄 𝙲𝙾𝙵𝚁𝙴\n𝚅𝙾𝙻𝚅𝙴 𝙴𝙽 *${msToTime(time - new Date())}* 𝙿𝙰𝚁𝙰 𝚅𝙾𝙻𝚅𝙴𝚁 𝙰 𝚁𝙴𝙲𝙻𝙰𝙼𝙰𝚁`)
        }

        let img = 'https://cdn.russellxz.click/2559d309.jpeg';
        let texto = `» 𝙈𝘼𝙋𝘼 𝘿𝙀 𝙉𝙀𝙓𝙏𝙀𝙍𝙍𝘼 𝙁𝙍𝙀𝙀 𝙁𝙄𝙍𝙀 ✅`;

        // Send photo with caption for Telegram
        await bot.sendPhoto(m.chat, img, {
            caption: texto,
            parse_mode: 'Markdown'
        })

        global.db.data.users[m.from_user.id].lastcofre = new Date().getTime()
    } catch (error) {
        console.error('Error in nexterra command:', error)
        await bot.sendMessage(m.chat, '❌ Error al ejecutar el comando')
    }
};

handler.command = ['nexterra']; 
handler.register = false
handler.admin = true;
export default handler;
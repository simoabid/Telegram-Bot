
let handler = async (m, { isPrems, bot }) => {
    try {
        const userId = m.from_user?.id || m.chat

        // Initialize user data if not exists
        if (!global.db.data.users[userId]) {
            global.db.data.users[userId] = { lastcofre: 0 }
        }

        let time = global.db.data.users[userId].lastcofre + 0;
        if (new Date - global.db.data.users[userId].lastcofre < 0) {
            return bot.sendMessage(m.chat, `[❗𝐈𝐍𝐅𝐎❗] 𝚈𝙰 𝚁𝙴𝙲𝙻𝙰𝙼𝙰𝚂𝚃𝙴 𝚃𝚄 𝙲𝙾𝙵𝚁𝙴\n𝚅𝚄𝙴𝙻𝚅𝙴 𝙴𝙽 *${msToTime(time - new Date())}* 𝙿𝙰𝚁𝙰 𝚅𝙾𝙻𝚅𝙴𝚁 𝙰 𝚁𝙴𝙲𝙻𝙰𝙼𝙰𝚁`)
        }

        let img = 'https://i.ibb.co/J55dPST/garena-free-fire-logo-rosj9f102kpok60v.jpg';
        let texto = `🎮 *MENÚ DE FREE FIRE* 👑

👑 *FREE FIRE* 👑
🖤 ➺ /donarsala - Donar sala
🖤 ➺ /bermuda - Mapa Bermuda
🖤 ➺ /purgatorio - Mapa Purgatorio
🖤 ➺ /kalahari - Mapa Kalahari
🖤 ➺ /nexterra - Mapa Nexterra
🖤 ➺ /alpes - Mapa Alpes

👑 *REGLAS GENERALES* 👑
🖤 ➺ /reglaslideres - Reglas básicas
🖤 ➺ /reglaslideres2 - Reglas básicas 2

⚔️ *LISTA VERSUS* 👑
⚔ ➺ /4vs4 - Versus 4vs4
⚔ ➺ /6vs6 - Versus 6vs6
⚔ ➺ /8vs8 - Versus 8vs8
⚔ ➺ /scrim - Scrim
⚔ ➺ /12vs12 - Versus 12vs12
⚔ ➺ /16vs16 - Versus 16vs16
⚔ ➺ /20vs20 - Versus 20vs20
⚔ ➺ /24vs24 - Versus 24vs24

🔗 *Canal oficial:* @tu_canal_telegram`;

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
        console.error('Error in menuff command:', error)
        await bot.sendMessage(m.chat, '❌ Error al ejecutar el comando')
    }
};

handler.help = ['menuff'];
handler.tags = ['freefire', 'main'];
handler.command = ['menuff', 'menufreefire', '{}'];
handler.register = false
export default handler;

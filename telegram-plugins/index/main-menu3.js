let handler = async (m, { isPrems, bot }) => {
    try {
        const userId = m.from_user?.id || m.chat

        // Initialize user data if not exists
        if (!global.db.data.users[userId]) {
            global.db.data.users[userId] = { lastcofre: 0 }
        }

        let time = global.db.data.users[userId].lastcofre + 0
        if (new Date - global.db.data.users[userId].lastcofre < 0) {
            return bot.sendMessage(m.chat, `⏳ Ya reclamaste tu cofre. Vuelve en *${msToTime(time - new Date())}* para reclamar de nuevo.`)
        }

let img = 'https://cdn-sunflareteam.vercel.app/images/fe2072569a.jpg'

let texto = `
✨🎨 *𝕄𝔼ℕ𝕌́ ℂℝ𝔼𝔸ℂ𝕀𝕆́ℕ 𝔻𝔼 𝕃𝕆𝔾𝕆𝕊* 🎨✨
––––––––––––––––––––––––––––––––––––––

_¡𝘊𝘳𝘦𝘢 𝘭𝘰𝘨𝘰𝘴 𝘪𝘯𝘤𝘳𝘦𝘪́𝘣𝘭𝘦𝘴 𝘤𝘰𝘯 𝘶𝘯 𝘴𝘰𝘭𝘰 𝘤𝘰𝘮𝘢𝘯𝘥𝘰!_

💖 .logocorazon (𝚝𝚎𝚡𝚝𝚘)
🎄 .logochristmas (𝚝𝚎𝚡𝚝𝚘)
💑 .logopareja (𝚝𝚎𝚡𝚝𝚘)
👾 .logoglitch (𝚝𝚎𝚡𝚝𝚘)
😔 .logosad (𝚝𝚎𝚡𝚝𝚘)
🎮 .logogaming (𝚝𝚎𝚡𝚝𝚘)
🚶‍♂️ .logosolitario (𝚝𝚎𝚡𝚝𝚘)
🐉 .logodragonball (𝚝𝚎𝚡𝚝𝚘)
💡 .logoneon (𝚝𝚎𝚡𝚝𝚘)
🐱 .logogatito (𝚝𝚎𝚡𝚝𝚘)
👧🎮 .logochicagamer (𝚝𝚎𝚡𝚝𝚘)
🎖️ .logoarmy (𝚝𝚎𝚡𝚝𝚘)
🥷 .logonaruto (𝚝𝚎𝚡𝚝𝚘)
🚀 .logofuturista (𝚝𝚎𝚡𝚝𝚘)
☁️ .logonube (𝚝𝚎𝚡𝚝𝚘)
👼 .logoangel (𝚝𝚎𝚡𝚝𝚘) 
🌌 .logocielo (𝚝𝚎𝚡𝚝𝚘)
✍️ .logograffiti3d (𝚝𝚎𝚡𝚝𝚘)
💻 .logomatrix (𝚝𝚎𝚡𝚝𝚘)
🔪 .logohorror (𝚝𝚎𝚡𝚝𝚘)
🦅 .logoalas (𝚝𝚎𝚡𝚝𝚘) 
🔫 .logopubg (𝚝𝚎𝚡𝚝𝚘)
⚔️ .logoguerrero (𝚝𝚎𝚡𝚝𝚘)
👸🔫 .logopubgfem (𝚝𝚎𝚡𝚝𝚘)
👑 .logolol (𝚝𝚎𝚡𝚝𝚘)
👽 .logoamongus (𝚝𝚎𝚡𝚝𝚘)
🎧 .logoportadaplayer (𝚝𝚎𝚡𝚝𝚘)
🔥 .logoportadaff (𝚝𝚎𝚡𝚝𝚘)
🐯🎬 .logovideotiger (𝚝𝚎𝚡𝚝𝚘)
🎬✨ .logovideointro (𝚝𝚎𝚡𝚝𝚘)
🎮🎬 .logovideogaming (𝚝𝚎𝚡𝚝𝚘)
😼 .sadcat (𝚝𝚎𝚡𝚝𝚘)
🐦 .tweet (𝚌𝚘𝚖𝚎𝚗𝚝𝚊𝚛𝚒𝚘)

––––––––––––––––––––––––––––––––––––––
`

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

        // Update user data
        global.db.data.users[userId].lastcofre = new Date() * 1

    } catch (error) {
        console.error('Error in menu3 command:', error)
        await bot.sendMessage(m.chat, '❌ Error al ejecutar el comando')
    }
}
handler.help = ['menu3']
handler.tags = ['main', 'logo']
handler.command = ['menulogos', 'logos', 'menu3'] 
export default handler

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + " horas " + minutes + " minutos " + seconds + " segundos";
}

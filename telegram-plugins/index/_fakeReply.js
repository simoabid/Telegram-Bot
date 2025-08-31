import fetch from 'node-fetch'

export async function before(m, { bot }) {
    try {
        let name = `Quieres bot gratis | Sigue el canal`

        // Initialize bot settings if not exists
        if (!global.db.data.settings[bot.user?.id]) {
            global.db.data.settings[bot.user?.id] = {}
        }

        let botdata = global.db.data.settings[bot.user?.id] || {}
        global.iconimg1 = botdata.icon1 || 'https://cdn-sunflareteam.vercel.app/images/727906cff9.jpg'
        global.iconimg2 = botdata.icon2 || 'https://cdn-sunflareteam.vercel.app/images/7fb6d39d66.jpg'
        global.icono = pickRandom([global.iconimg1, global.iconimg2])

        // Telegram doesn't use fake replies like WhatsApp
        // Instead, we'll set up global variables for consistent bot behavior
        global.telegramReply = {
            parse_mode: 'Markdown',
            disable_web_page_preview: false
        }

        global.telegramPhoto = {
            parse_mode: 'Markdown'
        }

        global.telegramDocument = {
            parse_mode: 'Markdown'
        }

        // Set up global variables for Telegram bot consistency
        global.telegramContact = {
            first_name: global.wm || 'Bot',
            phone_number: '+1234567890'
        }

        // Telegram group/channel info
        global.telegramGroup = {
            title: global.packname || 'Bot Group',
            description: 'Grupo de soporte del bot'
        }

        // Simple fake reply for Telegram (just formatting options)
        global.telegramFake = {
            parse_mode: 'Markdown',
            disable_notification: false
        }

    } catch (error) {
        console.error('Error in fakeReply setup:', error)
    }
}

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
  }
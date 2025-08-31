
import fetch from 'node-fetch';

export async function before(m, { bot }) {
    try {
        // Check if it's a group for Telegram
        const chatInfo = await bot.getChat(m.chat)
        if (chatInfo.type !== 'group' && chatInfo.type !== 'supergroup') return true;

        // Initialize chat data if not exists
        if (!global.db.data.chats[m.chat]) {
            global.db.data.chats[m.chat] = {
                bienvenida: false,
                customWelcome: '',
                customBye: '',
                customKick: ''
            }
        }

        const chat = global.db.data.chats[m.chat];
        if (!chat || !chat.bienvenida) return true;

        // For Telegram, we handle new members differently
        // This would be triggered by bot events for new/left members
        // Since Telegram doesn't have messageStubType like WhatsApp

        // This is a placeholder for Telegram member events
        // In a real implementation, this would be handled by:
        // - bot.on('new_chat_members', handler)
        // - bot.on('left_chat_member', handler)

        console.log('Welcome system active for chat:', m.chat)
        return true;

    } catch (error) {
        console.error('❌ Error in welcome system:', error);
        return true;
    }
}

// Telegram-specific welcome handler for new members
export async function handleNewMember(bot, chatId, newMember) {
    try {
        // Initialize chat data if not exists
        if (!global.db.data.chats[chatId]) {
            global.db.data.chats[chatId] = {
                bienvenida: false,
                customWelcome: '',
                customBye: '',
                customKick: ''
            }
        }

        const chat = global.db.data.chats[chatId];
        if (!chat || !chat.bienvenida) return;

        const chatInfo = await bot.getChat(chatId)
        const user = `@${newMember.username || newMember.first_name}`
        const groupName = chatInfo.title
        const groupDesc = chatInfo.description || '📜 Sin descripción disponible'

        const welcomeText = chat.customWelcome
            ? chat.customWelcome.replace(/@user/gi, user).replace(/@group/gi, groupName).replace(/@desc/gi, groupDesc)
            : `🎉 *¡HOLA ${user}!* 🎉\n\nBienvenido/a a *${groupName}*.\n\n📚 *Sobre nosotros:*\n_${groupDesc}_\n\n🌟 ¡Esperamos que disfrutes tu estancia!`

        try {
            await bot.sendPhoto(chatId, 'https://cdn-sunflareteam.vercel.app/images/fe2072569a.jpg', {
                caption: welcomeText,
                parse_mode: 'Markdown'
            })
        } catch (error) {
            await bot.sendMessage(chatId, welcomeText, {
                parse_mode: 'Markdown'
            })
        }

    } catch (error) {
        console.error('❌ Error in handleNewMember:', error);
    }
}

// Telegram-specific handler for members leaving
export async function handleLeftMember(bot, chatId, leftMember) {
    try {
        const chat = global.db.data.chats[chatId];
        if (!chat || !chat.bienvenida) return;

        const chatInfo = await bot.getChat(chatId)
        const user = `@${leftMember.username || leftMember.first_name}`
        const groupName = chatInfo.title

        const goodbyeText = chat.customBye
            ? chat.customBye.replace(/@user/gi, user).replace(/@group/gi, groupName)
            : `🚶‍♂️ *¡Adiós ${user}!* 😔\n\nGracias por haber formado parte de *${groupName}*. ¡Vuelve cuando quieras!`

        try {
            await bot.sendPhoto(chatId, 'https://cdn-sunflareteam.vercel.app/images/fe2072569a.jpg', {
                caption: goodbyeText,
                parse_mode: 'Markdown'
            })
        } catch (error) {
            await bot.sendMessage(chatId, goodbyeText, {
                parse_mode: 'Markdown'
            })
        }

    } catch (error) {
        console.error('❌ Error in handleLeftMember:', error);
    }
}
let handler = async (m, { bot, isAdmin, isROwner }) => {
    if (!(isAdmin || isROwner)) return dfail('admin', m, bot)
    global.db.data.chats[m.chat].isBanned = true
    await bot.reply(m.chat, `🚫 sᥲsᥙkᥱ ᑲ᥆𝗍 FUE DESACTIVADO EN ESTE CHAT`, m, {})
    await m.react('☑️')
}
handler.help = ['banearbot']
handler.tags = ['group']
handler.command = ['banearbot', 'banchat']
handler.group = true 
export default handler

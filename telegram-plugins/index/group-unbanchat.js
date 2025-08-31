let handler = async (m, { bot, isAdmin, isROwner} ) => {
    if (!(isAdmin || isROwner)) return dfail('admin', m, bot)
    global.db.data.chats[m.chat].isBanned = false
    await bot.reply(m.chat, '✅ Bot activo en este grupo.', m, {})
    await m.react('✅')
}
handler.help = ['desbanearbot']
handler.tags = ['group']
handler.command = ['desbanearbot', 'unbanchat']
handler.group = true 
export default handler

let handler = async(m, { bot }) => {
let revoke = await bot.groupRevokeInvite(m.chat)
await bot.reply(m.chat, `🚩 Se restableció con éxito el link del grupo.\n*-* Link Nuevo: ${'https://chat.whatsapp.com/' + revoke}`, m)}
handler.help = ['resetlink']
handler.tags = ['group']
handler.command = ['revoke', 'resetlink', 'anularlink'] 
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler
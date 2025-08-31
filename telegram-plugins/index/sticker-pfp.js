/* Código hecho por Destroy
 - https://github.com/The-King-Destroy
 */

let handler = async (m, { bot }) => {
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? bot.user.jid : m.sender;
    let name = bot.getName(who);
    let pp = await bot.profilePictureUrl(who, 'image').catch(_ => './logo.jpg');
    bot.sendDocument(m.chat, pp, 'profile.jpg', `Aquí está la foto de perfil de ${name}`, m);
    m.react('✅');
}

handler.help = ['pfp @user'];
handler.tags = ['sticker'];
handler.command = ['pfp'];

export default handler;

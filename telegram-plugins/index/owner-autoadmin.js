
const handler = async (m, {bot, isAdmin, groupMetadata }) => {
  if (isAdmin) return m.reply('🚩 *¡YA ERES ADM JEFE!*');
  try {
    await bot.groupParticipantsUpdate(m.chat, [m.sender], 'promote');
  await m.react(done)
   m.reply('🚩 *¡YA TE DI ADM MI JEFE!*');
    let nn = bot.getName(m.sender);
     bot.reply('544123989549', `🚩 *${nn}* se dio Auto Admin en:\n> ${groupMetadata.subject}.`, m, {}, );
  } catch {
    m.reply('Demasiado Bueno 👻');
  }
};
handler.tags = ['owner'];
handler.help = ['autoadmin'];
handler.command = ['autoadmin' ,'tenerpoder'];
handler.mods = true;
handler.group = true;
handler.botAdmin = true;
export default handler;
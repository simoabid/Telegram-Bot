const handler = async (m, {bot, args}) => {
  await bot.groupUpdateDescription(m.chat, `${args.join(' ')}`);
  m.reply('*👑 La descripción del grupo se modifico correctamente*');
};
handler.help = ['groupdesc <text>'];
handler.tags = ['grupo'];
handler.command = ['gpdesc', 'groupdesc']
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
export default handler;
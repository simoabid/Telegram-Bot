const handler = async (m, { bot, args}) => {
  const who = m.mentionedJid && m.mentionedJid[0]
? m.mentionedJid[0]
: m.fromMe
? bot.user.jid
: m.sender;

  const avatarUrl = await bot.profilePictureUrl(who, 'image').catch(
    (_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'
);

  await bot.sendDocument(
    m.chat,
    global.API('https://some-random-api.com', '/canvas/gay', { avatar: avatarUrl}),
    'error.png',
    '*🏳️‍🌈 𝙼𝙸𝚁𝙴𝙽 𝙰 𝙴𝚂𝚃𝙴 𝙶𝙰𝚈 🏳️‍🌈*',
    m
);

  await bot.sendDocument(
    m.chat,
    'https://qu.ax/grQGD.m4a',
    'audio.mp3',
    null,
    m,
    true
);
};

handler.help = ['gay'];
handler.tags = ['maker'];
handler.command = /^(gay)$/i;
export default handler;
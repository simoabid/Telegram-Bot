const handler = async (m, {bot, text, usedPrefix, command}) => {
  global.db.data.sticker = global.db.data.sticker || {};
  if (!m.quoted) throw '*Por favor, responde a un sticker para agregar el comando.*';
  if (!m.quoted.fileSha256) throw '*El mensaje citado no es un sticker válido.*';
  if (!text) throw `*Falta el texto para el comando.*\n*—◉ ${usedPrefix + command} <texto>*\n\n*Ejemplo:*\n*—◉ ${usedPrefix + command} hola*`;
  
  const sticker = global.db.data.sticker;
  const hash = m.quoted.fileSha256.toString('base64');
  
  if (sticker[hash] && sticker[hash].locked) throw '*No puedes modificar este comando, está bloqueado.*';
  
  sticker[hash] = {
    text,
    mentionedJid: await m.mentionedJid,
    creator: m.sender,
    at: +new Date(),
    locked: false
  };
  
  m.reply('*Comando agregado al sticker correctamente.*');
};
handler.command = ['setcmd', 'addcmd', 'cmdadd', 'cmdset'];
handler.rowner = true;
export default handler;
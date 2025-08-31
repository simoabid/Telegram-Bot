
let handler = async (m, { bot, usedPrefix }) => {
   let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;

   // Verifica si el usuario está en la base de datos
   if (!(who in global.db.data.users)) {
      return bot.reply(m.chat, 'El usuario no se encuentra en mi base de Datos.', m);
   }

   let user = global.db.data.users[who];

   // Respuesta para mostrar los dulces
   await m.reply(`${who == m.sender ? `Tienes *${user.limit}* 🍬 Dulces en tu Cartera` : `El usuario @${who.split('@')[0]} tiene *${user.limit}* 🍬 Dulces en su Cartera`}.`, null, { mentions: [who] });
}

handler.help = ['dulces'];
handler.tags = ['rpg'];
handler.command = ['wallet', 'cartera', 'dulces', 'bal', 'coins'];
handler.register = false; 
export default handler;

let handler = async (m, { bot }) => {
   // Define la cantidad de dulces a otorgar
   const rewardAmount = 400;

   // Obtén la información del usuario
   let user = global.db.data.users[m.sender];

   // Suma los dulces a la cuenta del usuario
   user.limit += rewardAmount; // Asumiendo que 'limit' representa la cantidad de dulces

   await bot.sendMessage(m.chat, `🎉 ¡Has reclamado *${rewardAmount}* 🍬 Dulces! Ahora tienes un total de *${user.limit}* 🍬. ¡Disfrútalos y sigue jugando! 🎊`, { reply_to_message_id: m.id });
}

handler.help = ['claim3'];
handler.tags = ['rpg'];
handler.command = ['claim3'];
handler.register = false;
export default handler;
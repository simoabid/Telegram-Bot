
import db from '../lib/database.js';
import moment from 'moment-timezone';

let handler = async (m, { bot, usedPrefix }) => {
    let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;

    if (!(who in global.db.data.users)) {
        return bot.sendMessage(m.chat, '👤 El usuario no se encuentra en mi base de Datos.', { reply_to_message_id: m.id });
    }

    let user = global.db.data.users[who];
    let name = who === m.sender ? 'Tu' : `Usuario ${who.split('@')[0]}`;

    // Verificación de estado premium
    let premium = user.premium ? '✅' : '❌';

    // Crear el mensaje de inventario
    let text = `╭━〔 Inventario de ${name} 〕⬣\n` +
               `┋ 🗻 *☃️Nieve en Cartera:* ${user.Nieve || 0} \n` +  
               `┋ 🎅🏻 *☃️Nieve en Banco:* ${user.bank || 0} \n` + 
               `┋ ♦️ *Esmeraldas:* ${user.emerald || 0}\n` + 
               `┋ 🔩 *Hierro:* ${user.iron || 0}\n` +  
               `┋ 🏅 *Oro:* ${user.gold || 0}\n` + 
               `┋ 🕋 *Carbón:* ${user.coal || 0}\n` +  
               `┋ 🪨 *Piedra:* ${user.stone || 0}\n` +  
               `┋ ✨ *Experiencia:* ${user.exp || 0}\n` + 
               `┋ ❤️ *Salud:* ${user.health || 100}\n` + 
               `┋ 💎 *Diamantes:* ${user.diamond || 0}\n` + 
               `┋ 🪙 *Coins:* ${user.money || 0}\n` +  
               `┋ 🍬 *Dulces:* ${user.candies || 0}\n` + 
               `┋ 🎁 *Regalos:* ${user.gifts || 0}\n` + 
               `┋ 🎟️ *Tokens:* ${user.joincount || 0}\n` +  
               `┋ ⚜️ *Premium:* ${premium}\n` + 
               `┋ ⏳ *Última Aventura:* ${user.lastAdventure ? moment(user.lastAdventure).fromNow() : 'Nunca'}\n` + 
               `┋ 📅 *Fecha:* ${new Date().toLocaleString('es-ES')}\n` +
               `╰━━━━━━━━━━━━⬣`;

    await bot.sendMessage(m.chat, text, { reply_to_message_id: m.id });
}

handler.help = ['inventario', 'inv'];
handler.tags = ['rpg'];
handler.command = ['inventario', 'inv']; 
handler.register = false

export default handler;
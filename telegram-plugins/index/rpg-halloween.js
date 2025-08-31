const baseCoinReward = 100000; // Aumento en la recompensa base de monedas

var handler = async (m, { bot }) => {
    if (!m.isGroup) return m.reply("❌ Este comando solo puede usarse en grupos.");

    let user = global.db.data.users[m.sender] || {};
    user.halloween = user.halloween || 0; // Asegurarse de que user.halloween esté definido

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const isOctober = currentDate.getMonth() === 9; // Octubre es el mes 9 (0-indexado)

    const cooldown = 365 * 24 * 60 * 60 * 1000; // 1 año en milisegundos
    let timeRemaining = user.halloween + cooldown - currentDate.getTime();

    // Verificar si el usuario puede reclamar el regalo solo en octubre
    if (!isOctober) {
        return m.reply(`🎃 ¡Solo puedes reclamar tu regalo de Halloween en octubre! Vuelve en octubre de ${currentYear}.`);
    }

    if (timeRemaining > 0) {
        return m.reply(`⏱️ ¡Ya reclamaste tu regalo de Halloween este año! Vuelve en:\n *${msToTime(timeRemaining)}*`);
    }

    // Aumento en las recompensas
    let coinReward = pickRandom([20000, 30000, 40000, baseCoinReward]);
    let candyReward = pickRandom([5, 10, 15, 20]);
    let expReward = pickRandom([2000, 3000, 4000, 5000]);
    let giftReward = pickRandom([2, 3, 4, 5]); // Regalos de Halloween

    user.coin = (user.coin || 0) + coinReward;
    user.candies = (user.candies || 0) + candyReward;
    user.exp = (user.exp || 0) + expReward;
    user.gifts = (user.gifts || 0) + giftReward; // Añadir regalos de Halloween

    m.reply(`
\`\`\`🎃 ¡Feliz Halloween! ¡Disfruta de tu regalo de Halloween! 👻\`\`\`

🪙 *Coins* : +${coinReward.toLocaleString()}
🍬 *Dulces* : +${candyReward}
✨ *Experiencia* : +${expReward}
🎃 *Regalos de Halloween* : +${giftReward}`);

    user.halloween = new Date().getTime(); // Actualizar la fecha de reclamación
}

handler.help = ['halloween'];
handler.tags = ['rpg'];
handler.command = ['halloween'];

export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function msToTime(duration) {
    var days = Math.floor(duration / (1000 * 60 * 60 * 24));
    var hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

    return `${days} días ${hours} horas ${minutes} minutos`;
}
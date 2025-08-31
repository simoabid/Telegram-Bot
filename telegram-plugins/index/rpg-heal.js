
let handler = async (m, { bot }) => {
    try {
        const userId = m.from_user?.id || m.chat;

        // Initialize user data if not exists
        if (!global.db.data.users[userId]) {
            global.db.data.users[userId] = {
                health: 100,
                coin: 0,
                lastHeal: 0
            };
        }

        let user = global.db.data.users[userId];

        if (user.coin < 20) {
            return bot.sendMessage(m.chat, '💔 Su saldo es insuficiente para curarse. Necesita al menos 20 monedas.');
        }

        let healAmount = 40;
        user.health += healAmount;
        user.coin -= 20;

        // Ensure health doesn't exceed maximum
        if (user.health > 100) {
            user.health = 100;
        }

        // Save last heal time
        user.lastHeal = new Date();

        // Define info message
        let info = `❤️ *Te has curado ${healAmount} puntos de salud.*\n💸 *Monedas restantes:* ${user.coin}\n❤️ *Salud actual:* ${user.health}`;

        await bot.sendMessage(m.chat, info, {
            parse_mode: 'Markdown'
        });
    } catch (error) {
        console.error('Error in heal command:', error);
        await bot.sendMessage(m.chat, '❌ Error al ejecutar el comando');
    }
};

handler.help = ['heal'];
handler.tags = ['rpg'];
handler.command = ['heal', 'curar'];

export default handler;
const handler = async (m, { bot }) => {
    try {
        const userId = m.from_user?.id || m.chat

        // Initialize user data if not exists
        if (!global.db.data.users[userId]) {
            global.db.data.users[userId] = {
                money: 0,
                estrellas: 0,
                level: 1,
                exp: 0
            }
        }

        const user = global.db.data.users[userId];
        const username = m.from_user?.username || m.from_user?.first_name || 'Usuario';

        // Check if user is owner (adjust owner ID as needed)
        const ownerId = 584246582666 // Replace with actual owner ID
        if (userId === ownerId) {
            await bot.sendMessage(m.chat, 'Este comando no está disponible para el owner.');
            return;
        }

        const message = `🚩 *@${username}* Ahora tienes recursos ilimitados`;

        await bot.sendMessage(m.chat, message, {
            parse_mode: 'Markdown'
        });

        user.money = Infinity;
        user.estrellas = Infinity;
        user.level = Infinity;
        user.exp = Infinity;

        console.log(`Recursos cheteados para ${username}`);

    } catch (error) {
        console.error("Error al chetear recursos:", error);
        await bot.sendMessage(m.chat, 'Error al procesar el comando. Contacta al administrador.');
    }
};

handler.help = ['chetaruser'];
handler.tags = ['group']; // Esta etiqueta se puede mantener, aunque no afecta la funcionalidad
handler.command = /^(ilimitado2|infiniy2|chetaruser)$/i;
handler.rowner = false;
handler.fail = null;
export default handler;
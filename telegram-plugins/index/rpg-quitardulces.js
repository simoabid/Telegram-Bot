
const handler = async (m, { bot, args }) => {
    try {
        // Check if arguments are provided
        if (!args[0] || !args[1]) {
            return bot.sendMessage(m.chat, "Por favor, usa el formato correcto: .quitardulces <cantidad> @usuario");
        }

        const cantidad = parseInt(args[0]);
        let usuarioID = args[1];

        // Handle Telegram user format
        if (m.reply_to_message) {
            usuarioID = m.reply_to_message.from.id;
        } else if (args[1] && args[1].includes('@')) {
            usuarioID = args[1].replace('@', '').trim();
        }

        // Validate amount
        if (isNaN(cantidad) || cantidad <= 0) {
            return bot.sendMessage(m.chat, "La cantidad debe ser un número positivo.");
        }

        // Initialize user data if not exists
        if (!global.db.data.users[usuarioID]) {
            global.db.data.users[usuarioID] = {
                dulce: 0,
                level: 1,
                exp: 0
            };
        }

        const targetUser = global.db.data.users[usuarioID];

        // Check if user has enough candies
        if (targetUser.dulce < cantidad) {
            return bot.sendMessage(m.chat, "El usuario no tiene suficientes dulces para quitar.");
        }

        // Remove candies
        targetUser.dulce -= cantidad;
        const message = `🚩 Se le han quitado ${cantidad} dulces a *@${usuarioID}*. Ahora tiene ${targetUser.dulce} dulces restantes.`;

        await bot.sendMessage(m.chat, message, {
            parse_mode: 'Markdown'
        });

        console.log(`Se han quitado ${cantidad} dulces a ${usuarioID}`);

    } catch (error) {
        console.error("Error al quitar los dulces:", error);
        await bot.sendMessage(m.chat, "Hubo un error al intentar quitar los dulces. Intenta de nuevo más tarde.");
    }
};

handler.help = ['quitardulces <cantidad> <@usuario>'];
handler.tags = ['admin'];
handler.command = /^(quitardulces)$/i;
handler.admin = true; // Solo los administradores pueden usar este comando
handler.fail = null;

export default handler;
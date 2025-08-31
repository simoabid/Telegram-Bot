
let handler = async (m, { bot }) => {
    try {
        const userId = m.from_user?.id || m.chat;

        // Initialize user data if not exists
        if (!global.db.data.users[userId]) {
            global.db.data.users[userId] = {
                level: 1,
                exp: 0
            };
        }

        let user = global.db.data.users[userId];

        // Calculate current and new level
        let nivelActual = user.level || 1;
        let nuevoNivel = nivelActual + 1;

        // Update user level
        user.level = nuevoNivel;

        // Final message about new level reached
        let mensajeFinal = `¡Felicidades! Has subido de nivel.\nNivel Anterior: ${nivelActual}\nNuevo Nivel: ${nuevoNivel} 🎉🐾`;

        // Send message to chat
        await bot.sendMessage(m.chat, mensajeFinal, {
            parse_mode: 'Markdown'
        });
    } catch (error) {
        console.error('Error in level command:', error);
        await bot.sendMessage(m.chat, '❌ Error al ejecutar el comando');
    }
}

handler.help = ['level'];
handler.tags = ['mascotas'];
handler.command = ['level'];

export default handler;
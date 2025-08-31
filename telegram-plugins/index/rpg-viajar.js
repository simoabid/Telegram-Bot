
let handler = async (m, { bot }) => {
    try {
        // Define some random destinations
        const destinos = [
            "la playa 🏖️",
            "la montaña ⛰️",
            "un bosque encantado 🌲✨",
            "una ciudad mágica 🏙️",
            "un parque de diversiones 🎢",
            "una isla tropical 🏝️",
            "un desierto misterioso 🏜️",
            "una cascada cristalina 💧",
            "un castillo medieval 🏰",
            "las nubes ☁️✨"
        ];

        // Choose a random destination
        const destinoElegido = destinos[Math.floor(Math.random() * destinos.length)];

        // Travel message
        const mensajeViaje = `🐾 *¡Tu mascota está lista para viajar!* ✈️

🎯 *Destino:* ${destinoElegido}

🎒 ¡Prepárate para la aventura!
🌟 Tu mascota ganará experiencia en este viaje.`;

        // Send message to chat
        await bot.sendMessage(m.chat, mensajeViaje, {
            parse_mode: 'Markdown'
        });
    } catch (error) {
        console.error('Error in viajar command:', error);
        await bot.sendMessage(m.chat, '❌ Error al iniciar el viaje');
    }
}

handler.help = ['viajar'];
handler.tags = ['mascotas'];
handler.command = ['viajar'];

export default handler;

const handler = async (m, { bot}) => {
    const juegos = [
        "🟩 Pong Clásico",
        "🟦 Snake Legendario",
        "🟥 Tetris Extremo",
        "🔵 Pac-Man Escape"
    ];

    const juegoElegido = juegos[Math.floor(Math.random() * juegos.length)];
    let mensaje = `🕹️ *Arcade Classic!* 🎮🔥\n\n🎯 *Juego seleccionado:* ${juegoElegido}\n🆕 ¡Disfruta tu partida!`;

    await bot.sendMessage(m.chat, { text: mensaje});
};

handler.command = ["classic"];
export default handler;


const handler = async (m, { bot}) => {
    const niveles = [
        "🟢 Principiante",
        "🔵 Intermedio",
        "🟣 Avanzado",
        "🔥 Experto",
        "👑 Leyenda"
    ];

    const nivelElegido = niveles[Math.floor(Math.random() * niveles.length)];
    let mensaje = `🔥 *Modo Ranked!* 🏆🎮\n\n📈 *Tu nivel actual es:* ${nivelElegido}\n⚡ ¡Sigue jugando para subir de nivel!`;

    await bot.sendMessage(m.chat, { text: mensaje});
};

handler.command = ["rankedmode"];
export default handler;

const handler = async (m, { bot}) => {
    const torneos = [
        "🏆 Copa Élite",
        "🎯 Desafío de Habilidad",
        "🎮 Batalla Gamer Extrema",
        "🚀 Liga de Velocidad",
        "👾 Torneo de Monstruos"
    ];

    const torneoElegido = torneos[Math.floor(Math.random() * torneos.length)];
    let mensaje = `🏅 *Torneo Gamer!* 🎮⚡\n\n📌 *Evento:* ${torneoElegido}\n🔥 ¡Prepárate para competir!`;

    await bot.sendMessage(m.chat, { text: mensaje});
};

handler.command = ["nament"];
export default handler;
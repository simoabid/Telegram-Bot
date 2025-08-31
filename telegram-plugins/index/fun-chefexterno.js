
const handler = async (m, { bot}) => {
    const desafios = [
        { nombre: "🔥 Cocina en llamas", reto: "Resuelve el problema antes de que todo se queme."},
        { nombre: "⚡ Cortocircuito en los electrodomésticos", reto: "Encuentra una solución rápida para seguir cocinando."},
        { nombre: "🍽️ Cliente exigente", reto: "Prepara el plato perfecto con ingredientes limitados."},
        { nombre: "🚀 Cocinar contra reloj", reto: "Prepara el plato antes de que el tiempo se acabe."},
        { nombre: "🌪️ Ingredientes voladores", reto: "Atrapa los ingredientes antes de que desaparezcan."}
    ];

    let mensaje = `🍳 *Chef Extremo* 🍳\n\n📌 **Elige tu desafío culinario:**\n`;

    desafios.forEach((desafio, i) => {
        mensaje += `🔹 ${i + 1}. ${desafio.nombre} - ${desafio.reto}\n`;
});

    mensaje += "\n📌 *Responde con el número de la opción que elijas.*";

    bot.chefGame = bot.chefGame || {};
    bot.chefGame[m.chat] = {};

    await bot.sendMessage(m.chat, { text: mensaje});
};

handler.before = async (m, { bot}) => {
    if (bot.chefGame && bot.chefGame[m.chat]) {
        const eleccion = parseInt(m.text.trim());
        const desafios = [
            "🔥 Cocina en llamas", "⚡ Cortocircuito en los electrodomésticos", "🍽️ Cliente exigente",
            "🚀 Cocinar contra reloj", "🌪️ Ingredientes voladores"
        ];

        if (eleccion>= 1 && eleccion <= desafios.length) {
            const desafioSeleccionado = desafios[eleccion - 1];
            const usuario = bot.getName(m.sender);
            bot.chefGame[m.chat] = { nombre: usuario, desafio: desafioSeleccionado};

            await bot.reply(m.chat, `✅ *${usuario} ha elegido:* ${desafioSeleccionado}\n⌛ Preparándose para cocinar bajo presión...`, m);

            setTimeout(() => {
                const resultado = [
                    "🏆 ¡Has completado el desafío y servido el mejor plato!",
                    "💀 Tu comida se quemó y el cliente se fue molesto.",
                    "⚔️ Lograste salvar la cocina, pero fue una batalla difícil.",
                    "🔥 Tu platillo impresionó, pero quedó algo sobrecocido.",
                    "💢 Lo intentaste, pero el caos fue demasiado."
                ];
                const desenlace = resultado[Math.floor(Math.random() * resultado.length)];

                let mensajeFinal = `🍳 *Modo Chef Extremo* 🍳\n\n👤 *Jugador:* ${usuario}\n🍽️ *Desafío seleccionado:* ${desafioSeleccionado}\n\n${desenlace}`;

                bot.sendMessage(m.chat, { text: mensajeFinal});

                delete bot.chefGame[m.chat];
}, 5000);
} else {
            await bot.reply(m.chat, "❌ *Opción inválida. Elige un número entre 1 y 5.*", m);
}
}
};

handler.command = ["chefextremo"];
export default handler;
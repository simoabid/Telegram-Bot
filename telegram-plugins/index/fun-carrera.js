
const handler = async (m, { bot}) => {
    const autos = ["🏎️ Ferrari", "🚗 Mustang", "🚙 Jeep", "🚕 Taxi", "🚚 Camión", "🚓 Policía", "🛻 Pick-Up", "🚜 Tractor"];
    let jugadores = {};
    let mensajeInicial = `🚦 *Carrera de Autos* 🚦\n\n📌 **Elige tu auto:**\n`;

    autos.forEach((auto, i) => {
        mensajeInicial += `🔹 ${i + 1}. ${auto}\n`;
});

    mensajeInicial += "\n📌 *Responde con el número del auto que quieres para participar.*";

    bot.raceGame = bot.raceGame || {};
    bot.raceGame[m.chat] = { jugadores};

    await bot.sendMessage(m.chat, { text: mensajeInicial});
};

handler.before = async (m, { bot}) => {
    if (bot.raceGame && bot.raceGame[m.chat]) {
        const eleccion = parseInt(m.text.trim());
        const autos = ["🏎️ Ferrari", "🚗 Mustang", "🚙 Jeep", "🚕 Taxi", "🚚 Camión", "🚓 Policía", "🛻 Pick-Up", "🚜 Tractor"];

        if (eleccion>= 1 && eleccion <= autos.length) {
            const autoSeleccionado = autos[eleccion - 1];
            const usuario = bot.getName(m.sender); // Obtener el nombre del usuario

            bot.raceGame[m.chat].jugadores[m.sender] = { nombre: usuario, auto: autoSeleccionado};

            await bot.reply(m.chat, `✅ *${usuario} ha elegido:* ${autoSeleccionado}\n⌛ Esperando más jugadores...`, m);

            setTimeout(() => {
                if (Object.keys(bot.raceGame[m.chat].jugadores).length> 1) {
                    const participantes = Object.values(bot.raceGame[m.chat].jugadores);
                    const ganador = participantes[Math.floor(Math.random() * participantes.length)];

                    let mensajeCarrera = "🏁 *La carrera comienza...*\n\n";
                    participantes.forEach(({ nombre, auto}) => {
                        mensajeCarrera += `👤 ${nombre}: ${auto}\n`;
});

                    mensajeCarrera += `\n🎉 *El ganador es:* ${ganador.nombre} con ${ganador.auto} 🏆`;

                    bot.sendMessage(m.chat, { text: mensajeCarrera});
} else {
                    bot.sendMessage(m.chat, { text: "❌ *No hubo suficientes jugadores para iniciar la carrera.*"});
}

                delete bot.raceGame[m.chat];
}, 10000);
} else {
            await bot.reply(m.chat, "❌ *Opción inválida. Elige un número entre 1 y 8.*", m);
}
}
};

handler.command = ["carrera"];
export default handler;
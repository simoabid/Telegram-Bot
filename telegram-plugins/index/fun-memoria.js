
const timeout = 30000; // 30 segundos para responder

const handler = async (m, { bot}) => {
    const emojis = ["🔥", "🌟", "💎", "🎲", "🚀", "🎮", "🏆", "🧠", "⚡", "🎭"];
    const seleccionados = [];

    // Generar una secuencia de 4 a 6 emojis aleatorios
    for (let i = 0; i < Math.floor(Math.random() * 3) + 4; i++) {
        seleccionados.push(emojis[Math.floor(Math.random() * emojis.length)]);
}

    const secuencia = seleccionados.join(" ");
    bot.memoriaGame = bot.memoriaGame || {};
    bot.memoriaGame[m.chat] = {
        secuencia,
        timeout: setTimeout(() => {
            if (bot.memoriaGame[m.chat]) {
                bot.reply(m.chat, `⏳ *Tiempo agotado!* La secuencia era: *${secuencia}*`, m);
                delete bot.memoriaGame[m.chat];
}
}, timeout),
};

    await bot.reply(m.chat, `🧠 *Juego de Memoria*\n\n📌 Recuerda esta secuencia y repítela:\n➡️ *${secuencia}*\n⏳ Tienes *30 segundos* para escribirla correctamente.`, m);
};

handler.before = async (m, { bot}) => {
    if (bot.memoriaGame && bot.memoriaGame[m.chat]) {
        const respuesta = m.text.trim();
        if (respuesta === bot.memoriaGame[m.chat].secuencia) {
            clearTimeout(bot.memoriaGame[m.chat].timeout);
            delete bot.memoriaGame[m.chat];

            return bot.reply(m.chat, `🎉 ¡Correcto! Tienes una excelente memoria.`, m);
} else {
            return bot.reply(m.chat, `❌ *Incorrecto.* Inténtalo de nuevo.`, m);
}
}
};

handler.command = ["memoria"];
export default handler;
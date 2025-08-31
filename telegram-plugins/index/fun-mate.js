
const timeout = 45000; // Tiempo reducido a 45 segundos para mayor dificultad
const reward = { dolares: 40, coins: 30, diamantes: 2};

const mate = async (m, { bot}) => {
    const user = global.db.data.users[m.sender];
    const num1 = Math.floor(Math.random() * 50) + 10; // Números más grandes
    const num2 = Math.floor(Math.random() * 20) + 5;
    const operaciones = ['+', '-', '×', '÷'];
    const operacion = operaciones[Math.floor(Math.random() * operaciones.length)];

    let resultado;
    switch (operacion) {
        case '+': resultado = num1 + num2; break;
        case '-': resultado = num1 - num2; break;
        case '×': resultado = num1 * num2; break;
        case '÷': resultado = Math.floor(num1 / num2); break; // División con número entero
}

    const pregunta = `${num1} ${operacion} ${num2}`;
    bot.mathGame = bot.mathGame || {};
    bot.mathGame[m.chat] = {
        resultado,
        timeout: setTimeout(() => {
            if (bot.mathGame[m.chat]) {
                bot.reply(m.chat, `⏰ Tiempo agotado. La respuesta correcta era *${resultado}*.`, m);
                delete bot.mathGame[m.chat];
}
}, timeout)
};

    return bot.reply(m.chat, `🧠 *Desafío Matemático*\n\n📌 Resuelve: *${pregunta} =?*\n⏳ Tienes *45 segundos* para responder.`, m);
};

mate.before = async (m, { bot}) => {
    if (bot.mathGame && bot.mathGame[m.chat]) {
        const respuesta = parseInt(m.text.trim());
        if (respuesta === bot.mathGame[m.chat].resultado) {
            const user = global.db.data.users[m.sender];
            user.dolares = (user.dolares || 0) + reward.dolares;
            user.coins = (user.coins || 0) + reward.coins;
            user.diamantes = (user.diamantes || 0) + reward.diamantes;

            clearTimeout(bot.mathGame[m.chat].timeout);
            delete bot.mathGame[m.chat];

            return bot.reply(m.chat, `🎉 ¡Correcto!\n💵 +${reward.dolares} Dólares\n🪙 +${reward.coins} Coins\n💎 +${reward.diamantes} Diamantes`, m);
} else if (!isNaN(respuesta)) {
            return bot.reply(m.chat, `❌ Respuesta incorrecta. Intenta nuevamente.`, m);
}
}
};

mate.command = /^mate$/i;
export default mate;
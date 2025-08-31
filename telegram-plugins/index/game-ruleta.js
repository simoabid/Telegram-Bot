
const handler = async (m, { bot, participants }) => {
    if (!m.isGroup) return bot.sendMessage(m.chat, "❌ *Este comando solo puede usarse en grupos.*", { reply_to_message_id: m.id });

    if (!participants || participants.length === 0) return bot.sendMessage(m.chat, "⚠️ *No hay suficientes participantes para la ruleta.*", { reply_to_message_id: m.id });

    const miembros = participants.filter(p => !p.admin && p.id);
    if (miembros.length === 0) return bot.sendMessage(m.chat, "⚠️ *No hay suficientes miembros no administradores para jugar.*", { reply_to_message_id: m.id });

    const ganador = miembros[Math.floor(Math.random() * miembros.length)];
    // Use the user ID directly since Telegram doesn't have getName method
    const nombreGanador = `@${ganador.id}`;

    await bot.sendMessage(m.chat, `
🎰 **¡La ruleta ha girado!** 🎰
🏆 *Felicitaciones, ${nombreGanador}! Eres el ganador.*
🎊 Disfruta tu victoria y compártela con el grupo!
`, { reply_to_message_id: m.id });
};

handler.command = ['ruleta'];
export default handler;


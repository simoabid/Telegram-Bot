const insults = [
    "Eres más inútil que un zapato en una pierna de palo.",
    "Tienes el cerebro de un caracol... ¡y sin la concha!",
    "Si fueras un ladrillo, serías el más tonto de la pared.",
    "Eres como un mal chiste, no haces gracia.",
    "Si la ignorancia es felicidad, tú debes ser el más feliz del mundo.",
    "Eres tan brillante como un agujero negro.",
    "Si fueras un vegetal, serías una cebolla... ¡porque siempre haces llorar!",
];

async function handler(m, { bot, usedPrefix }) {
    const insult = insults[Math.floor(Math.random() * insults.length)];

    const buttons = [
        {
            buttonId: `${usedPrefix}insulto`,
            buttonText: { displayText: "🔄 Ver más" },
            type: 1
        }
    ];

    await bot.sendMessage(
        m.chat,
        {
            text: insult,
            buttons: buttons,
            viewOnce: true
        },
        { quoted: m }
    );
}

handler.help = ['insulto'];
handler.tags = ['fun'];
handler.command = ['insulto'];

export default handler;
let R = Math.random;
let Fl = Math.floor;
let toM = (a) => "@" + a.split("@")[0];

async function handler(m, { bot }) {
    try {
        // For Telegram, we'll create a simplified version since getting member lists is complex
        // Generate random names for demonstration
        const names = ['Usuario1', 'Usuario2', 'Usuario3', 'Usuario4', 'Usuario5', 'Usuario6', 'Usuario7', 'Usuario8', 'Usuario9', 'Usuario10']

        // Shuffle and pick 10 random names
        const shuffled = names.sort(() => 0.5 - Math.random())
        const [a, b, c, d, e, f, g, h, i, j] = shuffled.slice(0, 10)

        const message = `*😍_Las 5 mejores parejas del grupo_😍*

*_1.- @${a} y @${b}_*
- Esta pareja esta destinada a estar junta 💙

*_2.- @${c} y @${d}_*
- Esta pareja son dos pequeños tortolitos enamorados ✨

*_3.- @${e} y @${f}_*
- Ufff y que decir de esta pareja, ya hasta familia deberian tener 🤱🧑‍🍼

*_4.- @${g} y @${h}_*
- Estos ya se casaron en secreto 💍

*_5.- @${i} y @${j}_*
- Esta pareja se esta de luna de miel ✨🥵😍❤️*`

        await bot.sendMessage(m.chat, message, {
            parse_mode: 'Markdown'
        })
    } catch (error) {
        console.error('Error in formarpareja5 command:', error)
        await bot.sendMessage(m.chat, '❌ Error al ejecutar el comando')
    }
}
handler.help = ["formarpareja5"];
handler.tags = ["fun"];
handler.command = ["formarpareja5"];
handler.group = true;
export default handler;
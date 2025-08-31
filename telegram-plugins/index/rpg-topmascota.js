
let handler = async (m, { bot }) => {
    try {
        const mascotas = [
            { nombre: "🐕 Perro", puntos: 1000 },
            { nombre: "🐱 Gato", puntos: 800 },
            { nombre: "🦜 Loro", puntos: 600 },
            { nombre: "🐰 Conejo", puntos: 500 },
            { nombre: "🐹 Hámster", puntos: 300 }
        ];

        // Sort pets by points in descending order
        mascotas.sort((a, b) => b.puntos - a.puntos);

        // Build ranking message
        let mensajeRanking = "🏆 *Ranking de Mascotas* 🏆\n\n";

        mascotas.forEach((mascota, index) => {
            const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "🏅";
            mensajeRanking += `${medal} *${index + 1}.* ${mascota.nombre} - ${mascota.puntos} puntos\n`;
        });

        await bot.sendMessage(m.chat, mensajeRanking, {
            parse_mode: 'Markdown'
        });
    } catch (error) {
        console.error('Error in topmascota command:', error);
        await bot.sendMessage(m.chat, '❌ Error al mostrar el ranking de mascotas');
    }
}

handler.help = ['topmascota'];
handler.tags = ['juegos'];
handler.command = ['topmascota'];

export default handler;
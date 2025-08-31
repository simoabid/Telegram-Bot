
import axios from 'axios';

let handler = async (m, { bot, args, usedPrefix, command }) => {
    if (!args[0]) return bot.reply(m.chat, `🚩 Ingrese un título de película para buscar\n\nEjemplo:\n> *${usedPrefix + command}* diablo`, m, {});

    await m.react('🕓');
    try {
        // Hacer una solicitud a la API de búsqueda de películas
        const response = await axios.get(`https://api.dorratz.com/v2/pelis-search?q=${encodeURIComponent(args.join(' '))}`);
        
        // Verificar si la solicitud fue exitosa
        if (!response.data.status) {
            return bot.reply(m.chat, 'No se encontraron resultados para su búsqueda.', m);
        }
        
        let peliculas = response.data.peliculas;
        let txt = '`乂  P E L I C U L A S  -  B U S Q U E D A`\n\n';

        peliculas.forEach(pelicula => {
            txt += `  ✩   *Título* : ${pelicula.titulo}\n`;
            txt += `  ✩   *Rating* : ${pelicula.rating}\n`;
            txt += `  ✩   *Enlace* : ${pelicula.link}\n`;
            txt += `  ✩   *Imagen* : ${pelicula.imagen}\n\n`;
        });

        await bot.reply(m.chat, txt.trim(), m);
        await m.react('✅');
    } catch (error) {
        console.error(error);
        await m.react('✖️');
        return bot.reply(m.chat, 'Hubo un error al buscar las películas. Intente nuevamente más tarde.', m);
    }
};

handler.help = ['pelisplus *<título>*'];
handler.tags = ['search'];
handler.command = ['pelisplussearch', 'pelisplus'];
handler.register = false

export default handler;
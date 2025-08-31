
const palabras = [
    // Tecnología y ciencia
    "computadora", "javascript", "programación", "inteligencia", "robot", "desarrollo", "internet", "algoritmo",
    "servidor", "criptografía", "redes", "software", "hardware", "nanotecnología", "biotecnología", "astronomía",

    // Naturaleza y planeta
    "planeta", "galaxia", "universo", "estrella", "satélite", "ecosistema", "biodiversidad", "evolución",
    "volcán", "terremoto", "huracán", "tsunami", "montaña", "desierto", "bosque", "selva", "océano",
    "río", "lago", "atmósfera", "mariposa", "especie", "fauna", "flora",

    // Historia y cultura
    "historia", "arquitectura", "ingeniería", "faraón", "civilización", "imperio", "revolución", "descubrimiento",
    "museo", "arte", "pintura", "escultura", "filosofía", "literatura", "poesía", "teatro", "mitología",
    "batalla", "guerrero", "castillo", "nobleza",

    // Deportes y entretenimiento
    "fútbol", "tenis", "baloncesto", "natación", "atletismo", "ciclismo", "gimnasia", "boxeo",
    "videojuego", "concierto", "película", "actor", "actriz", "director", "escenario", "musical",

    // Comida y cocina
    "pizza", "hamburguesa", "pasta", "sushi", "tacos", "queso", "chocolate", "helado",
    "panadería", "ingredientes", "receta", "sabores", "especias",

    // Animales y criaturas
    "elefante", "jirafa", "tiburón", "mariposa", "perro", "gato", "águila", "león", "tigre",
    "serpiente", "dragón", "dinosaurio", "fénix", "unicorno",

    // Objetos y cosas comunes
    "lámpara", "reloj", "avión", "automóvil", "bicicleta", "telescopio", "microscopio", "martillo", "espejo",
    "sombrero", "zapato", "libro", "cuaderno"
];

const handler = async (m, { bot}) => {
    const palabra = palabras[Math.floor(Math.random() * palabras.length)];
    const oculta = palabra.replace(/[a-zA-Z]/g, "_");
    let intentos = 6;

    bot.hangmanGame = bot.hangmanGame || {};
    bot.hangmanGame[m.chat] = { palabra, oculta, intentos, letras: []};

    let mensaje = `🎭 *Ahorcado* 🎭\n\n📌 *Palabra:* ${oculta}\n🔹 Intentos restantes: ${intentos}\n📝 Adivina una letra enviando un mensaje con solo una letra.`;

    await bot.sendMessage(m.chat, mensaje, { reply_to_message_id: m.id });
};

handler.before = async (m, { bot}) => {
    if (bot.hangmanGame && bot.hangmanGame[m.chat]) {
        const juego = bot.hangmanGame[m.chat];
        const letra = m.text.trim().toLowerCase();

        if (letra.length !== 1 || !/[a-zA-Z]/.test(letra)) {
            return bot.sendMessage(m.chat, "❌ *Envía solo una letra válida.*", { reply_to_message_id: m.id });
        }

        if (juego.letras.includes(letra)) {
            return bot.sendMessage(m.chat, "🔁 *Ya has intentado esta letra.*", { reply_to_message_id: m.id });
        }

        juego.letras.push(letra);

        if (juego.palabra.includes(letra)) {
            let nuevaOculta = juego.palabra.split("").map(l => (juego.letras.includes(l)? l: "_")).join("");
            juego.oculta = nuevaOculta;
} else {
            juego.intentos -= 1;
}

        if (juego.oculta === juego.palabra) {
            delete bot.hangmanGame[m.chat];
            return bot.sendMessage(m.chat, `🎉 *¡Has ganado!* La palabra era: ${juego.palabra} 🏆`, { reply_to_message_id: m.id });
        } else if (juego.intentos === 0) {
            delete bot.hangmanGame[m.chat];
            return bot.sendMessage(m.chat, `💀 *¡Has perdido!* La palabra era: ${juego.palabra}.`, { reply_to_message_id: m.id });
        } else {
            return bot.sendMessage(m.chat, `🎭 *Ahorcado* 🎭\n\n📌 *Palabra:* ${juego.oculta}\n🔹 Intentos restantes: ${juego.intentos}\n📝 Adivina otra letra.`, { reply_to_message_id: m.id });
        }
}
};

handler.command = ["ahorcado"];
export default handler;
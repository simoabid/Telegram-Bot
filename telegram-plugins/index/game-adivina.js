const banderas = [
  { pais: "Honduras", emoji: "🇭🇳" },
  { pais: "México", emoji: "🇲🇽" },
  { pais: "Brasil", emoji: "🇧🇷" },
  { pais: "Argentina", emoji: "🇦🇷" },
  { pais: "Colombia", emoji: "🇨🇴" },
  { pais: "Chile", emoji: "🇨🇱" },
  { pais: "Perú", emoji: "🇵🇪" },
  { pais: "Venezuela", emoji: "🇻🇪" },
  { pais: "Uruguay", emoji: "🇺🇾" },
  { pais: "Bolivia", emoji: "🇧🇴" },
  { pais: "Guatemala", emoji: "🇬🇹" },
  { pais: "Nicaragua", emoji: "🇳🇮" },
  { pais: "Costa Rica", emoji: "🇨🇷" },
  { pais: "El Salvador", emoji: "🇸🇻" },
  { pais: "Panamá", emoji: "🇵🇦" },
  { pais: "Paraguay", emoji: "🇵🇾" },
  { pais: "Cuba", emoji: "🇨🇺" },
  { pais: "República Dominicana", emoji: "🇩🇴" },
  { pais: "Estados Unidos", emoji: "🇺🇸" },
  { pais: "Canadá", emoji: "🇨🇦" },
  { pais: "España", emoji: "🇪🇸" },
  { pais: "Francia", emoji: "🇫🇷" },
  { pais: "Alemania", emoji: "🇩🇪" },
  { pais: "Italia", emoji: "🇮🇹" },
  { pais: "Reino Unido", emoji: "🇬🇧" },
  { pais: "Portugal", emoji: "🇵🇹" },
  { pais: "Rusia", emoji: "🇷🇺" },
  { pais: "Noruega", emoji: "🇳🇴" },
  { pais: "Suecia", emoji: "🇸🇪" },
  { pais: "Finlandia", emoji: "🇫🇮" },
  { pais: "Países Bajos", emoji: "🇳🇱" },
  { pais: "Grecia", emoji: "🇬🇷" },
  { pais: "Irlanda", emoji: "🇮🇪" },
  { pais: "Japón", emoji: "🇯🇵" },
  { pais: "China", emoji: "🇨🇳" },
  { pais: "India", emoji: "🇮🇳" },
  { pais: "Corea del Sur", emoji: "🇰🇷" },
  { pais: "Vietnam", emoji: "🇻🇳" },
  { pais: "Filipinas", emoji: "🇵🇭" },
  { pais: "Indonesia", emoji: "🇮🇩" },
  { pais: "Tailandia", emoji: "🇹🇭" },
  { pais: "Arabia Saudita", emoji: "🇸🇦" },
  { pais: "Israel", emoji: "🇮🇱" },
  { pais: "Sudáfrica", emoji: "🇿🇦" },
  { pais: "Nigeria", emoji: "🇳🇬" },
  { pais: "Kenia", emoji: "🇰🇪" },
  { pais: "Egipto", emoji: "🇪🇬" },
  { pais: "Marruecos", emoji: "🇲🇦" },
  { pais: "Argelia", emoji: "🇩🇿" },
  { pais: "Australia", emoji: "🇦🇺" },
  { pais: "Nueva Zelanda", emoji: "🇳🇿" },
  { pais: "Fiyi", emoji: "🇫🇯" },
  { pais: "LGBT", emoji: "🏳️‍🌈" },
  { pais: "Orgullo trans", emoji: "🏳️‍⚧️" },
  { pais: "ONU", emoji: "🇺🇳" },
  { pais: "Palestina", emoji: "🇵🇸" },
  { pais: "Ucrania", emoji: "🇺🇦" }
];

const juegoBanderas = new Map();

function elegirBanderaAleatoria() {
  return banderas[Math.floor(Math.random() * banderas.length)];
}

let handler = async (m, { bot, usedPrefix }) => {
    try {
        const userId = m.from_user?.id || m.chat

        if (juegoBanderas.has(userId)) {
            juegoBanderas.delete(userId);
        }

        const seleccionada = elegirBanderaAleatoria();
        juegoBanderas.set(userId, { pais: seleccionada.pais.toLowerCase(), intentos: 2 });

        const text = `🎌 Adivina la bandera:\n\n» ${seleccionada.emoji}\n\n*Responde con el nombre del país.*\nTienes 2 corazones ❤️❤️`;

        await bot.sendMessage(m.chat, text, {
            reply_to_message_id: m.message_id,
            parse_mode: 'Markdown'
        });
    } catch (error) {
        console.error('Error in adivinabandera command:', error)
        await bot.sendMessage(m.chat, '❌ Error al ejecutar el comando')
    }
};

handler.before = async (m, { bot, usedPrefix }) => {
    try {
        const userId = m.from_user?.id || m.chat
        const juego = juegoBanderas.get(userId);
        if (!juego) return;

        const respuesta = m.text?.trim().toLowerCase();
        if (!respuesta) return;

        if (respuesta === juego.pais) {
            juegoBanderas.delete(userId);
            const text = `¡Correcto! Adivinaste la bandera de *${juego.pais.charAt(0).toUpperCase() + juego.pais.slice(1)}* 🥳`;
            return await bot.sendMessage(m.chat, text, {
                reply_to_message_id: m.message_id,
                parse_mode: 'Markdown'
            });
        } else {
            juego.intentos--;
            if (juego.intentos <= 0) {
                juegoBanderas.delete(userId);
                const text = `❌ Perdiste. La respuesta correcta era *${juego.pais.charAt(0).toUpperCase() + juego.pais.slice(1)}*`;
                return await bot.sendMessage(m.chat, text, {
                    reply_to_message_id: m.message_id,
                    parse_mode: 'Markdown'
                });
            } else {
                return await bot.sendMessage(m.chat, `❌ Incorrecto. Te quedan ${juego.intentos} corazón(es) ❤️`, {
                    reply_to_message_id: m.message_id
                });
            }
        }
    } catch (error) {
        console.error('Error in adivinabandera before handler:', error)
    }
};

handler.help = ['adivinabandera'];
handler.tags = ['game'];
handler.command = ['adivinabandera'];
handler.group = true;
handler.register = false;

export default handler;
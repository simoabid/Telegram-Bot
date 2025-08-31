import axios from "axios";

let handler = async (m, { bot, args }) => {
  try {
    // Telegram doesn't provide real-time online status like WhatsApp
    // We'll show recent activity instead

    const mensaje = `*⚠️ LIMITACIÓN DE TELEGRAM*\n\n` +
      `Los bots de Telegram no pueden ver el estado "en línea" de los usuarios por limitaciones de privacidad de la API.\n\n` +
      `*📋 Información disponible:*\n` +
      `• El bot puede responder a mensajes\n` +
      `• Puede ver usuarios que interactúan con comandos\n` +
      `• No puede rastrear estado de conexión\n\n` +
      `*💡 Alternativas:*\n` +
      `• Usa /link para ver info del grupo\n` +
      `• Los usuarios aparecen cuando usan comandos\n` +
      `• El bot responde a todos los mensajes dirigidos\n\n` +
      `🤖 _Bot funcionando correctamente_`;

    await bot.sendMessage(m.chat, mensaje, { reply_to_message_id: m.id });

  } catch (error) {
    console.error(error);
    await bot.sendMessage(m.chat, "Hubo un error al procesar la solicitud.", { reply_to_message_id: m.id });
  }
};

handler.help = ["listonline"];
handler.tags = ["grupo"];
handler.command = ["listonline", "online", "linea", "enlinea"];
handler.owner = false;
handler.mods = false;
handler.premium = false;
handler.group = true;
handler.private = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;
handler.register = false;

export default handler;
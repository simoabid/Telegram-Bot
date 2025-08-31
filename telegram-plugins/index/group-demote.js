let handler = async (m, { bot, usedPrefix, command, text }) => {
    // Telegram bots cannot demote admin users - only group owners can do this manually
    await bot.sendMessage(m.chat, `
⚠️ *LIMITACIÓN DE TELEGRAM*

Los bots de Telegram **no pueden degradar administradores**. Esta es una limitación de la API de Telegram por seguridad.

🔧 **Para degradar a un administrador:**
1. Ve a la información del grupo
2. Toca en "Administradores"
3. Selecciona al administrador
4. Toca "Quitar derechos de administrador"

💡 **Funciones disponibles del bot:**
• ✅ Eliminar usuarios (/kick)
• ✅ Silenciar usuarios (/mute)
• ✅ Eliminar mensajes (/delete)
• ✅ Información del grupo (/link)

🤖 _Desarrollado por Barboza Team_
    `.trim(), { reply_to_message_id: m.id });
};

handler.help = ['demote'];
handler.tags = ['group'];
handler.command = ['demote', 'degradar'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.fail = null;

export default handler;

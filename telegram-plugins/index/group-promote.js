var handler = async (m, { bot,usedPrefix, command, text }) => {
    // Telegram bots cannot promote users to admin - only group owners can do this manually
    await bot.sendMessage(m.chat, `
⚠️ *LIMITACIÓN DE TELEGRAM*

Los bots de Telegram **no pueden promover usuarios** a administradores. Esta es una limitación de la API de Telegram por seguridad.

🔧 **Para promover a un usuario:**
1. Ve a la información del grupo
2. Toca en "Administradores"
3. Toca "Agregar administrador"
4. Selecciona al usuario manualmente

💡 **Funciones disponibles del bot:**
• ✅ Eliminar usuarios (/kick)
• ✅ Silenciar usuarios (/mute)
• ✅ Eliminar mensajes (/delete)
• ✅ Información del grupo (/link)

🤖 _Desarrollado por Barboza Team_
    `.trim(), { reply_to_message_id: m.id });
}

handler.help = ['promote'];
handler.tags = ['grupo'];
handler.command = ['promote','darpija', 'promover']; 
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.fail = null;

export default handler;

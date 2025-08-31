const handler = async (m, { bot }) => {
  try {
    // For Telegram, we'll show a simplified group list since the API is different
    let txt = '';
    txt += `*⚠️ LIMITACIÓN DE TELEGRAM*\n\n`;
    txt += `Los bots de Telegram no pueden listar todos los grupos automáticamente por limitaciones de la API.\n\n`;
    txt += `*📋 Información disponible:*\n`;
    txt += `• El bot está activo y funcionando\n`;
    txt += `• Responde a comandos en grupos donde está presente\n`;
    txt += `• Para ver grupos específicos, usa el bot en cada grupo\n\n`;
    txt += `*💡 Funciones disponibles:*\n`;
    txt += `• /ping - Verificar estado del bot\n`;
    txt += `• /menu - Ver comandos disponibles\n`;
    txt += `• /link - Información del grupo actual\n`;

    bot.sendMessage(m.chat, `*Lista de grupos del Bot* 👾\n\n*—◉ Estado:* Bot activo\n\n${txt}`.trim(), { reply_to_message_id: m.id });
  } catch (error) {
    console.error('Error in grouplist:', error);
    bot.sendMessage(m.chat, '❌ Error al obtener información de grupos.', { reply_to_message_id: m.id });
  }
};
handler.help = ['groups', 'grouplist'];
handler.tags = ['owner'];
handler.command = ['listgroup', 'gruposlista', 'grouplist', 'listagrupos']
handler.rowner = true;
handler.private = true

export default handler;

export async function before(m, { bot, isOwner, isROwner}) {
  // Solo se aplica a chats privados
  if (m.isGroup) return false;

  // Si no es el dueño ni root, bloquear
  if (!isOwner &&!isROwner) {
    try {
      await bot.updateBlockStatus(m.chat, 'block');
} catch (err) {
      console.error(`❌ Error al bloquear: ${err.message}`);
}
    return true; // evita que se procese el mensaje
}

  return false;
}
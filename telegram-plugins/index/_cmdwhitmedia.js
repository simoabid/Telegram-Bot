// Telegram version - simplified command with media handling
export async function all(m, { bot }) {
    try {
        // Check if message exists and has content
        if (!m || !m.text) return;

        // For Telegram, we'll handle sticker commands differently
        // Since Telegram doesn't have file hashes like WhatsApp

        // Initialize sticker database if not exists
        if (!global.db.data.sticker) {
            global.db.data.sticker = {};
        }

        // Check if message has a sticker and if it's in our database
        if (m.sticker && m.sticker.file_id) {
            const stickerId = m.sticker.file_id;

            if (stickerId in global.db.data.sticker) {
                const hash = global.db.data.sticker[stickerId];
                const { text, mentionedJid } = hash;

                // Send the associated text for this sticker
                await bot.sendMessage(m.chat, text, {
                    parse_mode: 'Markdown'
                });
            }
        }

        // Handle photo/document commands
        if ((m.photo || m.document) && m.caption) {
            // Process caption as potential command
            const caption = m.caption.trim();
            if (caption.startsWith('/') || caption.startsWith('.')) {
                // This could be a command with media
                console.log('Command with media detected:', caption);
            }
        }

    } catch (error) {
        console.error('Error in cmdwhitmedia:', error);
    }
}
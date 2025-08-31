let handler = async (m, { bot, text, isROwner, isOwner }) => {
    let fkontak = { 
        "key": { 
            "participants":"0", 
            "remoteJid": "status@broadcast", 
            "fromMe": false, 
            "id": "Halo" 
        }, 
        "message": { 
            "contactMessage": { 
                "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
            }
        }, 
        "participant": "0" 
    };

    if (text) {
        global.db.data.chats[m.chat].sWelcome = text;
        // **THIS IS THE KEY FIX:** Save the database after modification
        await global.db.write(); 
        bot.reply(m.chat, '_*LA BIENVENIDA DEL GRUPO HA SIDO CONFIGURADA*_', fkontak, m);
    } else {
        bot.reply(m.chat, `*_ESCRIBE EL MENSAJE DE BIENVENIDA_*\n*_OPCIONAL PUEDE USAR LO QUE ESTA CON "@" PARA AGREGAR MÁS INFORMACIÓN:_*\n\n*⚡ @user (Mención al usuario(a))*\n*⚡ @group (Nombre de grupo)*\n*⚡ @desc (Description de grupo)*\n\n*RECUERDE QUE LOS "@" SON OPCIONALES*`, m);
    }
};

handler.help = ['setwelcome @user + texto'];
handler.tags = ['group'];
handler.command = ['setwelcome', 'bienvenida']; 
handler.botAdmin = true;
handler.admin = true;
handler.group = true;

export default handler;

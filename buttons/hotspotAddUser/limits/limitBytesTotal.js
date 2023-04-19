module.exports = {
    async execute(bot, msg, button, userData, valButton) {
        bot.editMessageText(`Limit Bytes Total saat ini = ${userData.addUser.limitBytesTotal ? userData.addUser.limitBytesTotal : "TIdak ada"}\n\nSilahkan isi Limit Bytes Total nya\nContoh: 100M`, {
            message_id: msg.message_id,
            chat_id: msg.chat.id,
            reply_markup: {
                inline_keyboard: [
                    [{text: "Kosongkan isi", callback_data: "hotspotAddUser=limits:empty_limitBytesTotal"}],
                    [{text: "Batalkan", callback_data: "hotspotAddUser=limits:userInput"}],
                ]
            }
        })
        userData.userInput = "hotspotAddUser=limits=limitBytesTotal"
    }
}
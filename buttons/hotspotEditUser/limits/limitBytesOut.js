module.exports = {
    async execute(bot, msg, button, userData, valButton) {
        bot.editMessageText(`Limit Bytes Out saat ini = ${userData.editUser.limitBytesOut ? userData.editUser.limitBytesOut : "TIdak ada"}\n\nSilahkan isi Limit Bytes Out nya\nContoh: 100M`, {
            message_id: msg.message_id,
            chat_id: msg.chat.id,
            reply_markup: {
                inline_keyboard: [
                    [{text: "Kosongkan isi", callback_data: "hotspotEditUser=limits:empty_limitBytesOut"}],
                    [{text: "Batalkan", callback_data: "hotspotEditUser=limits:userInput"}],
                ]
            }
        })
        userData.userInput = "hotspotEditUser=limits=limitBytesOut"
    }
}
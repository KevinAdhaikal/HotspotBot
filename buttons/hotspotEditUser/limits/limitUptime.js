module.exports = {
    async execute(bot, msg, button, userData, valButton) {
        bot.editMessageText(`Limit Uptime saat ini = ${userData.editUser.limitUptime ? userData.editUser.limitUptime : "TIdak ada"}\n\nSilahkan isi Limit Uptime nya\nContoh: 1d 00:00:00`, {
            message_id: msg.message_id,
            chat_id: msg.chat.id,
            reply_markup: {
                inline_keyboard: [
                    [{text: "Kosongkan isi", callback_data: "hotspotEditUser=limits:empty_limitUptime"}],
                    [{text: "Batalkan", callback_data: "hotspotEditUser=limits:userInput"}],
                ]
            }
        })
        userData.userInput = "hotspotEditUser=limits=limitUptime"
    }
}
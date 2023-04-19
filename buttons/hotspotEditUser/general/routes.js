module.exports = {
    async execute(bot, msg, button, userData) {
        await bot.editMessageText(`Routes saat ini: ${userData.editUser.routes ? userData.editUser.routes : "Tidak ada"}\n\nSilahkan ketik Routes nya`, {
            chat_id: msg.chat.id,
            message_id: msg.message_id,
            reply_markup: {
                inline_keyboard: [
                    [{text: "Kosongkan isi", callback_data: "hotspotEditUser=general:empty_routes"}],
                    [{text: "Batalkan", callback_data: "hotspotEditUser=general:userInput"}],
                ]
            }
        })
        userData.userInput = "hotspotEditUser=general=routes"
    }
}
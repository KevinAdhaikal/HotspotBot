module.exports = {
    async execute(bot, msg, button, userData) {
        await bot.editMessageText(`Username saat ini: ${userData.editUser.username ? userData.editUser.username : "Tidak ada"}\n\nSilahkan ketik Username nya`, {
            chat_id: msg.chat.id,
            message_id: msg.message_id,
            reply_markup: {
                inline_keyboard: [
                    [{text: "Batalkan", callback_data: "hotspotEditUser=general:userInput"}],
                ]
            }
        })
        userData.userInput = "hotspotEditUser=general=username"
    }
}
module.exports = {
    async execute(bot, msg, button, userData) {
        await bot.editMessageText(`Username saat ini: ${userData.addUser.username ? userData.addUser.username : "Tidak ada"}\n\nSilahkan ketik Username nya`, {
            chat_id: msg.chat.id,
            message_id: msg.message_id,
            reply_markup: {
                inline_keyboard: [
                    [{text: "Batalkan", callback_data: "hotspotAddUser=general:userInput"}],
                ]
            }
        })
        userData.userInput = "hotspotAddUser=general=username"
    }
}
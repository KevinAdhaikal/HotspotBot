module.exports = {
    async execute(bot, msg, button, userData) {
        await bot.editMessageText(`Email saat ini: ${userData.addUser.email ? userData.addUser.email : "Tidak ada"}\n\nSilahkan ketik Email nya`, {
            chat_id: msg.chat.id,
            message_id: msg.message_id,
            reply_markup: {
                inline_keyboard: [
                    [{text: "Kosongkan isi", callback_data: "hotspotAddUser=general:empty_email"}],
                    [{text: "Batalkan", callback_data: "hotspotAddUser=general:userInput"}],
                ]
            }
        })
        userData.userInput = "hotspotAddUser=general=email"
    }
}
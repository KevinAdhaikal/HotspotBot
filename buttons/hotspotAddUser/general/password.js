module.exports = {
    async execute(bot, msg, button, userData) {
        await bot.editMessageText(`Password saat ini: ${userData.addUser.password ? userData.addUser.password : "Tidak ada"}\n\nSilahkan ketik Password nya`, {
            chat_id: msg.chat.id,
            message_id: msg.message_id,
            reply_markup: {
                inline_keyboard: [
                    [{text: "Kosongkan isi", callback_data: "hotspotAddUser=general:empty_password"}],
                    [{text: "Batalkan", callback_data: "hotspotAddUser=general:userInput"}],
                ]
            }
        })
        userData.userInput = "hotspotAddUser=general=password"
    }
}
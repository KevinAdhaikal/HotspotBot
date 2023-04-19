module.exports = {
    async execute(bot, msg, button, userData) {
        await bot.editMessageText(`Password saat ini: ${userData.editUser.password ? userData.editUser.password : "Tidak ada"}\n\nSilahkan ketik Password nya`, {
            chat_id: msg.chat.id,
            message_id: msg.message_id,
            reply_markup: {
                inline_keyboard: [
                    [{text: "Kosongkan isi", callback_data: "hotspotEditUser=general:empty_password"}],
                    [{text: "Batalkan", callback_data: "hotspotEditUser=general:userInput"}],
                ]
            }
        })
        userData.userInput = "hotspotEditUser=general=password"
    }
}
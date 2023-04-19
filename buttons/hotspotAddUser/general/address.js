module.exports = {
    async execute(bot, msg, button, userData) {
        await bot.editMessageText(`Address saat ini: ${userData.addUser.address ? userData.addUser.address : "Tidak ada"}\n\nSilahkan ketik Address nya`, {
            chat_id: msg.chat.id,
            message_id: msg.message_id,
            reply_markup: {
                inline_keyboard: [
                    [{text: "Kosongkan isi", callback_data: "hotspotAddUser=general:empty_address"}],
                    [{text: "Batalkan", callback_data: "hotspotAddUser=general:userInput"}],
                ]
            }
        })
        userData.userInput = "hotspotAddUser=general=address"
    }
}
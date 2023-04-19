module.exports = {
    async execute(bot, msg, button, userData) {
        await bot.editMessageText(`MAC Address saat ini: ${userData.editUser.macAddress ? userData.editUser.macAddress : "Tidak ada"}\n\nSilahkan ketik MAC Address nya`, {
            chat_id: msg.chat.id,
            message_id: msg.message_id,
            reply_markup: {
                inline_keyboard: [
                    [{text: "Kosongkan isi", callback_data: "hotspotEditUser=general:empty_macAddress"}],
                    [{text: "Batalkan", callback_data: "hotspotEditUser=general:userInput"}],
                ]
            }
        })
        userData.userInput = "hotspotEditUser=general=macAddress"
    }
}
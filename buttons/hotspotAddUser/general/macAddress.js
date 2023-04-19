module.exports = {
    async execute(bot, msg, button, userData) {
        await bot.editMessageText(`MAC Address saat ini: ${userData.addUser.macAddress ? userData.addUser.macAddress : "Tidak ada"}\n\nSilahkan ketik MAC Address nya`, {
            chat_id: msg.chat.id,
            message_id: msg.message_id,
            reply_markup: {
                inline_keyboard: [
                    [{text: "Kosongkan isi", callback_data: "hotspotAddUser=general:empty_macAddress"}],
                    [{text: "Batalkan", callback_data: "hotspotAddUser=general:userInput"}],
                ]
            }
        })
        userData.userInput = "hotspotAddUser=general=macAddress"
    }
}
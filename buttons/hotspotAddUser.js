module.exports = {
    async execute(bot, msg, button, userData) {
        if (!userData.addUser) userData.addUser = {}
        await bot.editMessageText("Kamu berada di Menu Tambah User", {
            chat_id: msg.chat.id,
            message_id: msg.message_id,
            reply_markup: {
                inline_keyboard: [
                    [{text: "General", callback_data: "hotspotAddUser=general"}],
                    [{text: "Limits", callback_data: "hotspotAddUser=limits"}],
                    [{text: "Terapkan dan Tambahkan", callback_data: "hotspotAddUser=applyAddUser"}],
                    [{text: "Kembali", callback_data: "hotspotUser:addUser"}]
                ]
            }
        })
    }
}
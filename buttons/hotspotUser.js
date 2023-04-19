module.exports = {
    async execute(bot, msg, button, userData, valButton) {
        if (valButton) delete userData[valButton]

        await bot.editMessageText("Kamu berada di Menu User", {
            chat_id: msg.chat.id,
            message_id: msg.message_id,
            reply_markup: {
                inline_keyboard: [
                    [{text: "Tambah User", callback_data: "hotspotAddUser"}],
                    [{text: "Edit User", callback_data: "hotspotEditUser"}],
                    [{text: "Kembali", callback_data: "hotspotMenu"}]
                ]
            }
        })
    }
}
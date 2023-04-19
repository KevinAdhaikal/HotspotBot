module.exports = {
    async execute(bot, msg, button, userData, valButton) {
        if (valButton) {
            if (valButton.includes("empty_")) userData.addUser[valButton.split("_")[1]] = ""
            userData.userInput = "";
        }

        await bot.editMessageText("Kamu berada di Menu Tambah User Limits", {
            chat_id: msg.chat.id,
            message_id: msg.message_id,
            reply_markup: {
                inline_keyboard: [
                    [{text: userData.addUser.limitUptime ? `Limit Uptime: ${userData.addUser.limitUptime}` : "Limit Uptime: Tidak ada", callback_data: "hotspotAddUser=limits=limitUptime"}],
                    [{text: userData.addUser.limitBytesIn ? `Limit Bytes In: ${userData.addUser.limitBytesIn}` : "Limit Bytes In: Tidak ada", callback_data: "hotspotAddUser=limits=limitBytesIn"}],
                    [{text: userData.addUser.limitBytesOut ? `Limit Bytes Out: ${userData.addUser.limitBytesOut}` : "Limit Bytes Out: Tidak ada", callback_data: "hotspotAddUser=limits=limitBytesOut"}],
                    [{text: userData.addUser.limitBytesTotal ? `Limit Bytes Total: ${userData.addUser.limitBytesTotal}` : "Limit Bytes Total: Tidak ada", callback_data: "hotspotAddUser=limits=limitBytesTotal"}],
                    [{text: "Kembali", callback_data: "hotspotAddUser"}]
                ]
            }
        })
    }
}
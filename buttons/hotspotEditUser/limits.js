module.exports = {
    async execute(bot, msg, button, userData, valButton) {
        if (valButton) {
            if (valButton.includes("empty_")) userData.editUser[valButton.split("_")[1]] = ""
            userData.userInput = "";
        }

        await bot.editMessageText(`Kamu berada di Menu Edit User: ${userData.editUser.username} (Limits)`, {
            chat_id: msg.chat.id,
            message_id: msg.message_id,
            reply_markup: {
                inline_keyboard: [
                    [{text: userData.editUser.limitUptime ? `Limit Uptime: ${userData.editUser.limitUptime}` : "Limit Uptime: Tidak ada", callback_data: "hotspotEditUser=limits=limitUptime"}],
                    [{text: userData.editUser.limitBytesIn ? `Limit Bytes In: ${userData.editUser.limitBytesIn}` : "Limit Bytes In: Tidak ada", callback_data: "hotspotEditUser=limits=limitBytesIn"}],
                    [{text: userData.editUser.limitBytesOut ? `Limit Bytes Out: ${userData.editUser.limitBytesOut}` : "Limit Bytes Out: Tidak ada", callback_data: "hotspotEditUser=limits=limitBytesOut"}],
                    [{text: userData.editUser.limitBytesTotal ? `Limit Bytes Total: ${userData.editUser.limitBytesTotal}` : "Limit Bytes Total: Tidak ada", callback_data: "hotspotEditUser=limits=limitBytesTotal"}],
                    [{text: "Kembali", callback_data: "hotspotEditUser:back"}]
                ]
            }
        })
    }
}
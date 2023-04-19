module.exports = {
    async execute(bot, msg, userData) {
        if (!/^(\d{1,}d(\s)?)?(2[0-3]|[0-1]?[\d]):[0-5][\d]:[0-5][\d]$/i.test(msg.text)) {
            userData.repeatInput = 1;
            return await bot.sendMessage(msg.chat.id, `Mohon input Limit Uptime yang benar, Silahkan Input lagi\nContoh: 1d 00:00:00`, {
                reply_markup: {
                    inline_keyboard: [
                        [{text: "Kosongkan isi", callback_data: "hotspotEditUser=limits:empty_limitUptime"}],
                        [{text: "Batalkan", callback_data: "hotspotEditUser=limits:userInput"}],
                    ]
                }
            })
        }
        userData.editUser.limitUptime = msg.text
        bot.sendMessage(msg.chat.id, `Limit Uptime telah di set ke ${msg.text}!\n\nKamu berada di Menu Tambah User Limits`, {
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
        userData.userInput = "";
    }
}
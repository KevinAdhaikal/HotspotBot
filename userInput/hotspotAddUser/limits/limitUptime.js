module.exports = {
    async execute(bot, msg, userData) {
        if (!/^(\d{1,}d(\s)?)?(2[0-3]|[0-1]?[\d]):[0-5][\d]:[0-5][\d]$/i.test(msg.text)) {
            userData.repeatInput = 1;
            return await bot.sendMessage(msg.chat.id, `Mohon input Limit Uptime yang benar, Silahkan Input lagi\nContoh: 1d 00:00:00`, {
                reply_markup: {
                    inline_keyboard: [
                        [{text: "Kosongkan isi", callback_data: "hotspotAddUser=limits:empty_limitUptime"}],
                        [{text: "Batalkan", callback_data: "hotspotAddUser=limits:userInput"}],
                    ]
                }
            })
        }
        userData.addUser.limitUptime = msg.text
        bot.sendMessage(msg.chat.id, `Limit Uptime telah di set ke ${msg.text}!\n\nKamu berada di Menu Tambah User Limits`, {
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
        userData.userInput = "";
    }
}
module.exports = {
    async execute(bot, msg, userData) {
        if (!/\d{1,}[gkm]$/i.test(msg.text)) {
            userData.repeatInput = 1;
            return await bot.sendMessage(msg.chat.id, `Mohon input Limit Bytes In yang benar, Silahkan Input lagi\nContoh: 100M`, {
                reply_markup: {
                    inline_keyboard: [
                        [{text: "Kosongkan isi", callback_data: "hotspotAddUser=limits:empty_limitBytesIn"}],
                        [{text: "Batalkan", callback_data: "hotspotAddUser=limits:userInput"}],
                    ]
                }
            })
        }
        userData.addUser.limitBytesIn = msg.text
        bot.sendMessage(msg.chat.id, `Limit Bytes In telah di set ke ${msg.text}!\n\nKamu berada di Menu Tambah User Limits`, {
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
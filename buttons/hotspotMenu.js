module.exports = {
    async execute(bot, msg) {
        await bot.editMessageText("Kamu berada di Menu Utama", {
            chat_id: msg.chat.id,
            message_id: msg.message_id,
            reply_markup: {
                inline_keyboard: [
                    [{text: "User", callback_data: "hotspotUser"}],
                    [{text: "Log out", callback_data: "logout"}]
                ]
            }
        })
    }
}
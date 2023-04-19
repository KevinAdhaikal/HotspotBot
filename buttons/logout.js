module.exports = {
    async execute(bot, msg, button, userData) {
        delete userData.ROSApi
        await bot.editMessageText("Anda telah logout dari Mikrotik", {
            chat_id: msg.chat.id,
            message_id: msg.message_id
        })
    }
}
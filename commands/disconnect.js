module.exports = {
    async execute(bot, msg, args, userData) {
        if (!userData.ROSApi) return await bot.sendMessage(msg.chat.id, "Anda belum terkoneksi ke Mikrotik")
        delete userData.ROSApi
        await bot.sendMessage(msg.chat.id, "Anda telah berahasil memutus koneksi dari Mikrotik")
    }
}
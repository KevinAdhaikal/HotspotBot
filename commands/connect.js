const ROSApi = require("node-routeros").RouterOSAPI;
const publicFunc = require("../publicFunc.js")
const fs = require("fs")

module.exports = {
    async execute(bot, msg, args, userData) {
        if (userData.ROSApi) return await bot.sendMessage(msg.chat.id, "Anda masih terkoneksi ke Mikrotik")
        if (!args[0] || !args[1]) {
            if (fs.existsSync(`userConfig/${msg.chat.id}.json`)) {
                var userConfig = JSON.parse(fs.readFileSync(`userConfig/${msg.chat.id}.json`))
                args[0] = userConfig.autoConnect.ipAddress
                args[1] = userConfig.autoConnect.username
                args[2] = userConfig.autoConnect.password ? userConfig.autoConnect.password : ""
            } else return await bot.sendMessage(msg.chat.id, "Argumen tidak valid! Perintah = /connect <IP Address Mikrotik> <Username Mikrotik> <Password Mikrotik (Isi jika password ada)>")
        }
        userData.ROSApi = new ROSApi({host: args[0], user: args[1], password: args[2] ? args[2] : ""})

        await bot.sendMessage(msg.chat.id, `Mengkoneksi ke Mikrotik dengan IP Mikrotik: ${args[0]}`)

        if (await publicFunc.sendMikrotik(bot, userData, msg.chat.id)) {
            if ((await publicFunc.sendMikrotik(bot, userData, msg.chat.id, "/ip/hotspot/print")).length) await bot.sendMessage(msg.chat.id, "Anda berhasil terkoneksi ke Mikrotik! Kamu berada di Menu", {
                reply_markup: {
                    inline_keyboard: [
                        [{text: "User", callback_data: "hotspotUser"}],
                        [{text: "Log out", callback_data: "logout"}]
                    ]
                }
            })
            else {
                await bot.sendMessage(msg.chat.id, "Anda berhasil terkoneksi ke Mikrotik, tetapi anda belum membuat Hotspot, buatlah Hotspot terlebih dahulu, baru anda bisa melakukan /connect")
                delete userData.ROSApi;
            }
        }
    }
}
const fs = require("fs")

module.exports = {
    async execute(bot, msg, args, userData) {
        if (args[0] === "autoconnect") {
            if (!args[1] || !args[2]) return await bot.sendMessage(msg.chat.id, "Perintah yang anda kirimkan ada yang salah, perintah sebenarnya: /set autoconnect <IP Address> <Username> <Password>")
            if (!fs.existsSync(`userConfig/${msg.chat.id}.json`)) {
                fs.writeFileSync(`userConfig/${msg.chat.id}.json`, JSON.stringify({
                    "autoConnect": {
                        "ipAddress": args[1],
                        "username": args[2],
                        "password": args[3] ? args[3] : ""
                    }
                }))
            }
            else {
                var userRead = JSON.parse(fs.readFileSync(`userConfig/${msg.chat.id}.json`))
                userRead.autoConnect.ipAddress = args[1]
                userRead.autoConnect.username = args[2]
                userRead.autoConnect.password = args[3] ? args[3] : ""

                fs.writeFileSync(`userConfig/${msg.chat.id}.json`, JSON.stringify(userRead))
            }

            await bot.sendMessage(msg.chat.id, "Autoconnect telah di set!")
        }
        else {
            await bot.sendMessage(msg.chat.id, `Perintah /set di bot ini adalah
            
/set autoconnect <IP Address> <Username> <Password> - Set user config autoconnect (Jadi, anda hanya ketik /connect, dan kamu langsung terkoneksi ke Mikrotik yang anda telah set)`)
        }
    }
}
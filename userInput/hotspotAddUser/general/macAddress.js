module.exports = {
    async execute(bot, msg, userData) {
        if (!/^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/.test(msg.text)) {
            userData.repeatInput = 1;
            return await bot.sendMessage(msg.chat.id, `Mohon input MAC Address yang benar, Silahkan Input lagi`, {
                reply_markup: {
                    inline_keyboard: [
                        [{text: "Kosongkan isi", callback_data: "hotspotAddUser=general:empty_macAddress"}],
                        [{text: "Batalkan", callback_data: "hotspotAddUser=general:userInput"}],
                    ]
                }
            })
        }

        userData.addUser.macAddress = msg.text
        await bot.sendMessage(msg.chat.id, `MAC Address telah di set ke ${msg.text}!\n\nKamu berada di Menu Tambah User General`, {
            reply_markup: {
                inline_keyboard: [
                    [{text: userData.addUser.server ? `Server: ${userData.addUser.server}` : "Server: all", callback_data: "hotspotAddUser=general=server"}],
                    [{text: userData.addUser.username ? `Username: ${userData.addUser.username}` : "Username: Tidak ada *", callback_data: "hotspotAddUser=general=username"}],
                    [{text: userData.addUser.password ? `Password: ${userData.addUser.password}`: "Password: Tidak ada", callback_data: "hotspotAddUser=general=password"}],
                    [{text: userData.addUser.address ? `Address: ${userData.addUser.address}` : "Address: Tidak ada", callback_data: "hotspotAddUser=general=address"}],
                    [{text: userData.addUser.macAddress ? `MAC Address: ${userData.addUser.macAddress}` : "MAC Address: Tidak ada", callback_data: "hotspotAddUser=general=macAddress"}],
                    [{text: userData.addUser.userProfile ? `User Profile: ${userData.addUser.userProfile}` : "User Profile: default", callback_data: "hotspotAddUser=general=userProfile"}],
                    [{text: userData.addUser.routes ? `Routes: ${userData.addUser.routes}` : "Routes: Tidak ada", callback_data: "hotspotAddUser=general=routes"}],
                    [{text: userData.addUser.email ? `Email: ${userData.addUser.email}` : "Email: Tidak ada", callback_data: "hotspotAddUser=general=email"}],
                    [{text: "Kembali", callback_data: "hotspotAddUser"}]
                ]
            }
        })
    }
}
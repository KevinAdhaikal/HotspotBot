const publicFunc = require("../../../publicFunc.js")

module.exports = {
    async execute(bot, msg, button, userData, valButton) {
        if (!userData.addUser.server) userData.addUser.server = "all";
        if (valButton) {
            if (valButton.includes("nextData")) {
                await bot.editMessageText(`Server saat ini = ${userData.addUser.server}`, {
                    chat_id: msg.chat.id,
                    message_id: msg.message_id,
                    ... await publicFunc.nextBackButton(bot, userData, "/ip/hotspot/print", valButton.slice(8), "hotspotAddUser=general=server", "hotspotAddUser=general", Number(valButton.slice(8).split("-")[0]) ? [{text: "all", callback_data: "hotspotAddUser=general=server:all"}] : "")
                })
            } else {
                userData.addUser.server = valButton
                await bot.editMessageText(`Server telah di set ke ${valButton}!\n\nKamu berada di Menu Tambah User General`, {
                    chat_id: msg.chat.id,
                    message_id: msg.message_id,
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
        else {
            await bot.editMessageText(`Server saat ini = ${userData.addUser.server}`, {
                chat_id: msg.chat.id,
                message_id: msg.message_id,
                ... await publicFunc.nextBackButton(bot, userData, "/ip/hotspot/print", "", "hotspotAddUser=general=server", "hotspotAddUser=general", [{text: "all", callback_data: "hotspotAddUser=general=server:all"}])
            })
        }
    }
}
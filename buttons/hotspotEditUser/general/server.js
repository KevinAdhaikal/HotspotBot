const publicFunc = require("../../../publicFunc.js")

module.exports = {
    async execute(bot, msg, button, userData, valButton) {
        if (!userData.editUser.server) userData.editUser.server = "all";
        if (valButton) {
            if (valButton.includes("nextData")) {
                await bot.editMessageText(`Server saat ini = ${userData.editUser.server}`, {
                    chat_id: msg.chat.id,
                    message_id: msg.message_id,
                    ... await publicFunc.nextBackButton(bot, userData, "/ip/hotspot/print", valButton.slice(8), "hotspotEditUser=general=server", "hotspotEditUser=general", Number(valButton.slice(8).split("-")[0]) ? [{text: "all", callback_data: "hotspotEditUser=general=server:all"}] : "")
                })
            } else {
                userData.editUser.server = valButton
                await bot.editMessageText(`Server telah di set ke ${valButton}!\n\nKamu berada di Menu Tambah User General`, {
                    chat_id: msg.chat.id,
                    message_id: msg.message_id,
                    reply_markup: {
                        inline_keyboard: [
                            [{text: userData.editUser.server ? `Server: ${userData.editUser.server}` : "Server: all", callback_data: "hotspotEditUser=general=server"}],
                            [{text: userData.editUser.username ? `Username: ${userData.editUser.username}` : "Username: Tidak ada *", callback_data: "hotspotEditUser=general=username"}],
                            [{text: userData.editUser.password ? `Password: ${userData.editUser.password}`: "Password: Tidak ada", callback_data: "hotspotEditUser=general=password"}],
                            [{text: userData.editUser.address ? `Address: ${userData.editUser.address}` : "Address: Tidak ada", callback_data: "hotspotEditUser=general=address"}],
                            [{text: userData.editUser.macAddress ? `MAC Address: ${userData.editUser.macAddress}` : "MAC Address: Tidak ada", callback_data: "hotspotEditUser=general=macAddress"}],
                            [{text: userData.editUser.userProfile ? `User Profile: ${userData.editUser.userProfile}` : "User Profile: default", callback_data: "hotspotEditUser=general=userProfile"}],
                            [{text: userData.editUser.routes ? `Routes: ${userData.editUser.routes}` : "Routes: Tidak ada", callback_data: "hotspotEditUser=general=routes"}],
                            [{text: userData.editUser.email ? `Email: ${userData.editUser.email}` : "Email: Tidak ada", callback_data: "hotspotEditUser=general=email"}],
                            [{text: "Kembali", callback_data: "hotspotEditUser:back"}]
                        ]
                    }
                })
            }
        }
        else {
            await bot.editMessageText(`Server saat ini = ${userData.editUser.server}`, {
                chat_id: msg.chat.id,
                message_id: msg.message_id,
                ... await publicFunc.nextBackButton(bot, userData, "/ip/hotspot/print", "", "hotspotEditUser=general=server", "hotspotEditUser=general", [{text: "all", callback_data: "hotspotEditUser=general=server:all"}])
            })
        }
    }
}
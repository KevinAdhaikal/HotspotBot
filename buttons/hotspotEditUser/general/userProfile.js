const publicFunc = require("../../../publicFunc.js")

module.exports = {
    async execute(bot, msg, button, userData, valButton) {
        if (!userData.editUser.userProfile) userData.editUser.userProfile = (await publicFunc.sendMikrotik(bot, userData, msg.chat.id, "/ip/hotspot/user/profile/print"))[0].name
        if (valButton) {
            if (valButton.includes("nextData")) {
                await bot.editMessageText(`User Profile saat ini = ${userData.editUser.userProfile ? userData.editUser.userProfile : await publicFunc.sendMikrotik(bot, userData, msg.chat.id, "/ip/hotspot/user/profile/print")[0].name}`, {
                    chat_id: msg.chat.id,
                    message_id: msg.message_id,
                    ... await publicFunc.nextBackButton(bot, userData, "/ip/hotspot/user/profile/print", valButton.slice(8), "hotspotEditUser=general=userProfile", "hotspotEditUser=general")
                })
            } else {
                userData.editUser.userProfile = valButton
                await bot.editMessageText(`User Profile telah di set ke ${valButton}!\n\nKamu berada di Menu Tambah User General`, {
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
            await bot.editMessageText(`User Profile saat ini = ${userData.editUser.userProfile}`, {
                chat_id: msg.chat.id,
                message_id: msg.message_id,
                ... await publicFunc.nextBackButton(bot, userData, "/ip/hotspot/user/profile/print", "", "hotspotEditUser=general=userProfile", "hotspotEditUser=general")
            })
        }
    }    
}
const publicFunc = require("../publicFunc")

module.exports = {
    async execute(bot, msg, button, userData, valButton) {
        if (valButton) {
            if (!userData.editUser || !userData.editUser.username) {
                userData.editUser = {}
                var temp = await publicFunc.sendMikrotik(bot, userData, msg.chat.id, "/ip/hotspot/user/print")
                for (let a = 0; a < temp.length; a++) {
                    if (temp[a].name === valButton) {
                        userData.editUser.id = temp[a][".id"]
                        userData.editUser.server = temp[a].server
                        userData.editUser.username = temp[a].name
                        userData.editUser.password = temp[a].password ? temp[a].password : ""
                        userData.editUser.userProfile = temp[a].profile ? temp[a].profile : ""
                        userData.editUser.routes = temp[a].routes ? temp[a].routes : ""
                        userData.editUser.email = temp[a].email ? temp[a].email : ""
                        userData.editUser.limitUptime = temp[a]["limit-uptime"] ? await publicFunc.toDays(temp[a]["limit-uptime"]) : "";
                        userData.editUser.limitBytesIn = temp[a]["limit-bytes-in"] ? await publicFunc.toByte(temp[a]["limit-bytes-in"]) : ""
                        userData.editUser.limitBytesOut = temp[a]["limit-bytes-out"] ? await publicFunc.toByte(temp[a]["limit-bytes-out"]) : ""
                        userData.editUser.limitBytesTotal = temp[a]["limit-bytes-total"] ? await publicFunc.toByte(temp[a]["limit-bytes-total"]) : ""
                        userData.editUser.disabled = temp[a].disabled === "false" ? false : true

                        break;
                    }
                }
            }
            else {
                if (valButton === "disableUser") userData.editUser.disabled ? userData.editUser.disabled = false : userData.editUser.disabled = true;
            }
            await bot.editMessageText(`Kamu berada di Menu Edit User: ${userData.editUser.username}`, {
                chat_id: msg.chat.id,
                message_id: msg.message_id,
                reply_markup: {
                    inline_keyboard: [
                        [{text: "General", callback_data: "hotspotEditUser=general"}],
                        [{text: "Limits", callback_data: "hotspotEditUser=limits"}],
                        [{text: `Nonaktif akun: ${userData.editUser.disabled ? "Nyala" : "Mati"}`, callback_data: "hotspotEditUser:disableUser"}],
                        [{text: "Terapkan", callback_data: "hotspotEditUser=applyEditUser"}],
                        [{text: "Hapus User", callback_data: "hotspotEditUser=deleteUser"}],
                        [{text: "Kembali", callback_data: "hotspotEditUser"}]
                    ]
                }
            })
        }
        else {
            if (userData.editUser) delete userData.editUser
            await bot.editMessageText("Kamu berada di Menu Edit User", {
                chat_id: msg.chat.id,
                message_id: msg.message_id,
                ... await publicFunc.nextBackButton(bot, userData, "/ip/hotspot/user/print", "", "hotspotEditUser", "hotspotUser")
            })
        }
        
    }
}
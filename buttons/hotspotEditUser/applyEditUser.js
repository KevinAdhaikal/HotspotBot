const publicFunc = require("../../publicFunc")

module.exports = {
    async execute(bot, msg, button, userData, valButton) {
        var tempArray = []
        
        userData.editUser.id ? tempArray[tempArray.length] = `=.id=${userData.editUser.id}` : ""
        userData.editUser.address ? tempArray[tempArray.length] = `=address=${userData.editUser.address}` : ""
        userData.editUser.email ? tempArray[tempArray.length] = `=email=${userData.editUser.email}` : ""
        userData.editUser.macAddress ? tempArray[tempArray.length] = `=mac-address=${userData.editUser.macAddress}` : ""
        userData.editUser.password ? tempArray[tempArray.length] = `=password=${userData.editUser.password}` : ""
        userData.editUser.routes ? tempArray[tempArray.length] = `=routes=${userData.editUser.routes}` : ""
        userData.editUser.server ? tempArray[tempArray.length] = `=server=${userData.editUser.server}` : ""
        userData.editUser.username ? tempArray[tempArray.length] = `=name=${userData.editUser.username}` : ""
        userData.editUser.userProfile ? tempArray[tempArray.length] = `=profile=${userData.editUser.userProfile}` : ""
        userData.editUser.limitBytesIn ? tempArray[tempArray.length] = `=limit-bytes-in=${userData.editUser.limitBytesIn}` : ""
        userData.editUser.limitBytesOut ? tempArray[tempArray.length] = `=limit-bytes-out=${userData.editUser.limitBytesOut}` : ""
        userData.editUser.limitBytesTotal ? tempArray[tempArray.length] = `=limit-bytes-total=${userData.editUser.limitBytesTotal}` : ""
        userData.editUser.limitUptime ? tempArray[tempArray.length] = `=limit-uptime=${userData.editUser.limitUptime}` : ""
        userData.editUser.disabled ? tempArray[tempArray.length] = `=disabled=${userData.editUser.disabled ? "true" : "false"}` : ""

        try {
            await publicFunc.sendMikrotikValue(bot, userData, msg.chat.id, "/ip/hotspot/user/set", tempArray)
            await bot.editMessageText(`Akun bernama ${userData.editUser.username} berhasil diedit!\n\nKamu berada di Menu User`, {
                chat_id: msg.chat.id,
                message_id: msg.message_id,
                reply_markup: {
                    inline_keyboard: [
                        [{text: "Tambah User", callback_data: "hotspotAddUser"}],
                        [{text: "Edit User", callback_data: "hotspotEditUser"}],
                        [{text: "Kembali", callback_data: "hotspotMenu"}]
                    ]
                }
            })
        } catch(e) {
            delete tempArray
            return await bot.editMessageText(`${e.message}\n\nKamu berada di Menu Edit User: ${userData.editUser.username}`, {
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
        
        delete userData.editUser
        delete tempArray
    }
}
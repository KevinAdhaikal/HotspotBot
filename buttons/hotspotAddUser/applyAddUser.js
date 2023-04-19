const publicFunc = require("../../publicFunc")

module.exports = {
    async execute(bot, msg, button, userData, valButton) {
        if (!userData.addUser.username) return await bot.editMessageText("Mohon isi yang tidak ada bacaan '(Opsi)'", {
            message_id: msg.message_id,
            chat_id: msg.chat.id,
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

        if (!userData.addUser.userProfile) userData.addUser.userProfile = (await publicFunc.sendMikrotik(bot, userData, msg.chat.id, "/ip/hotspot/user/profile/print"))[0].name
        if (!userData.addUser.server) userData.addUser.server = "all"

        var tempArray = []
        
        userData.addUser.address ? tempArray[tempArray.length] = `=address=${userData.addUser.address}` : "";
        userData.addUser.email ? tempArray[tempArray.length] = `=email=${userData.addUser.email}` : ""
        userData.addUser.macAddress ? tempArray[tempArray.length] = `=mac-address=${userData.addUser.macAddress}` : ""
        userData.addUser.password ? tempArray[tempArray.length] = `=password=${userData.addUser.password}` : ""
        userData.addUser.routes ? tempArray[tempArray.length] = `=routes=${userData.addUser.routes}` : ""
        userData.addUser.server ? tempArray[tempArray.length] = `=server=${userData.addUser.server}` : ""
        userData.addUser.username ? tempArray[tempArray.length] = `=name=${userData.addUser.username}` : ""
        userData.addUser.userProfile ? tempArray[tempArray.length] = `=profile=${userData.addUser.userProfile}` : ""
        userData.addUser.limitBytesIn ? tempArray[tempArray.length] = `=limit-bytes-in=${userData.addUser.limitBytesIn}` : ""
        userData.addUser.limitBytesOut ? tempArray[tempArray.length] = `=limit-bytes-out=${userData.addUser.limitBytesOut}` : ""
        userData.addUser.limitBytesTotal ? tempArray[tempArray.length] = `=limit-bytes-total=${userData.addUser.limitBytesTotal}` : ""
        userData.addUser.limitUptime ? tempArray[tempArray.length] = `=limit-uptime=${userData.addUser.limitUptime}` : ""

        try {
            await publicFunc.sendMikrotikValue(bot, userData, msg.chat.id, "/ip/hotspot/user/add", tempArray)
            await bot.editMessageText(`Akun bernama ${userData.addUser.username} berhasil dibuat!\n\nKamu berada di Menu User`, {
                chat_id: msg.chat.id,
                message_id: msg.message_id,
                reply_markup: {
                    inline_keyboard: [
                        [{text: "Tambah User", callback_data: "hotspotAddUser"}],
                        [{text: "Kembali", callback_data: "hotspotMenu"}]
                    ]
                }
            })
        } catch(e) {
            delete tempArray;
            return await bot.editMessageText(`${e.message}\n\nKamu berada di Menu Tambah User`, {
                chat_id: msg.chat.id,
                message_id: msg.message_id,
                reply_markup: {
                    inline_keyboard: [
                        [{text: "General", callback_data: "hotspotAddUser=general"}],
                        [{text: "Limits", callback_data: "hotspotAddUser=limits"}],
                        [{text: "Terapkan dan Tambahkan", callback_data: "hotspotAddUser=applyAddUser"}],
                        [{text: "Kembali", callback_data: "hotspotUser:addUser"}]
                    ]
                }
            })
        }
        
        delete userData.addUser
        delete tempArray
    }
}
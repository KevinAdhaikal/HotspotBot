module.exports = {
    async execute(bot, msg, button, userData, valButton) {
        if (valButton) {
            if (valButton.includes("empty_")) userData.editUser[valButton.split("_")[1]] = ""
            userData.userInput = "";
        }

        await bot.editMessageText(`Kamu berada di Menu Edit User: ${userData.editUser.username} (General)`, {
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
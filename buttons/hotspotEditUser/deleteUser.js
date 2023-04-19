const publicFunc = require("../../publicFunc")

module.exports = {
    async execute(bot, msg, button, userData, valButton) {
        if (valButton === "yes") {
            try {
                await publicFunc.sendMikrotikValue(bot, userData, msg.chat.id, "/ip/hotspot/user/remove", [`=.id=${userData.editUser.id}`])
                
                await bot.editMessageText(`User bernama ${userData.editUser.username} berhasil di hapus\n\nKamu berada di Menu Edit User`, {
                    chat_id: msg.chat.id,
                    message_id: msg.message_id,
                    ... await publicFunc.nextBackButton(bot, userData, "/ip/hotspot/user/print", "", "hotspotEditUser", "hotspotUser")
                })

                return delete userData.editUser
            } catch(e) {
                return await bot.editMessageText(`User bernama${userData.editUser.username} tidak bisa dihapus\n\nKamu berada di Menu Edit User: ${userData.editUser.username}`, {
                    message_id: msg.message_id,
                    chat_id: msg.chat.id,
                    reply_markup: {
                        inline_keyboard: [
                            [{text: "General", callback_data: "hotspotEditUser=general"}],
                            [{text: "Limits", callback_data: "hotspotEditUser=limits"}],
                            [{text: "Terapkan", callback_data: "hotspotEditUser=applyAddUser"}],
                            [{text: "Hapus User", callback_data: "hotspotEditUser=deleteUser"}],
                            [{text: "Kembali", callback_data: "hotspotEditUser"}]
                        ]
                    }
                })
            }

        } else {
            await bot.editMessageText(`Apakah kamu yakin untuk mendelete user bernama: ${userData.editUser.username}`, {
                message_id: msg.message_id,
                chat_id: msg.chat.id,
                reply_markup: {
                    inline_keyboard: [
                        [{text: "Iya", callback_data: "hotspotEditUser=deleteUser:yes"}],
                        [{text: "Tidak", callback_data: "hotspotEditUser:back"}],
                    ]
                }
            })
        }
    }
}
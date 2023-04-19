const publicFunc = require("../publicFunc")

module.exports = {
    async execute(bot, msg, args, userData) {
        console.log(await publicFunc.sendMikrotikValue(bot, userData, msg.chat.id, "/ip/hotspot/user/add", ["=name=hello world"]))
    }
}
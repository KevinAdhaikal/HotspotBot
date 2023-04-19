const fs = require("fs");
const telegram = require("node-telegram-bot-api");
const ROSApi = require("node-routeros").RouterOSAPI;
const config = require("./config.json");

const bot = new telegram(config.token, {polling: true});
bot.getUpdates({offset: -1})

var teleUser = {};

bot.on("callback_query", async cb => {
    var msg = cb.message;
    var button = cb.data;

    if (!teleUser[msg.chat.id] || !teleUser[msg.chat.id].ROSApi) return await bot.editMessageText("Mohon login ke Mikrotik terlebih dahulu", {
        chat_id: msg.chat.id,
        message_id: msg.message_id
    })

    button = button.replaceAll("=", "/")
    var valButton = button.indexOf(":") != -1 ? button.slice(button.indexOf(":") + 1) : ""
    button = button.indexOf(":") != -1 ? button.slice(0, button.indexOf(":")) : button

    try {
        await require(`./buttons/${button}.js`).execute(bot, msg, button, teleUser[msg.chat.id], valButton)
        delete require.cache[require.resolve(`./buttons/${button}.js`)];
    } catch(e) {
        if (e) {
            console.log(e)
            await bot.editMessageText("Ada yang salah dari bot ini, mohon liat ke konsol", {
                chat_id: msg.chat.id,
                message_id: msg.message_id
            })
        }
        else {
            await bot.editMessageText("Button tidak ditemukan", {
                chat_id: msg.chat.id,
                message_id: msg.message_id
            })
        }
    }
})

bot.on("message", async msg => {
    if (!msg.text) return;
    if (!teleUser[msg.chat.id]) teleUser[msg.chat.id] = {};

    if (teleUser[msg.chat.id].userInput) {
        try {
            teleUser[msg.chat.id].userInput = teleUser[msg.chat.id].userInput.replaceAll("=", "/")
            await require(`./userInput/${teleUser[msg.chat.id].userInput}.js`).execute(bot, msg, teleUser[msg.chat.id]);
            //delete require.cache[require.resolve(`./userInput/${teleUser[msg.chat.id].userInput}.js`)];

            if (!teleUser[msg.chat.id].repeatInput) {
                teleUser[msg.chat.id].userInput = "";
                teleUser[msg.chat.id].repeatInput = 0;
            }
        } catch(e) {
            console.log(e)
            await bot.sendMessage(msg.chat.id, "Ada yang salah di bot ini, mohon lihat ke konsol")
        }
    }

    if (!msg.text.startsWith("/")) return
    const args = msg.text.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        await require(`./commands/${command}.js`).execute(bot, msg, args, teleUser[msg.chat.id]);
        delete require.cache[require.resolve(`./commands/${command}.js`)];
    } catch(e) {
        await bot.sendMessage(msg.chat.id, "Perintah tidak ditemukan, mohon ketik /help untuk mendapatkan Perintah lengkap dari bot ini")
    }
})
module.exports = {
    async execute(bot, msg) {
        await bot.sendMessage(msg.chat.id, `Perintah di bot ini adalah
/help - Menampilkan semua perintah di bot ini
/connect <IP Address Mikrotik> <Username Mikrotik> <Password Mikrotik (Isi jika password ada)> - koneksi ke Mikrotik
/disconnect - memutus koneksi dari Mikrotik
/set - Set user config`);
    }
}
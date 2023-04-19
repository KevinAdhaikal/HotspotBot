module.exports = {
    async toByte(number) {
        var zerolen = 0;
        for (let a = number.length - 1; a > -1; a--) {
            if (number[a] != '0') break;
            else zerolen++;
        };
        
        if (zerolen > 2) {
            if (zerolen > 5) {
                if (zerolen > 8) return number.slice(0, zerolen - 8) + 'G';
                else return number.slice(0, zerolen - 5) + 'M';
            }
            else return number.slice(0, zerolen - 2) + 'K';
        }

        return number;
    },
    async zeroPad(nr,base){
        var  len = (String(base).length - String(nr).length)+1;
        return len > 0? new Array(len).join('0')+nr : nr;
    },
    async toDays(day) {
        var result = "";

        if (day.includes('w'))result = Number(day.slice(0, day.indexOf('w'))) * 7 + 'd '
        if (day.includes('d')) result = Number(result.slice(0, -2)) + Number(day.slice(day.includes('w') ? day.indexOf('w') + 1: 0, day.indexOf('d'))) + 'd '

        if (day.includes('h')) result += await this.zeroPad(day.slice(!isNaN(day.slice(day.indexOf('h') - 2, day.indexOf('h'))) && day.slice(day.indexOf('h') - 2, day.indexOf('h')).length ? day.indexOf('h') - 2 : day.indexOf('h') - 1, day.indexOf('h')), 10) + ":"
        else result += "00:"

        if (day.includes('m')) result += await this.zeroPad(day.slice(!isNaN(day.slice(day.indexOf('m') - 2, day.indexOf('m'))) && day.slice(day.indexOf('m') - 2, day.indexOf('m')).length ? day.indexOf('m') - 2 : day.indexOf('m') - 1, day.indexOf('m')), 10) + ":"
        else result += "00:"

        if (day.includes('s')) result += await this.zeroPad(day.slice(!isNaN(day.slice(day.indexOf('s') - 2, day.indexOf('s'))) && day.slice(day.indexOf('s') - 2, day.indexOf('s')).length ? day.indexOf('s') - 2 : day.indexOf('s') - 1, day.indexOf('s')), 10)
        else result += "00"

        return result;
    },
    async sendMikrotik(bot, userData, id, command) {
        var a = await userData.ROSApi.connect().catch(async err => {
            if (err.errno === "SOCKTMOUT") await bot.sendMessage(id, "Tidak bisa koneksi ke Mikrotik karena Timeout, mohon cek Mikrotik anda terlebih dahulu")
            else if (err.errno === "CANTLOGIN") await bot.sendMessage(id, "Tidak bisa koneksi ke Mikrotik karena user dan password anda salah, mohon masukan user dan password yang benar")
            else await bot.sendMessage(id, "Tidak bisa terkoneksi ke Mikrotik karena masalah tidak diketahui, mohon diulang beberapa saat")
            delete userData.ROSApi
    
            return 0;
        })
    
        if (!a) return 0;
        
        if (!command) {
            await userData.ROSApi.close()
            return 1;
        }
        else {
            try {
                var temp = await userData.ROSApi.write(command ? command : "")
                await userData.ROSApi.close()
                return temp;
            } catch(e) {
                return e;
            }
            
        }
    },
    async sendMikrotikValue(bot, userData, id, command, value) {
        var a = await userData.ROSApi.connect().catch(async err => {
            if (err.errno === "SOCKTMOUT") await bot.sendMessage(id, "Tidak bisa koneksi ke Mikrotik karena Timeout, mohon cek Mikrotik anda terlebih dahulu")
            else if (err.errno === "CANTLOGIN") await bot.sendMessage(id, "Tidak bisa koneksi ke Mikrotik karena user dan password anda salah, mohon masukan user dan password yang benar")
            else await bot.sendMessage(id, "Tidak bisa terkoneksi ke Mikrotik karena masalah tidak diketahui, mohon diulang beberapa saat")
            delete userData.ROSApi
    
            return 0;
            
        })
    
        if (!a) return 0;

        try {
            var temp = await userData.ROSApi.write(command, value)
            await userData.ROSApi.close()
            return temp;
        } catch(e) {
            await userData.ROSApi.close()
            throw e;
        }
    },
    async nextBackButton(bot, userData, command, loopTo, gotoPage, backPage, additionalButtonFirst) {
        var temp = await this.sendMikrotik(bot, userData, null, command)
        var result = {reply_markup: {inline_keyboard: []}}
        var currentLoop = 0;
        
        if (!loopTo) {
            loopTo = []
            loopTo[0] = 0;
            if (temp.length > 9) loopTo[1] = 10;
            else loopTo[1] = temp.length
        }
        else {
            loopTo = loopTo.split("-")
            loopTo[0] = Number(loopTo[0])
            loopTo[1] = Number(loopTo[1])
        }

        if (additionalButtonFirst) result["reply_markup"]["inline_keyboard"][currentLoop++] = additionalButtonFirst

        for (let a = loopTo[0]; a < loopTo[1]; a++) {
            result["reply_markup"]["inline_keyboard"][currentLoop++] = [{text: temp[a].name, callback_data: `${gotoPage}:${temp[a].name}`}]
        }

        if (currentLoop > 9) result["reply_markup"]["inline_keyboard"][currentLoop++] = [{text: `>> Next (${loopTo[1] + 1} ${((temp.length - (loopTo[1])) > 9 ? "- " + (loopTo[1] + 10) : "- " + temp.length)})`, callback_data: `${gotoPage}:nextData${loopTo[1]}-${((temp.length - (loopTo[1])) > 9 ? (loopTo[1] + 10) : temp.length)}`}]
        if (loopTo[0] > 9) result["reply_markup"]["inline_keyboard"][currentLoop++] = [{text: `<< Back (${loopTo[0] - 9} - ${loopTo[0]})`, callback_data: `${gotoPage}:nextData${loopTo[0] - 10}-${loopTo[0]}`}]

        result["reply_markup"]["inline_keyboard"][currentLoop++] = [{text: "Kembali", callback_data: backPage}]
        
        delete temp
        return result;
    }
}
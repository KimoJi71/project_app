const crypto = require('crypto')

const encrypt = (text) => {

    const md5 = crypto.createHash('md5') //MD5方式加密

    const end_paw= md5.update(text).digest('hex') //加密後的密碼

    return {
        end_paw
    }
}

module.exports = {
    encrypt
}
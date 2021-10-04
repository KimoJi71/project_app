const multer = require('multer')

// create storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname)
    }
})

//upload image function
const uploadImg = multer({
    storage: storage
})

module.exports = {
    uploadImg
}
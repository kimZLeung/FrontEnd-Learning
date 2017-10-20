var multer = require('multer')
var path = require('path')
var md5 = require('md5')

var storage = multer.diskStorage({
    /**
     * destination表明收到的文件的存放地址
     * 可以直接在multer创建的时候这样
     *
     * multer({
     *   dest: path.join(__dirname, 'image')
     * })
     */
    destination: path.join(__dirname, 'static/image'),
    /**
     * 文件命名
     */
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".")
        cb(null, file.fieldname + '.' + md5('value') + '.' + fileFormat[fileFormat.length - 1])
    }
})


var upload = multer({
    storage: storage
})

module.exports = upload;
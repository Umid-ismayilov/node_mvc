const multer = require("multer");
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'storage/uploads');
    },
    filename: function (req, file, cb) {
        console.log(file,'uploads-u');
        cb(null , file.originalname );
    }
});

const upload = multer({ storage: storage })

module.exports = {
    upload:upload
}

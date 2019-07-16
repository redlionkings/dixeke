const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const type = "";
        if(file.mimetype === "application/octet-stream") type = ".jpg"
        cb(null, Date.now() +  file.originalname   + type)
    }
  })
   
  const upload = multer({ storage })

  module.exports = upload;
const auth = require("../middleware/auth")
module.exports = app => {
    const Img_BinhLuan = require("../controller/img_BinhLuan.controller")
    var router = require("express").Router();
    const multer = require("multer");
    const upload =  multer({dest:"uploads/"});
    router.post("/create/idBinhluan",upload.single("file"), Img_BinhLuan.create);
    app.use('/api/img_binhluan', router);
}
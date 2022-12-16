const auth = require("../middleware/auth")
module.exports = app => {
    const multer = require("multer");
    const upload =  multer({dest:"uploads/"});
    const BinhLuan = require("../controller/BinhLuan.controller")
    var router = require("express").Router();
    router.post("/create/idBaiDang/:idBaiDang",auth.authByToken,upload.array("file"), BinhLuan.create);
    router.put("/update/idBinhLuan/:id",auth.authByToken, BinhLuan.update);
    router.put("/delete/idBinhLuan/:id",auth.authByToken, BinhLuan.softDelete);
    router.get("/findAll" , BinhLuan.getAll);
    app.use('/api/binhluan', router);
}
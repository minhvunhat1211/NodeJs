const auth = require("../middleware/auth")
module.exports = app => {
    const multer = require("multer");
    const upload =  multer({dest:"uploads/"});
    const BaiDang = require("../controller/BaiDang.controller")
    var router = require("express").Router();
    router.post("/create/idChuDe/:idChuDe",auth.authByToken,upload.array("file"), BaiDang.create);
    router.put("/update/idBaiDang/:id",auth.authByToken, BaiDang.update);
    router.put("/delete/idBaiDang/:id",auth.authByToken, BaiDang.softDelete);
    router.get("/findAll" ,auth.authByToken, BaiDang.getAll);
    app.use('/api/baidang', router);
}
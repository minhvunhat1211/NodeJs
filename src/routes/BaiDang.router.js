const auth = require("../middleware/auth")
module.exports = app => {
    const BaiDang = require("../controller/BaiDang.controller")
    var router = require("express").Router();
    router.post("/create/idChuDe/:idChuDe", BaiDang.create);
    router.put("/update/idBaiDang/:id", BaiDang.update);
    router.put("/delete/idBaiDang/:id", BaiDang.softDelete);
    router.get("/findAll" , BaiDang.getAll);
    app.use('/api/baidang', router);
}
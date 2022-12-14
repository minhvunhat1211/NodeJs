const auth = require("../middleware/auth")
module.exports = app => {
    const BaoCao = require("../controller/BaoCao.controller");
    var router = require("express").Router();
    router.post("/create",auth.authByToken, BaoCao.create);
    router.put("/delete/idBaoCao/:id",auth.authByToken, BaoCao.softDelete);
    router.get("/findAll",auth.authByToken, BaoCao.getAll);
    app.use('/api/baocao', router);
  };
const auth = require("../middleware/auth")
module.exports = app => {
    const multer = require("multer");
    const upload =  multer({dest:"uploads/"});
    const TaiKhoan = require("../controller/TaiKhoan.controller");
    var router = require("express").Router();
    router.post("/register", TaiKhoan.create);
    router.post("/login", TaiKhoan.login);
    router.get("/get-user",auth.authByToken, TaiKhoan.getUserByUsername);
    router.get("/get-user-2/TenDangNhap/:TenDangNhap",auth.authByToken, TaiKhoan.getUserByUsername2);
    router.put("/change-profile", auth.authByToken, upload.array("file"), TaiKhoan.changeProfile);
    app.use('/api/account', router);
  };
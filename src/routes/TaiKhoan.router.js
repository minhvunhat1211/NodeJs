module.exports = app => {
    const TaiKhoan = require("../controller/TaiKhoan.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/register", TaiKhoan.create);
    router.post("/login", TaiKhoan.login);
    app.use('/api/account', router);
  };
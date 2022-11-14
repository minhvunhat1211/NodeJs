const auth = require("../middleware/auth")
module.exports = app => {
    const ChuDe = require("../controller/ChuDe.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/create",auth.authByToken , ChuDe.create);
    router.get("/getAll",auth.authByToken , ChuDe.getAll);
    router.put("/update/:id",auth.authByToken , ChuDe.update);
    router.put("/delete/:id",auth.authByToken , ChuDe.softDelete);
    // router.post("/create", auth , (req, res) => {
    //     ChuDe.create
    //   });
    
    app.use('/api/chude', router);
  };
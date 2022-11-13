const db = require("../models");
const TaiKhoan = db.TaiKhoans;
// const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs")
const {matchPassword} = require('../utils/password')
const {sign,decode} = require('../utils/JWT')
exports.create = (req, res) => {
  // hash password
  let salt = bcrypt.genSaltSync(10)
  const hashPass = bcrypt.hashSync(req.body.MatKhau, salt);
  // Validate request
  if (!req.body.TenDangNhap) {
    res.status(400).send({
      message: "Tên đăng nhập không được để trống!"
    });
    
    return;
  }
  if (!req.body.MatKhau) {
    res.status(400).send({
      message: "Mật khẩu không được để trống!"
    });
    return;
  }
  // Save Tutorial in the database
  TaiKhoan.findOrCreate({
    where: { TenDangNhap: req.body.TenDangNhap },
    defaults: {
        TenDangNhap: req.body.TenDangNhap,
        MatKhau: hashPass,
        TenHienThi: "Unknown",
        Avatar: "NULL",
        Role: "0",
        SoLuongBaiDang: 0,
      }
  })
    .then(data => {
    //   res.send(data);
        const [ object, created ] = data;
        if (created === false) {
            res.json({ 
                isCreated: created,
                message: "Tài khoản đã tồn tại!"
                
            })
        } else {
            res.json({ 
                isCreated: created,
                data: data,
                message: "Đăng kí thành công!"
            })
        }
        
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the account."
      });
    });
};

exports.login = async (req, res) => {
    
    // if (!req.body.TenDangNhap) {
    //     res.status(400).send({
    //       message: "Tên đăng nhập không được để trống!"
    //     });
        
    //     return;
    //   }
    //   if (!req.body.MatKhau) {
    //     res.status(400).send({
    //       message: "Mật khẩu không được để trống!"
    //     });
    //     return;
    //   }
    // let salt = bcrypt.genSaltSync(10)
    // const hashPass = bcrypt.hashSync(req.body.MatKhau, salt);
    // const password = bcrypt.compareSync(req.body.MatKhau, hashPass);
    // TaiKhoan.findByPk({
    //     where:{TenDangNhap: req.body.TenDangNhap}
    // })
    //  .then(data => {
    //     console.log(data)
    //  })
    //  .catch(err => {
    //     res.status(500).send({
    //         message:
    //           err.message || "Some error occurred while creating the account."
    //       });
    //  });
     //hehhehe
    try{
      if(!req.body.TenDangNhap) throw new Error('TenDangNhap is Required');
      if(!req.body.MatKhau) throw new Error('MatKhau is Required');
      console.log(req.body.TenDangNhap)
      console.log(req.body.MatKhau)
      const user = await TaiKhoan.findOne({ where: { TenDangNhap: req.body.TenDangNhap } });
      console.log(user);
      if(!user){
          res.status(401)
          throw new Error('No User with this email id')
      }
      
      //Check if password matches
      const passwordMatch = await matchPassword(user.MatKhau,req.body.MatKhau);

      if(!passwordMatch){
          res.status(401);
          throw new Error('Invalid password or email id');
      }
          
      // delete user.dataValues.MatKhau
      user.dataValues.token = await sign({TenDangNhap: user.dataValues.TenDangNhap,
                                          TenHienThi:user.dataValues.TenHienThi
                                        })

      res.status(200).json({token: user.dataValues.token});
  }catch(e){
      const status = res.statusCode ? res.statusCode : 500
      res.status(status).json({errors: { body: [ 'Could not create user ', e.message ] }})
  }
}


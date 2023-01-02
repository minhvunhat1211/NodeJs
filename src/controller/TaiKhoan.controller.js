const db = require("../models");
const TaiKhoan = db.TaiKhoans;
const bcrypt = require("bcryptjs")
const {matchPassword} = require('../utils/password')
const {sign,decode} = require('../utils/JWT')
const auth = require("../middleware/auth")
const cloudinary = require("cloudinary")
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
            res.status(401).send({ 
                error: "Tài khoản đã tồn tại!"
                
            })
        } else {
            res.status(201).send({ 
                data: data,
                message: "Đăng kí thành công!"
            })
        }
        
    })
    .catch(err => {
      res.status(500).send({
        error:"Some error occurred while creating the account."
      });
    });
};

exports.login = async (req, res) => {
    try{
      if(!req.body.TenDangNhap) throw new Error('TenDangNhap is Required');
      if(!req.body.MatKhau) throw new Error('MatKhau is Required');
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
      user.dataValues.token = await sign({TenDangNhap: user.dataValues.TenDangNhap,
                                          TenHienThi:user.dataValues.TenHienThi,
                                          Avatar: user.dataValues.Avatar,
                                          Role: user.dataValues.Role,
                                          SoLuongBaiDang: user.dataValues.SoLuongBaiDang,
                                          NgayGiaNhap: user.dataValues.NgayGiaNhap
                                        })

      res.status(200).json({token:user.dataValues.token,
                            expiresIn:10});
  }catch(e){
      const status = res.statusCode ? res.statusCode : 500
      res.status(status).json({ error: e.message })
  }
}

exports.getUserByUsername = async (req, res) => {
  let token = req.headers.authorization;
  let user = await auth.getuser(token);
  let userName = user.TenDangNhap;
  TaiKhoan.findAll({
    where:{TenDangNhap:userName}
    })
    .then(data =>{
        res.status(200).send({ 
            data: data
        })
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the account."
        });
      });
}
exports.getUserByUsername2 = async (req, res) => {
  TaiKhoan.findAll({
    where:{TenDangNhap:req.params.TenDangNhap}
    })
    .then(data =>{
        res.status(200).send({ 
            data: data
        })
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the account."
        });
      });
}
exports.changeProfile = async (req, res) => {
  let token = req.headers.authorization;
  let user = await auth.getuser(token);
  const listImg = req.files;
  let listUrl = [];
	for (item in listImg) {
    const result = await cloudinary.v2.uploader.upload(listImg[item].path);
    listUrl.push(result.secure_url)
    console.log("Anh avatar");
  }
  let tenHienThi = "";
  if(req.body.TenHienThi == ""){
    tenHienThi = user.TenHienThi
  }
  else{
    tenHienThi = req.body.TenHienThi
  }
  console.log(tenHienThi)
  TaiKhoan.update(
    {
      TenHienThi: tenHienThi,
      Avatar: listUrl[0]
    },
    {
    where: {TenDangNhap: user.TenDangNhap},
})
  .then(data =>{
    res.status(201).send({
      data: user
    })
  })
  .catch(err => {res.status(401).json({error:"Lỗi"})})
}



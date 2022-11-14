const db = require("../models");
const ChuDe = db.ChuDe;
const auth = require("../middleware/auth")
exports.create = async (req, res) => {
    let token = req.headers.authorization;
    
    let user = await auth.getuser(token)
    console.log(user)
  // Validate request
  if (!req.body.TenChuDe) {
    res.status(400).send({
      message: "Tên chủ đề không được để trống!"
    });
    
    return;
  }
  // Save Tutorial in the database
  ChuDe.findOrCreate({
    where: { TenChuDe: req.body.TenChuDe },
    defaults: {
        TenChuDe: req.body.TenChuDe,
        CreateBy: user.TenDangNhap,
        isEnable: true
      }
  })
    .then(data => {
    //   res.send(data);
        const [ object, created ] = data;
        if (created === false) {
            res.json({ 
                isCreated: created,
                message: "Chủ đề đã tồn tại!"
                
            })
        } else {
            res.json({ 
                isCreated: created,
                data: data,
                message: "Tạo thành công!"
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
exports.getAll = (req, res) => {
    ChuDe.findAll({
        where:{isEnable:true}
    })
        .then(data =>{
            res.json({ 
                data: data
            })
        })
        .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the account."
            });
          });
};
exports.update = (req, res) => {
    const id = req.params.id;
    console.log(id);
    ChuDe.update(req.body,{
        where: {id: id}
    })
        .then(data =>{
            res.json({ 
                message: "Sửa thành công!"
            })
        })
        .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the account."
            });
          });
};
exports.softDelete = (req, res) => {
    const id = req.params.id;
    console.log(id);
    ChuDe.update({
        isEnable: false
    },{
        where: {id: id}
    })
        .then(data =>{
            res.json({ 
                message: "Xóa thành công!"
            })
        })
        .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the account."
            });
          });
};

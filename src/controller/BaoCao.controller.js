const db = require("../models");
const BaoCao = db.BaoCao;
const auth = require("../middleware/auth")
exports.create = async (req, res) => {
  let token = req.headers.authorization;
  let user = await auth.getuser(token);
  if(!req.body.NoiDung){
    res.status(400).send({
        message: "Nội dung không được để trống!"
        });
      return;
    }
  BaoCao.create({
    NoiDung: req.body.NoiDung,
    createBy: user.TenDangNhap,
    isEnable: true
  })
  .then(data =>{
    res.json({
      data: data
    })
  })
  .catch(err => {res.json({message:"Lỗi"})})
}
exports.getAll = (req, res) => {
    BaoCao.findAll({
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
// exports.update = (req, res) => {
//     const id = req.params.id;
//     console.log(id);
//     BaoCao.update(req.body,{
//         where: {id: id}
//     })
//         .then(data =>{
//             res.json({ 
//                 message: "Sửa thành công!"
//             })
//         })
//         .catch(err => {
//             res.status(500).send({
//               message:
//                 err.message || "Some error occurred while creating the account."
//             });
//           });
// };
exports.softDelete = (req, res) => {
    const id = req.params.id;
    console.log(id);
    BaoCao.update({
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

kkkkkkk

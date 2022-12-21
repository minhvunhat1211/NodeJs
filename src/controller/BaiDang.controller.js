const db = require("../models");
const BaiDang = db.BaiDang;
const auth = require("../middleware/auth")
const Img_BaiDang = db.Img_BaiDang;
BaiDang.hasMany(Img_BaiDang,{foreignKey:"idBaiDang"})
const cloudinary = require("cloudinary")
exports.create = async (req, res) => {
  let token = req.headers.authorization;
  let user = await auth.getuser(token);
  const listImg = req.files;
  let listUrl = [];
	for (item in listImg) {
    const result = await cloudinary.v2.uploader.upload(listImg[item].path);
    listUrl.push(result.secure_url)
    console.log(result.secure_url);
  }
  BaiDang.create({
    TieuDe: req.body.TieuDe,
    NoiDung: req.body.NoiDung,
    idChuDe: req.params.idChuDe,
    createBy: user.TenDangNhap,
    isEnable: true
  })
  .then(data =>{
    const idBaiDang = data.id;
		console.log(idBaiDang);
		for(url in listUrl){
			Img_BaiDang.create({
				idBaiDang: idBaiDang,
				filePath: listUrl[url],
				createBy: user.TenDangNhap
			})
		}
    res.json({
      data: data
    })
  })
  .catch(err => {res.json({message:"Lỗi"})})
}
exports.getAll = (req, res) => {
    BaiDang.findAll({
        where:{isEnable:true},
        include: [
          Img_BaiDang
        ]
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
    BaiDang.update(req.body,{
        where: {id: id},
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
    BaiDang.update({
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

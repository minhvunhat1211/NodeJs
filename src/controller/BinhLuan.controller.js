const db = require("../models");
const BinhLuan = db.BinhLuan;
const Img_BinhLuan = db.Img_BinhLuan;
BinhLuan.hasMany(Img_BinhLuan,{foreignKey:"idBinhLuan"});
const auth = require("../middleware/auth");
const cloudinary = require("cloudinary");
exports.create = async (req, res) => {
  let token = req.headers.authorization;
  let user = await auth.getuser(token);
	if(!req.body.NoiDung){
		res.status(400).send({
      message: "Nội dung không được để trống!"
    });
		return;
	}
	const listImg = req.files;
  let listUrl = [];
	for (item in listImg) {
    const result = await cloudinary.v2.uploader.upload(listImg[item].path);
    listUrl.push(result.secure_url)
    console.log(result.secure_url);
  }
  BinhLuan.create({
    NoiDung: req.body.NoiDung,
    idBaiDang: req.params.idBaiDang,
    createBy: user.TenDangNhap,
    isEnable: true
  })
  .then(data =>{
		const idBinhLuan = data.id;
		console.log(idBinhLuan);
		for(url in listUrl){
			Img_BinhLuan.create({
				idBinhLuan: idBinhLuan,
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
exports.update = (req, res) => {
	const id = req.params.id;
	console.log(id);
	BinhLuan.update(req.body,{
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
	BinhLuan.update({
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
exports.getAll = (req, res) => {
	BinhLuan.findAll({
			where:{isEnable:true},
			include: [
				Img_BinhLuan
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
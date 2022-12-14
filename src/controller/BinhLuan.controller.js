const db = require("../models");
const BinhLuan = db.BinhLuan;
const auth = require("../middleware/auth");
exports.create = async (req, res) => {
  let token = req.headers.authorization;
  let user = await auth.getuser(token);
	if(!req.body.NoiDung){
		res.status(400).send({
      message: "Nội dung không được để trống!"
    });
		return;
	}
  BinhLuan.create({
    NoiDung: req.body.NoiDung,
    idBaiDang: req.params.idBaiDang,
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
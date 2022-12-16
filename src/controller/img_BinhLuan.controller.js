const db = require("../models");
const Img_BinhLuan = db.Img_BinhLuan;
const auth = require("../middleware/auth");
const fs = require("fs");
const cloudinary = require("cloudinary");

exports.create = async (req, res) => {
  // let token = req.headers.authorization;
  // let user = await auth.getuser(token);
  const listImg = req.files;
  let listUrl = [];
  // for(item in listImg){
  //   let result = await cloudinary.v2.uploader.upload(listImg[item.path]);
  //   listUrl.push(result.secure_url);

  // }
  let result = await cloudinary.v2.uploader.upload(req.file.path);
  console.log(result);
}


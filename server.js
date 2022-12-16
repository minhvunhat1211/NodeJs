const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const multer = require("multer")
const upload = multer({dest:"uploads/"});
const cors = require("cors");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});
var type = upload.single("recfile")
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

const db = require("./src/models");

db.sequelize.sync()
    .then(() => {
        console.log("Synced db");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

app.get("/", (req, res) => {
    res.json({message: "Welcome to crud demo"});
});
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// require("./src/User.router")(app);
require("./src/routes/TaiKhoan.router")(app);
require("./src/routes/ChuDe.router")(app);
require("./src/routes/BaiDang.router")(app);
require("./src/routes/BinhLuan.router")(app);
require("./src/routes/BaoCao.router")(app);
require("./src/routes/Img_BinhLuan.router")(app);
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
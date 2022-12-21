const dbConfig = require("../config/db_config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAlias: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.users = require("./user.models")(sequelize, Sequelize);
db.TaiKhoans = require("./TaiKhoan.models")(sequelize, Sequelize);
db.ChuDe = require("./ChuDe.models")(sequelize, Sequelize);
db.BaiDang = require("./BaiDang.models")(sequelize, Sequelize);
db.BinhLuan = require("./BinhLuan.models")(sequelize, Sequelize);
db.BaoCao = require("./BaoCao.models")(sequelize, Sequelize);
db.Img_BinhLuan = require("./Img_BinhLuan.models")(sequelize, Sequelize);
db.Img_BaiDang = require("./Img_BaiDang.models")(sequelize, Sequelize);
module.exports = db;
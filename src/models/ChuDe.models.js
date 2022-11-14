const { BOOLEAN } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const ChuDe = sequelize.define("ChuDe", {
        TenChuDe:{
            type: Sequelize.TEXT,
            allowNull: false,
        },
        CreateBy: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        isEnable:{
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });
    return ChuDe;
  };
module.exports = (sequelize, Sequelize) => {
    const BaiDang = sequelize.define("BaiDang", {
        idChuDe:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model:"chudes",
                key: "id"
            },
            
        },
        TieuDe:{
            type: Sequelize.TEXT,
            allowNull: false,
        },
        NoiDung:{
            type: Sequelize.TEXT,
            allowNull: false,
        },
        createBy: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        isEnable:{
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });
    return BaiDang;
  };
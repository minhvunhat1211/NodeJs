module.exports = (sequelize, Sequelize) => {
    const BinhLuan = sequelize.define("BinhLuan", {
        idBaiDang:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model:"baidangs",
                key: "id"
            },
            
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
    },{
        timestamps: true
    });
    return BinhLuan;
  };
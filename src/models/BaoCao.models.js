module.exports = (sequelize, Sequelize) => {
    const BaoCao = sequelize.define("BaoCao", {
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
    return BaoCao;
  };
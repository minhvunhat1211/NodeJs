module.exports = (sequelize, Sequelize) => {
  const Img_BaiDang = sequelize.define("Img_BaiDang", {
      idBaiDang:{
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model:"baidangs",
              key: "id"
          },
          
      },
      filePath:{
          type: Sequelize.STRING,
          allowNull: false,
      },
      
      createBy: {
          type: Sequelize.TEXT,
          allowNull: false
      }
  },{
      timestamps: true
  });
  return Img_BaiDang;
};
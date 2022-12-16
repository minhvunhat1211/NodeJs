module.exports = (sequelize, Sequelize) => {
    const Img_BinhLuan = sequelize.define("Img_BinhLuan", {
        idBinhLuan:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model:"binhluans",
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
    return Img_BinhLuan;
  };
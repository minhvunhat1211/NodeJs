module.exports = (sequelize, Sequelize) => {
    const TaiKhoan = sequelize.define("TaiKhoans", {
        TenDangNhap:{
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        TenHienThi: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        Avatar: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        MatKhau: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Role: {
            type: Sequelize.STRING,
            allowNull: false
        },
        SoLuongBaiDang:{
            type: Sequelize.INTEGER,
            allowNull: true
        },
        NgayGiaNhap:{
            type: Sequelize.DATE,
            allowNull: true
        }
    },{
        timestamps: false
    }
    );
    return TaiKhoan;
  };
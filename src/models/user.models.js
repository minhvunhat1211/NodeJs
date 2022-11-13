module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    },{
        timestamps: false
    }
    );
  
    return User;
  };
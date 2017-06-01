module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    userid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true
    }
    password: {
      type: DataTypes.STRING,
      allowNull: true
    }
});

  return User;
};


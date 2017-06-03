module.exports = function(sequelize, DataTypes) {
  var List = sequelize.define("List", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    source_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    list_photo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ispublic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: true
    }
  });
  return List;
};



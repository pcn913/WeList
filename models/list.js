module.exports = function(sequelize, DataTypes) {
  var List = sequelize.define("List", {
    userid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    list_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    list_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
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
      allowNull: true
    }
  });
  return List;
};

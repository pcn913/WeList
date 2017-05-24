module.exports = function(sequelize, DataTypes) {
  var Categories = sequelize.define("Categories", {
    category: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Categories;
};

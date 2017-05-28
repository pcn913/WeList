module.exports = function(sequelize, DataTypes) {
  var List_Item = sequelize.define("List_Item", {
    list_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    item: {
      type: DataTypes.STRING,
      allowNull: false
    },
    item_number: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  return List_Item;
};

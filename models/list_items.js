module.exports = function(sequelize, DataTypes) {
  var List_Item = sequelize.define("List_Item", {
    item: {
      type: DataTypes.STRING,
      allowNull: false
    },
    item_number: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
    {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // An Author (foreignKey) is required or a Post can't be made
          List_Item.belongsTo(models.List, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
  );
  return List_Item;
};



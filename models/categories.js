module.exports = function(sequelize, DataTypes) {
  var Categories = sequelize.define("Categories", {
    // Giving the Author model a name of type STRING
    category: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    // Here we'll pass a second "classMethods" object into the define method
    // This is for any additional configuration we want to give our models
    {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // Associating Author with Posts
          // When an Author is deleted, also delete any associated Posts
          Categories.hasMany(models.List);
        }
      }
    }
  );
  return Categories;
};



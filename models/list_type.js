module.exports = function(sequelize, DataTypes) {
  var List_Type = sequelize.define("List_Type", {
    // Giving the Author model a name of type STRING
    list_type_name: {
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
          List_Type.hasMany(models.List);
        }
      }
    }
  );
  return List_Type;
};

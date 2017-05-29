// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {


  app.get("/api/lists", function(req, res) {
    var query = {};

    db.List.findAll({
      where: query
    }).then(function(dbList) {
      res.json(dbList);
    });
  });

  app.get("/api/cards", function(req, res) {

       db.List.findAll({}).then(function(dbPost) {
    
      res.json(dbPost);
    });
  });  

    app.get("/api/items", function(req, res) {

     db.List_Item.findAll({}).then(function(result) {


      for (var i = 0; i < result.length; i++) {     

      } // end for loop
      res.json(result);
    });
  });

   //Get route for retrieving the items for a single list
  app.get("/api/list/:id", function(req, res) {
  
    db.List.findAll({
      where: {
        list_id: req.params.id
      }

    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });  
  
 //Get route for retrieving the items for a single list
  app.get("/api/discover/:id", function(req, res) {
  
    db.List.findAll({
      where: {
        category: req.params.id
      }

    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });  

  //Get route for retrieving the items for a single list
  app.get("/api/lists/:id", function(req, res) {
  
    db.List_Item.findAll({
      where: {
        list_id: req.params.id
      }

    }).then(function(dbPost) {
      res.json(dbPost);
    });

  });

};

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


  app.get("/api/maxid", function(req, res) {

    db.List.max('list_id', {
 
    }).then(function(dbList) {
      res.json(dbList);
    });
  });

  // get rout for getting the data for all the lists
  app.get("/api/cards", function(req, res) {

       db.List.findAll({}).then(function(dbPost) {
    
      res.json(dbPost);
    });
  });  


   //Get route for retrieving the items for a single list, based on list_id
  app.get("/api/list/:id", function(req, res) {
  
    db.List.findAll({
      where: {
        list_id: req.params.id
      }

    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });  
  

  //Get route for retrieving all of a single user's lists, based on userid
  app.get("/api/userlists/:id", function(req, res) {
  
    db.List.findAll({
      where: {
        userid: req.params.id
      }

    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });  

  //Get route for deleting a single list, based on list_id
  app.get("/api/deletelist/:id", function(req, res) {
  
    db.List.destroy({ 

      where: {
        list_id: req.params.id
      }

    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });  

  //Get route for deleting a single list item, based on the id
  app.get("/api/deletelistitem/:id", function(req, res) {
  
    db.List_Item.destroy({ 

      where: {
        id: req.params.id
      }

    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });  

  //Get route for retrieving all of the items for a single list, based on list_id
  app.get("/api/lists/:id", function(req, res) {
  
    db.List_Item.findAll({
      where: {
        list_id: req.params.id
      }

    }).then(function(dbPost) {
      res.json(dbPost);
    });

  });

// post route for creating a list
app.post("/api/createlist", function(req, res) {

    db.List.create({
    userid: req.body.userid,
    list_id: req.body.list_id,
    list_type: req.body.list_type,
    title: req.body.title,
    list_photo: req.body.list_photo,
    category: req.body.category,
    description: req.body.description
    });

  });

// post route for creating all of the list items for a single list
app.post("/api/createitems", function(req, res) {

    // take the body from the received request, and assign it to a local object variable
    var listItems = req.body;

    // set up an empty array to receive the promises that will be pushed into it
    var promises = [];

    // iterate through all of the list item objects that are in the listItems object
    for(var propt in listItems){

      // assign the sequelize create command for the current (per iteration) list item to a local object
      var newPromise = db.List_Item.create({'list_id': listItems[propt].list_id, 'item': listItems[propt].item, 'item_number': listItems[propt].item_number});
      // push the command object into the promises array
      promises.push(newPromise);
    }  // next, invoke the commands in the promises array, waiting until they're completed
     Promise.all(promises).then(function() {   
      // console log a success message  
      console.log("all the items were created");
    });

  });

};

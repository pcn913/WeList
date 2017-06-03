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

  app.get("/api/maxid", function(req, res) {

    db.List.max('list_id', {
 
    }).then(function(dbList) {
      res.json(dbList);
    });
  });

  app.get("/api/cards", function(req, res) {

       db.List.findAll({}).then(function(dbPost) {
    
      res.json(dbPost);
    });
  });  

  app.get("/api/home", function(req, res) {

    db.List.findAll({
     //include: [ models.Task ]
     limit: 9
   }).then(function(dbPost) {
    
      res.json(dbPost);
    });
  });   

  app.get("/api/search", function(req, res) {

  db.List.findAll({
      where: {
       description:
         {
           $like: '%' + req.query.q + '%'
         }  
      }
   }).then(function(dbPost) {
    
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

   //Get route for retrieving the data for a single list
  app.get("/api/list/:id", function(req, res) {
  
    db.List.findAll({
      where: {
        list_id: req.params.id
      }

    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });  
  
 //Get route for retrieving the list records for a given category
  app.get("/api/discover/:id", function(req, res) {
  
    db.List.findAll({
      where: {
        category: req.params.id
      }

    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });  

  //Get route for retrieving the lists for a single user
  app.get("/api/userlists/:id", function(req, res) {
  
    db.List.findAll({
      where: {
        userid: req.params.id
      }

    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });  

  //Get route for deleting a single list
  app.get("/api/deletelist/:id", function(req, res) {
  
    db.List.destroy({ 

      where: {
        list_id: req.params.id
      }

    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });  

  //Get route for deleting a single list item
  app.get("/api/deletelistitem/:id", function(req, res) {
  
    db.List_Item.destroy({ 

      where: {
        id: req.params.id
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

// post route to create a list
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

// post route to create a list
app.post("/api/createitem", function(req, res) {

    db.List_Item.create({
      list_id: req.body.list_id, 
      item: req.body.item, 
      item_number: req.body.item_number
    });
  });

// post route to add items for a list
app.post("/api/createitems", function(req, res) {

    var listItems = req.body;

    var promises = [];

    for(var propt in listItems){

      var newPromise = db.List_Item.create({'list_id': listItems[propt].list_id, 'item': listItems[propt].item, 'item_number': listItems[propt].item_number});
      console.log("\nnewPromise: " + newPromise + "\n");
      promises.push(newPromise);
    }
     Promise.all(promises).then(function() {
      console.log("all the items were created");
    });
  });

// Route to update a list item
app.put("/api/itemupdate", function(req, res) {

  var listitem = req.body;

  db.List_Item.update({
    item: listitem.item
    }, {
    where: {
      id: listitem.id
    }
    }).then(function(dbPost) {

      res.send(listitem.item);
  }); 
}); // end item update

};

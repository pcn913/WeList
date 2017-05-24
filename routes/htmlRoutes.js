// *********************************************************************************
// htmlRoutes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

var homeController = require('../controllers/home');
 var models = require('../models');
 var express = require('express');
 var router = express.Router();



//var homeController = require('../controllers/home');
// module.exports = function(app) {
//   app.get('/', homeController.renderHome);
// };





// Dependencies
// =============================================================
var path = require("path");
var express = require("express");

// Routes
// =============================================================
module.exports = function(router) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads our landing page
  router.get("/", function(req, res) {
    //res.sendFile(path.join(__dirname, "../public/index.html"));
    res.render("index");
  });

  router.get('/list', function(req, res) {
	  models.List.findAll({
	    //include: [ models.Task ]
	  }).then(function(lists) {
	    res.render('list', {
	      title: 'Sequelize: Express Example',
	      lists: lists
	    });
	  });

	});


  // list route loads list.html -> this to create new list/edit or view existing list
  // app.get("/list", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/list.html"));
  // });

  // // login route loads login.html that manages the login information
  // app.get("/login", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/login.html"));
  // });

  // // profile route loads userprofile.html
  // app.get("/profile", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/userprofile.html"));
  // });

};

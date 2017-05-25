// *********************************************************************************
// htmlRoutes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

var homeController = require('../controllers/home');
 var models = require('../models');
 var express = require('express');
 var router = express.Router();
 var passport = require('passport');



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
  // router.get("/", function(req, res) {
  //   //res.sendFile(path.join(__dirname, "../public/index.html"));
  //   res.render("index");
  // });

  router.get('/', function(req, res) {
    res.render('index', {
      user : req.user // get the user out of session and pass to template
    });
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

  // Get rotue for retrieving a single post
  router.get("/list/:id", function(req, res) {
    // 2. Add a join here to include the Author who wrote the Post
    models.List_Item.findAll({
      where: {
        list_id: req.params.id
      }
    }).then(function(lists) {
      console.log(lists);
      res.render('listitem', {
        title: 'Sequelize: Express Example',
        lists: lists
      });
    });
  });


  // index route loads our landing page
  router.get("/login", function(req, res) {
    //res.sendFile(path.join(__dirname, "../public/index.html"));
    res.render("login");
  });

  
  // process the login form
  router.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
    }),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });


  // index route loads our landing page
  router.get("/signup", function(req, res) {
    //res.sendFile(path.join(__dirname, "../public/index.html"));
    res.render("signup");
  });


  // process the signup form
  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));


  router.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile', {
      user : req.user // get the user out of session and pass to template
    });
  });


  // =====================================
  // LOGOUT ==============================
  // =====================================
  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });


// route middleware to make sure
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}


// // route middleware to make sure
// function isLoggedInHeader(req, res, next) {

//   // if user is authenticated in the session, carry on
//   console.log('here');
//   if (req.isAuthenticated())
//     return next();
// }


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

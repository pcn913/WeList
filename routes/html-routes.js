// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var express = require("express");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // Static directory
  app.use(express.static("/public"));

  // index route loads our landing page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

 // cards route for testing simple card display
  app.get("/cards", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/cards.html"));
  });


  // discover route loads discover.html which is the lists available in database
  app.get("/discover", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/discover.html"));
  });

  // list route loads list.html -> this to create new list/edit or view existing list
  app.get("/list", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/list.html"));
  });

  // login route loads login.html that manages the login information
  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // profile route loads userprofile.html
  app.get("/profile", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/userprofile.html"));
  });

};

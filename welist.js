//App depencencies -----------------------------------------/
var express = require('express');
var session  = require('express-session');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var app = express();

var flash = require('connect-flash');


require('./config/passport')(passport); // pass passport for configuration


//App middleware -------------------------------------------/
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.static(process.cwd() + "/public"));

//Handlebars config ---------------------------------------/
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');



// required for passport
app.use(session({
	secret: 'wtfisthis',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(flash()); // use connect-flash for flash messages stored in session


//Route config -------------------------------------------/
require('./routes/htmlRoutes')(app);
require('./routes/apiRoutes')(app);




//Database config ---------------------------------------/
global.db = require('./models');


//Port config ---------------------------------------------------/
var PORT = process.env.PORT || 3000;

//Starting the server, syncing our models ------------------------------------/
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function(err) {
    if (err) {
      console.error(err);
    } else {
      console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    }
  });
});

const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('cookie-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const dotenv = require('dotenv').config();

const app = express();
app.use(helmet())

mongoose.connect(process.env.DB);
const Trainer = require('./models/trainer');
const conts = require('./controllers/conts');
const apiRoutes = require('./routes/api.js');
const userRoutes = require('./routes/user.js');
const manageRoutes = require('./routes/admin.js');
app.use(express.static('public'));
app.set('view engine', 'pug');

app.use(session({
  name:'pogosession',
  secret: process.env.SESSION_SECRET,
  maxAge: 24 * 60 * 60 * 1000
}));

app.use(require('flash')());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Trainer.authenticate()));
passport.serializeUser(Trainer.serializeUser());
passport.deserializeUser(Trainer.deserializeUser());

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/*', (req,res,next) => {
  req.session.flash = [];
  next();
});
userRoutes(app);
manageRoutes(app);
apiRoutes(app);

app.route("/:city?").get(conts.getCity).post(conts.saveUser);
// listen for requests :)
const listener = app.listen(3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

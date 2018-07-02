const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = express();

mongoose.connect(process.env.DB);
const Trainer = require('./models/trainer');
const Gym = require('./models/gym');
const conts = require('./controllers/conts');
const apiRoutes = require('./routes/api.js');

app.use(express.static('public'));
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get("/readme", (req,res) => {
  res.sendFile(__dirname + '/views/readme.html');
})
app.get("/test/:city?", (req, res) => {
  res.sendFile(__dirname + '/views/test.html');
});

app.get("/:city?", (req, res) => {
  const d = new Date();
  const city = req.params.city || process.env.DEFCITY;
  let last;
  let list;
  let gyms;
  let blue = [];
  let red = [];
  let yellow = [];
  conts.findLast(city, 20, (err,data) => {if (err) {throw err;} else {last = data; complete()}});
  conts.findList(city, (err,data) => {if (err) {throw err;} else {
    for (let t of data) {
      if (t.team === 'blue') {
        blue.push(t);
      } else if (t.team === 'yellow') {
        yellow.push(t);
      } else {
        red.push(t);
      };
    }
    list=data;
    complete();
  }});
  conts.findGyms(city,(err,data) => {if (err) {throw err;} else {gyms = data; complete()}});
  const complete = () => {
    if (last && list && gyms) {
      res.render('index', { 
        title: `${city.charAt(0).toUpperCase() + city.substr(1)} local group`, 
        moment: require('moment'),
        last: last,
        blue: blue,
        yellow: yellow,
        red: red,
        gyms: gyms
      });
    }
  }
});

apiRoutes(app);

app.post('/new', (req,res) => {
  const cities = process.env.CITIES; // add approved cities here
  const [nick, team, code, path] = [...Object.values(req.body)];
  const city = path ? path : process.env.DEFCITY //set a default city
  if (cities.includes(city)) {
    const update = {};
    update.$addToSet = {city:city};
    update.lastModified = new Date();
    if (code) {
      update.code = code.trim();
    }
    Trainer.findOneAndUpdate({name:nick.trim().toLowerCase()},update,(err,data) => {
      if (err){throw err;} else {
        if (!data) {
          const t = new Trainer({
            name: nick.trim().toLowerCase(),
            displayName: nick.trim(),
            city: city,
            team: team,
            code: code.trim(),
            createdOn: new Date(),
            lastModified: new Date()
          });
          t.save((err,data) => {
            if (err) {
              if (err.name === 'MongoError' && err.code === 11000) {
                return res.status(500).send({success: false, message: 'Oh snap! It seems a player with this nickname is already signed up!' });
              } else {
                throw err;
              }
            } else {
              if (!data) {
                res.json({success: false, message:'Uhm... something went fishy...'});
              } else {
                res.json({success: true, message:`You're all set, ${nick}!`});
              }
            }
          });
        } else {
          res.json({success: true, message:`Profile updated, ${nick}!`});
        }
      }
    });
  } else {
    res.json({success: false, message:`Sorry, ${city} may not be a registered city.`});
  }
});

// listen for requests :)
const listener = app.listen(3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

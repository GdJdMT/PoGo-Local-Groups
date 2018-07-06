const Trainer = require('../models/trainer');
const Gym = require('../models/gym');

exports.findLast = (city, limit, done) => {
  Trainer.find({city:city},'displayName code lastModified', {sort: {lastModified: -1}, limit:limit}, done);
};

exports.findList = (city, done) => {
  Trainer.find({city:city},'displayName team code', {sort: {name: 1}}, done);
};
exports.findGyms = (city, done) => {
    let cities;
    if (city === 'test') {
      cities = ['test','Hogwarts']; // set here a city cluster for 'test'
    } else {
      cities = city.charAt(0).toUpperCase() + city.slice(1);
    }
    Gym.find({city:cities},'name city coords',{sort : {city : 1}}, done);
}

exports.getCity = (req, res) => {
  const d = new Date();
  const city = req.params.city || process.env.DEFCITY;
  let last;
  let list;
  let gyms;
  let blue = [];
  let red = [];
  let yellow = [];
  this.findLast(city, 20, (err,data) => {if (err) {throw err;} else {last = data; complete()}});
  this.findList(city, (err,data) => {if (err) {throw err;} else {
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
  this.findGyms(city,(err,data) => {if (err) {throw err;} else {gyms = data; complete()}});
  const complete = () => {
    if (last && list && gyms) {
      res.render('index', {
        title:`${city.charAt(0).toUpperCase() + city.substr(1)} local group`,
        moment: require('moment'),
        last: last,
        blue: blue,
        yellow: yellow,
        red: red,
        gyms: gyms,
        path: req.path.toLowerCase()
      });
    }
  }
};

exports.saveUser = (req,res) => {
  const cities = process.env.CITIES; // add approved cities here
  const [nick, team, code] = [...Object.values(req.body)];
  const city = req.params.city ? req.params.city.toLowerCase() : process.env.DEFCITY //set a default city
  if (cities.includes(city)) {
    Trainer.findOne({name:nick.trim().toLowerCase()},(err,t) => {
      if (err){throw err;} else {
        if (!t) { t = new Trainer({}); }
        t.name = nick ? nick.trim().toLowerCase() : t.name;
        t.displayName = nick ? nick.trim() : t.displayName;
        if (!t.city.includes(city)) {
          t.city.push(city);
        }
        t.team = team ? team : t.team;
        t.code = code ? code.trim() : t.code ? t.code : '';
        t.createdOn = t.createdOn ? t.createdOn : new Date();
        t.lastModified = new Date();
        t.save((err,data) => {
          if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
              req.flash('danger','Oh snap! It seems a player with this nickname is already signed up!');
              return res.redirect('/'+city);
            } else {
              throw err;
            }
          } else {
            if (!data) {
              req.flash('danger','Uhm... something went fishy...');
              return res.redirect('/'+city);
            } else {
              req.flash('success',`You're all set, ${nick}!`);
              return res.redirect('/'+city);
            }
          }
        });
      }
    });
  } else {
    req.flash('danger',`Sorry, ${city} may not be a registered city.`);
    return res.redirect('/'+city);
  }
}

/*
USER THIS CODE TO ADD GYMS
NOTE: all fields are case sensitive.
const gyms = [
  {name: 'test1', city: 'test', coords:["34.01466338397385","-118.49057972431184"]},
  {name: 'test2', city: 'Hogwarts', coords:["34.01818941399172","-118.48386347293855"]}
  ...add other gyms here
];
Gym.insertMany(gyms, (err) => {
  if(err){throw err} else {console.log('seemsok...')};
});*/

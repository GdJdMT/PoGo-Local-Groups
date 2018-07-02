const Trainer = require('../models/trainer');
const Gym = require('../models/gym');

exports.findLast = (city, limit, done) => {
  Trainer.find({city:city},'displayName code lastModified', {sort: {lastModified: -1}, limit:limit}, done);
  }
exports.findList = (city, done) => {
  Trainer.find({city:city},'displayName team code', {sort: {displayName: 1}}, done);
}
exports.findGyms = (city, done) => {
    let cities;
    if (city === 'test') {
      cities = ['test','Hogwarts']; // set here a city cluster for 'test'
    } else {
      cities = city.charAt(0).toUpperCase() + city.slice(1);
    }
    Gym.find({city:cities},'name city coords',{sort : {city : 1}}, done);
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
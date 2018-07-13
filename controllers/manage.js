const mongoose = require('mongoose');
const Trainer = require('../models/trainer.js');
const Gym = require('../models/gym.js');

exports.getUsers = (req,res) => {
  const city = req.params.city;
  Trainer.find({city:city},'_id displayName team code', {sort: {name: 1}}, (err,users) => {
    res.render('users', {users:users});
  });
}

exports.getDel = (req,res) => {
  const id = req.params.id;
  res.render('delUser', {id:id});
}

exports.delUser = (req,res) => {
  Trainer.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {throw err;} else {
      req.flash('success', 'Done!')
      res.redirect('/admin');
    };
  });
}

exports.addGym = (req,res) => {
  const [name, city, lat, lon] = [...Object.values(req.body)];
  const gym = new Gym({
    name:name,
    city:city,
    coords:[lat,lon]
  })
  gym.save(err=> {
    if (err) {throw err;} else {
      req.flash('success', 'Done');
      res.redirect('/admin/addGym');
    }
  })
}

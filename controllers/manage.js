const mongoose = require('mongoose');
const Trainer = require('../models/trainer.js');
const Gym = require('../models/gym.js');

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

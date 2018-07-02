const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const gymSchema = new Schema ({
  name: String,
  city : {type:String, lowercase: true},
  coords: []
});

module.exports = mongoose.model('Gym', gymSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const trainerSchema = new Schema ({
  name: {type: String, unique:true},
  displayName: {type: String, unique:true},
  city : [{ type: String}],
  team: String,
  level: Number,
  code: String,
  createdOn: Date,
  lastModified: Date
});

module.exports = mongoose.model('Trainer', trainerSchema);

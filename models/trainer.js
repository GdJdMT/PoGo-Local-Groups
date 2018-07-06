const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
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

trainerSchema.plugin(passportLocalMongoose, {usernameField:'displayName',limitAttempts: true, maxAttempts: 5});
module.exports = mongoose.model('Trainer', trainerSchema);

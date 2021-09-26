//jshint esversion:6
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const mongoose = require("mongoose");
// const findOrCreate = require('mongoose-findorcreate');
const passportLocalMongoose = require("passport-local-mongoose");
const bcrypt   = require('bcrypt-nodejs');


const userSchema = new mongoose.Schema({
  username:{type: String, unique: true},
  firstName: String,
  lastName: String,
  organization: String,
  country: String,
  password: String,
  profiles:[{ age: Number, color: String, animal: String}],
  students:[{email: String}]
  // googleId: String
});

const options = {
  usernameLowerCase: true
}

userSchema.plugin(passportLocalMongoose, options);

const User = new mongoose.model("User", userSchema);
export default User;

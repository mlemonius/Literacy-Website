//jshint esversion:6
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const mongoose = require("mongoose");
const findOrCreate = require('mongoose-findorcreate');
const passportLocalmongoose = require("passport-local-mongoose");


const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String
});

userSchema.plugin(passportLocalmongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);
export default User;

//jshint esversion:6
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const mongoose = require("mongoose");
// const findOrCreate = require('mongoose-findorcreate');
// const passportLocalmongoose = require("passport-local-mongoose");


const otpSchema = new mongoose.Schema({
  email:{type: String, unique: true},
  otp: String
});

const Otp = new mongoose.model("Otp", otpSchema);
export default Otp;

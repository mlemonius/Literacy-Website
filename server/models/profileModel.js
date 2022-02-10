//jshint esversion:6
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const mongoose = require("mongoose");


const ProfileSchema = new mongoose.Schema({
  name: {type: String, unique: true},
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  age: Number,
  color: String,
  animal: String,
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile"
  }]
});

const Profile = new mongoose.model("Profile", ProfileSchema);
export default Profile;

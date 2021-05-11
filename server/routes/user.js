//jshint esversion:6
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
import express from "express";
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalmongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
import User from "../database/userModel.js";
import Otp from "../database/otpModel.js";
const {Auth} = require("two-step-auth");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
}) // change it

router.get("/login", (req, res) => {
  res.render("Login");
}) // change it

router.get("/register", (req, res) => {
  res.render("Register");
}) // change it


// router.get("/auth/google", passport.authenticate("google", {
//   scope: ["profile"]
// }));

// router.get('/auth/google/secrets',
//   passport.authenticate('google', {
//     failureRedirect: "/login",
//     successRedirect: "/secrets"
//   }));

router.post("/server/verify", async (req, res) => {
  try {
    const result = await Auth(req.body.email, "ReadPal");
    if (result.success == true) {
      Otp.findOne({email: req.body.email}, (err, foundOtp) => { //check if the email exists in the database
      // console.log(foundOtp);
        if (err) {
          console.log(err);
        } else {          // first time requests otp
          if (foundOtp == null) {
            const newOtp = new Otp({
              email: req.body.email,
              otp: result.OTP
            });
            newOtp.save();
          } else { // the email exists ( which means this is not the first time the user requests a otp)
            foundOtp.otp = result.OTP; // update new otp to the document
            foundOtp.save();
          }
        }
      });
      res.json({message: 'success'});
    } else {
      res.json({message: "invalid"});
    }
  } catch (error) {
    console.log(error);
  }
})

router.post("/server/register", (req, res) => {
  const {firstname, lastname, organization, country, email, password, otp} = req.body;
  Otp.findOneAndDelete({email: email,otp: otp}, (err, foundOtp) => { //find otp and email
    if (foundOtp) { // if the sent otp and the otp in the database matches, create a new user
      const newUser = new User({
        username: email,
        firstName: firstname,
        lastName: lastname,
        organization: organization,
        country: country
      });
      User.register(newUser, password, (err, user) => {
        if (err) {
          console.log(err);
        } else {
          req.login(user, function(err) {
            if (err) {
              return next(err);
            } else {
              res.json({
                message: "success",
                userID: user._id
              });
            }
          });
        }
      });
    } else {
      res.json({
        message: "invalid"
      });
    }
  })
})

router.post('/server/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    if (!user) {
      return res.json({message: "invalid", userID: null});
    }
    req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      return res.json({
        message: "success",
        userID: req.user._id
      });
    });
  })(req, res, next);
})

router.post("/server/:userID/profile", (req, res) => {
  const userID = req.params.userID;
  const {age,color,animal} = req.body;

  User.findById({_id: userID}, (err, foundUser) => { // check userID if it is valid
    if (err) {
      res.json({message: "invalid", profileID: null});
    } else {
      const matchProfile = foundUser.profiles.find((profile, index) => {
        if (profile.age == age && profile.color == color && profile.animal == animal) {
          return true;
        }
      });
      if (matchProfile == undefined) {  //if the profile does not match the existing one add new profile
        const childProfile = {age: age, color: color, animal: animal};
        foundUser.profiles.push(childProfile);
        foundUser.save().then(savedUser => {                // in order to find child profile id,  search thru parent and retrieve the child profile array
          User.findById(savedUser._id, 'profiles', function(err, foundProfiles) {
            if (err) {
              console.log(err);
            } else {          // at this stage the child profile must exist
              const childObject = foundProfiles.profiles.find((object, index) => {  //search for profile
                if (object.age == age && object.color == color && object.animal == animal) {
                  return true;
                }
              });
              res.json({message: "success", profileID: childObject._id
              });
            }
          });
        });
      } else {
        res.json({message: "match", profileID: null});
      }
    }
  });
})

router.post("/server/forgot", (req, res) => {
    User.findOne({username: req.body.email}, (err, foundUser) =>{ // check if the account exists in database
      if (err) {
        console.log(err);
      }else {
        if (foundUser == null) {
          res.json({message: "invalid"})
        }else{
          Auth(req.body.email, "ReadPal").then(result => {
            if (result.success == true) {
              Otp.findOne({email: req.body.email}, (err, foundOtp) => { //check if the email exists in the database
              // console.log(foundOtp);
                if (err) {
                  console.log(err);
                } else {          // first time requests otp
                  if (foundOtp == null) {
                    const newOtp = new Otp({
                      email: req.body.email,
                      otp: result.OTP
                    });
                    newOtp.save();
                  } else { // the email exists ( which means this is not the first time the user requests a otp)
                    foundOtp.otp = result.OTP; // update new otp to the document
                    foundOtp.save();
                  }
                  res.json({message: "success"});
                }
              });
            }else{
              console.log("Error when sending otp to user");
            }
          });
        }
      }
    })
})

router.patch("/server/reset", (req, res) => {
  const {otp, password} = req.body;
    Otp.findOneAndDelete({otp: otp}, (err, foundOtp) =>{  // check if the otp user gave is valid
      if(err){
        console.log(err);
      }else{
        if(foundOtp == null){
          res.json({message: "invalid", userID: null})
        }else{                                               // if valid, find that user to set up the new password (given by user)
          User.findOne({username: foundOtp.email}, (err, foundUser) =>{
            if (err) {
              console.log(err);
            }else {
              foundUser.setPassword(password, function(err, user){  //reset password for user
                if (err) {
                  console.log(err);
                }else {
                  foundUser.save();
                  res.json({message: "success", userID: user._id});
                }
              })
            }
          })
        }
      }
    })
})

router.get("/server/logout", (req, res) => {
  req.logout();
  res.json({ message: "success"});
})

router.get("/server/:userID/profiles", (req,res) =>{
  const userID = req.params.userID;
  User.findById({_id: userID}).then(foundUser => {
    res.json({message: "success", profiles: foundUser.profiles});
  }).catch(err => {
    res.json({message: "invalid", profiles: null})
  })
})

export default router;

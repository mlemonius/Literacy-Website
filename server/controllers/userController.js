//jshint esversion:6
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
import express from "express";
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalmongoose = require("passport-local-mongoose");
// Load the AWS SDK for Node.js
const  AWS = require('aws-sdk');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const findOrCreate = require('mongoose-findorcreate');
import User from "../models/userModel.js";
import Otp from "../models/otpModel.js";
const {Auth} = require("two-step-auth");


// Set the region 
// AWS.config.update({region: 'REGION'});

// Create S3 service object
const s3 = new AWS.S3({apiVersion: '2006-03-01'});

// Create the parameters for calling listObjects


// Call S3 to obtain a list of the objects in the bucket


const router = express.Router();

const userLogin = (req, res, next) => {
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
}

const userSignup = (req, res) => {
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
}

const verifyEmailForSignup = (req, res) => {
     User.findOne({username: req.body.email}, (err, foundUser) =>{
          if(err){
            console.log(err);
          }else {
            if (foundUser == null) {
              Auth(req.body.email, "ReadPal").then(result =>{
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
                  res.json({message: "success"});
                } else {
                  res.json({message: "invalid"});
                }
              });
            }else{
              res.json({message: "match"})
            }
          }
        })
}

const addProfile = (req, res) =>{
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
}

const verifyEmailForReset = (req, res) => {
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
}

const resetPassword = (req, res) => {
    const {otp, password} = req.body;
    Otp.findOneAndDelete({otp: otp}, (err, foundOtp) =>{  // check if the otp user gave is valid
      if(err){
        console.log(err);
      }else{
        if(foundOtp == null){
          res.json({message: "invalid"})
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
                  res.json({message: "success"});
                }
              })
            }
          })
        }
      }
    })
}

const returnProfiles = (req, res) => {
  const userID = req.params.userID;
  const imagesList = [];
  User.findById({ _id: userID })
  .then((foundUser) => {
      foundUser.profiles.forEach((profile, index, profilesList) => {
        const bucketParams = {
          Bucket : 'library.stories',
          Key : `profileImages/${profile.animal.toLowerCase()}_-_${profile.color.toLowerCase()}1024_1.jpg`
        };
         s3.getObject(bucketParams, function (err, data) {
          if (err) {
            console.log("Error", err);
          } else {
            const image = Buffer.from(data.Body).toString('base64');
            // console.log(image);
            imagesList.push(image);
            if(index === profilesList.length - 1){
              // console.log(imagesList.length);
              res.json({ message: "success", profiles: foundUser.profiles, images: imagesList });
            }
          }
        });

      });
  })
    .catch((err) => {
      res.json({ message: "invalid", profiles: null });
    });
}

const userLogout = (req, res) => {
     req.logout();
     res.json({ message: "success"});
}

// const getProfilesImgs = (req, res) => {
//   const {}
// }


export {verifyEmailForSignup, userSignup, userLogin, addProfile, returnProfiles, verifyEmailForReset, resetPassword, userLogout}
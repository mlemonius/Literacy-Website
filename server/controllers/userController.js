//jshint esversion:6
import {createRequire} from 'module'
const require = createRequire(import.meta.url)
import express from "express"
const mongoose = require("mongoose")
const passport = require("passport")
const AWS = require('aws-sdk')
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const findOrCreate = require('mongoose-findorcreate');
import User from "../models/userModel.js"
import Otp from "../models/otpModel.js"
const {Auth} = require("two-step-auth")

const s3 = new AWS.S3({
  apiVersion: '2006-03-01'
})
const router = express.Router()

const userLogin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err); // will generate a 500 error
    }
    if (!user) {
      return res.json({
        message: "invalid",
        userID: null
      })
    }
    req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      return res.json({
        message: "success",
        userID: req.user._id
      })
    })
  })(req, res, next);
}


const userSignup = async (req, res) => {
  const {
    firstname,
    lastname,
    organization,
    country,
    email,
    password,
    otp
  } = req.body
  const foundOtp = await Otp.findOneAndDelete({email: email, otp: otp}).catch(err => {console.log("Finding Otp error when signing up: " + err)})
  if (foundOtp) { // if the sent otp and the otp in the database matches, create a new user
    const newUser = new User({
      username: email,
      firstName: firstname,
      lastName: lastname,
      organization: organization,
      country: country
    });
    const user = await User.register(newUser, password).catch(err => {console.log("Registering user error: " + err)})
    req.login(user, (err) => {
      if (err) {
        return next(err)
      } else {
        res.json({
          message: "success",
          userID: user._id
        })
      }
    })
  } else {
    res.json({
      message: "invalid"
    })
  }
}



const verifyEmailForSignup = async (req, res) => {
  const foundUser = await User.findOne({username: req.body.email}).catch(err => {console.log("Finding user error: " + err)})
  if (foundUser == null) {
    const result = await Auth(req.body.email, "ReadPal").catch(err => {console.log("Sending Otp error when verifying email for signup: " + err)})
    if (result.success == true) {
      const foundOtp = await Otp.findOne({email: req.body.email}).catch(err => {console.log("Finding Otp error: " + err)})
      if (foundOtp == null) {
        const newOtp = new Otp({
          email: req.body.email,
          otp: result.OTP
        })
        newOtp.save()
      } else { // the email exists ( which means this is not the first time the user requests a otp)
        foundOtp.otp = result.OTP // update new otp to the document
        foundOtp.save()
      }
      res.json({
        message: "success"
      })
    } else {
      res.json({
        message: "invalid"
      })
    }
  } else {
    res.json({
      message: "match"
    })
  }
}


const addProfile = async (req, res) => {
  const userID = req.params.userID
  const {
    age,
    color,
    animal
  } = req.body

  try {
    const foundUser = await User.findById({_id: userID}).catch(err => {console.log("Finding user error when adding profile: " + err)})
    if (foundUser == null) {
      res.json({
        message: "invalid",
        profileID: null
      })
    } else {
      const matchProfile = foundUser.profiles.find((profile, index) => {
        if (profile.age == age && profile.color == color && profile.animal == animal) {
          return true;
        }
      });
      if (matchProfile == undefined) { //if the profile does not match the existing one add new profile
        const childProfile = {
          age: age,
          color: color,
          animal: animal
        }
        foundUser.profiles.push(childProfile)
        const savedUser = await foundUser.save().catch(err => {console.log("Saving user error when adding profile: " + err)})
        const foundProfiles = await User.findById(savedUser._id, 'profiles').catch(err => {console.log("Finding profiles error: " + err)})
        const childObject = foundProfiles.profiles.find((object, index) => { //search for profile
          if (object.age == age && object.color == color && object.animal == animal) {
            return true
          }
        });
        res.json({
          message: "success",
          profileID: childObject._id
        })
      } else {
        res.json({
          message: "match",
          profileID: null
        })
      }
    }
  } catch (err) {
    console.log(err)
  }

}


const verifyEmailForReset = async (req, res) => {
  const foundUser = await User.findOne({username: req.body.email}).catch(err => {
    console.log("Finding user error when verifying email: " + err)
  }) // check if the account exists in database
  if (foundUser == null) {
    res.json({
      message: "invalid"
    })
  } else {
    const result = await Auth(req.body.email, "ReadPal").catch(err => {console.log("Sending Otp error wehn verifying for reset: " + err)})
    if (result.success == true) {
      const foundOtp = await Otp.findOne({email: req.body.email}).catch(err => {console.log("Finding Otp error when verifying email for reset: " + err)})
      if (foundOtp == null) {
        const newOtp = new Otp({
          email: req.body.email,
          otp: result.OTP
        })
        newOtp.save()
      } else { // the email exists ( which means this is not the first time the user requests a otp)
        foundOtp.otp = result.OTP; // update new otp to the document
        foundOtp.save()
      }
      res.json({
        message: "success"
      })
    } else {
      console.log("Error when sending otp to user");
    }
  }
}


const resetPassword = async (req, res) => {
  const {
    otp,
    password
  } = req.body
  const foundOtp = await Otp.findOneAndDelete({otp: otp}).catch(err => {console.log("Finding Otp error when reseting password: " + err)})
  if (foundOtp == null) {
    res.json({
      message: "invalid"
    })
  } else {
    const foundUser = await User.findOne({
      username: foundOtp.email
    }).catch(err => {
      console.log("Finding user error when reseting password: " + err)
    })
    const user = await foundUser.setPassword(password).catch(err => {
      console.log("Setting password error: " + err)
    })
    foundUser.save();
    res.json({
      message: "success"
    })
  }
}


const returnProfiles = async (req, res) => {
  const userID = req.params.userID
  // const imagesList = [];
  const foundUser = await User.findById({_id: userID}).lean().catch(err => {       // lean(): foundUser can be modified locally (not attached to the db)
    console.log("Finding user error when returning profiles: " + err)
  })
  if (foundUser != null) {
    foundUser.profiles.forEach((profile, index, profilesList) => {
      const bucketParams = {          //find the image that match the profile
        Bucket: 'library.stories',
        Key: `profileImages/${profile.animal.toLowerCase()}_-_${profile.color.toLowerCase()}1024_1.jpg`
      }
      s3.getObject(bucketParams, function (err, data) {
        if (err) {
          console.log("Error", err)
        } else {
          const image = Buffer.from(data.Body).toString('base64')
          profile.icon = image
          // imagesList.push(image);
          if (index === profilesList.length - 1) {
            // console.log(imagesList.length);
            setTimeout(() => {
              res.json({
                message: "success",
                profiles: foundUser.profiles
              })
            }, 50);
          }
        }
      });
    })
  } else {
    res.json({
      message: "invalid",
      profiles: null
    })
  }
}


const userLogout = (req, res) => {
  req.logout()
  res.json({
    message: "success"
  })
}



export {
  verifyEmailForSignup,
  userSignup,
  userLogin,
  addProfile,
  returnProfiles,
  verifyEmailForReset,
  resetPassword,
  userLogout
}
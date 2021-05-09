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

// router.get("/", (req, res) => {
//   res.render("home");
// })// change it


// router.get("/login", (req, res) => {
//   res.render("Login");
// })  // change it

// router.get("/register", (req, res) => {
//   res.render("Register");
// })// change it


// router.get("/auth/google", passport.authenticate("google", {
//   scope: ["profile"]
// }));

// router.get('/auth/google/secrets',
//   passport.authenticate('google', {
//     failureRedirect: "/login",
//     successRedirect: "/secrets"
//   }));


router.post("/server/register",(req, res) => {
  const {firstname, lastname, organization, country, email, password, otp} = req.body;
  // const result = await Auth(email, "Readpal");
  Otp.findOne({email: email, otp: otp}, (err, foundOtp) =>{        //find otp and email 
    if(foundOtp){                                                       // if the sent otp and the otp in the database matches, create a new user
      const newUser = new User({username: email, firstName: firstname, lastName: lastname, organization: organization, country: country});
      User.register(newUser, password, (err, user) => {
        // console.log(user._id);
        if (err) {
          console.log(err);
          // res.redirect("/register"); // change it
        } else {
          req.login(user, function(err) {
            if (err) {
              return next(err);
            } else {
              // res.redirect('/secrets'); // change it
              res.json({message: "success", userID: user._id});
            }
          });
        }
      });
      Otp.deleteOne({email: foundOtp.email}, (err)=>{                 //After successfully created a new user, delete the otp    
        console.log(err);
      })
    }else{
      res.json({message: "invalid"});
    }
  })
})

router.post("/server/verify", async (req,res)=>{
  try {
    const result = await Auth(req.body.email, "ReadPal");
    if(result.success == true){
      Otp.findOne({ email: req.body.email}, (err, foundOtp) => {    //check if the email exists in the database 
         if(err){
            console.log(err);
         } else{  // the email exists ( which means this is not the first time the user requests a otp)
          if(foundOtp == null){
            const newOtp = new Otp({email: req.body.email, otp: result.OTP});
            newOtp.save();
          }else{
            foundOtp.otp = result.OTP;   // add new otp to the document
            foundOtp.save();
          }
           
         }
      });
      res.json({message: 'success'});
    }else{
      res.json({message: "invalid"});
    }
  } catch (error) {
    console.log(error);
  }
})


// router.post('/server/login', passport.authenticate('local', (req,res)=>{   // change it
// //   User.findOne({ username: req.user.username}, (err, foundUser) => {    
// //     if(err){
// //        console.log(err);
// //        res.json({message: "invalid"})
// //     } else{  
// //       res.json({message: "success", userID: foundUser._id});
// //     }
// //  });
// res.json({message: "success"});
// }));

router.post('/server/login',
  passport.authenticate('local'),
  function(req, res) {
    res.json({userID: req.user._id});
  });

router.get("/server/logout", (req, res) => {
  req.logout();
  res.json({message: "success"});
})

router.post("/server/:userID/profile", (req,res)=>{ 
  const userID = req.params.userID;
  const {age, color, animal} = req.body;     
  User.findById({_id: userID}, (err,  foundUser) => {
     if(err){
         console.log(`Error: ` + err)
         res.json({message: "invalid"});
     } else{
       if(!foundUser){
          res.json({message: "invalid"});
          //  console.log("message")
       } else{
          const childProfile = { age: age, color: color, animal: animal};
          foundUser.profiles.push(childProfile);
          foundUser.save();
          res.json({message: "success"});
          //res.json(foundUser);
       }
     }
  });
})



// router.get("/secrets", (req, res) => {
//   if (req.isAuthenticated()) {
//     res.render("secrets");
//   } else {
//     res.redirect("/login");
//   }
// })// change it
export default router;

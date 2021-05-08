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
const Auth = require("two-step-auth");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
})// change it


router.get("/login", (req, res) => {
  res.render("Login");
})  // change it

router.get("/register", (req, res) => {
  res.render("Register");
})// change it


// router.get("/auth/google", passport.authenticate("google", {
//   scope: ["profile"]
// }));

// router.get('/auth/google/secrets',
//   passport.authenticate('google', {
//     failureRedirect: "/login",
//     successRedirect: "/secrets"
//   }));


router.post("/register", async (req, res) => {
  const {firstname, lastname, organization, country, email, password} = req.body;
  const result = await Auth(email, "Readpal");
  if(result.success == true){
    const newUser = new User({username: email, firstName: firstname, lastName: lastname, organization: organization, country: country});
    User.register(newUser, password, (err, user) => {
      // console.log(user._id);
      if (err) {
        console.log(err);
        res.redirect("/register"); // change it
      } else {
        req.login(user, function(err) {
          if (err) {
            return next(err);
          } else {
            res.redirect('/secrets'); // change it
            // res.json({user: user, otp: result.OTP});
          }
        });
      }
      
    });
  }else{
    res.send("Email is invalid");
  }

})

// router.post("/otp", async (req,res)=>{
//   const result = await Auth(req.body.email, "ReadPal");
//   if(result.success == true){
//     res.send(result.OTP);
//   }else{
//     res.send("Email is invalid");
//   }
// })

router.post('/login', passport.authenticate('local', {successRedirect: '/secrets', failureRedirect: '/'}, (req,res)=>{   // change it
  res.json(req.user)
}));

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect('/');// change it
})

router.post("/:userID/profile", (req,res)=>{ 
  const userID = req.params.userID;
  const {age, color, animal} = req.body;     
  User.findById({_id: userID}, (err,  foundUser) => {
     if(err){
         console.log(`Error: ` + err)
     } else{
       if(!foundUser){
           console.log("message")
       } else{
          const childProfile = { age: age, color: color, animal: animal};
          foundUser.profiles.push(childProfile);
          foundUser.save();
          //res.json(foundUser);
       }
     }
  });
})



router.get("/secrets", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("secrets");
  } else {
    res.redirect("/login");
  }
})// change it
export default router;

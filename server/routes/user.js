//jshint esversion:6
import {
  createRequire
} from 'module';
const require = createRequire(
  import.meta.url);
import express from "express";
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalmongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
import User from "../database/userModel.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
})
router.get("/login", (req, res) => {
  res.render("Login");
})

router.get("/register", (req, res) => {
  res.render("Register");
})


router.get("/auth/google", passport.authenticate("google", {
  scope: ["profile"]
}));

router.get('/auth/google/secrets',
  passport.authenticate('google', {
    failureRedirect: "/login",
    successRedirect: "/secrets"
  }));


router.post("/register", (req, res) => {
  User.register({
    username: req.body.username
  }, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      req.login(user, function(err) {
        if (err) {
          return next(err);
        } else {
          res.redirect('/secrets');
        }
      });
    }
  });
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/secrets',
  failureRedirect: '/'
}));

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect('/');
})

router.get("/secrets", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("secrets");
  } else {
    res.redirect("/login");
  }
})
export default router;

//jshint esversion:6
import { createRequire } from "module"
const require = createRequire(import.meta.url)
require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express")
const session = require("express-session")
const passport = require("passport")
import User from "./models/userModel.js"
import userRouter from "./routes/user.js"
import storageRouter from "./routes/storage.js"
import cors from "cors"
import MongoStore from "connect-mongo"
//const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const findOrCreate = require("mongoose-findorcreate");
const path = require("path")
const LocalStrategy = require('passport-local').Strategy

const app = express()
app.use(express.urlencoded({ limit: "200mb", extended: true }))
app.use(express.json())
app.use(cors({
  credentials: true, 
  origin: "https://www.storybook.academy", 
  allowedHeaders: ["Content-Type","Authorization","X-Requested-With","X-Forwarded-Proto", "cookie","set-cookie"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  //exposedHeaders: ["Content-Type","Authorization","X-Requested-With","X-Forwarded-Proto","cookie","set-cookie"]
  }
))

// Add headers
// app.use(function (req, res, next) {

//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'https://www.storybook.academy');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, cookie, set-cookie');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// });

app.use(
  session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.CONNECTION_URL,
    }),
    unset: 'destroy'
  })
)

app.use(passport.initialize())
app.use(passport.session())


mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }).then( ()=>{
    console.log("Database connected")
  }).catch( error => {
    console.log(error)
  });

mongoose.set("useCreateIndex", true)

// passport.use(User.createStrategy())
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username.toLowerCase() }, function (err, user) {
      return done(null, user);
    });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id)
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

// passport.use(new GoogleStrategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/auth/google/secrets",
//     userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({
//       googleId: profile.id
//     }, function(err, user) {
//       return cb(err, user);
//     });
//   }
// ));



app.use("/server/user", userRouter)
app.use("/server/library", storageRouter)
  
 let __dirname = path.resolve();
 app.use(express.static(path.join(__dirname, "build")));
 app.get("/*", (req, res) => {
   res.sendFile(path.join(__dirname, "build", "index.html"));
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

app.listen(port, function () {
  console.log("Server started");
})

import {createRequire} from 'module';
const require = createRequire(import.meta.url);
import express from "express";
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalmongoose = require("passport-local-mongoose");

const getStory = (req, res) => {

}

const getAllStoriesThumbnails = (req, res) => {
     const bucketParams = {
          Bucket : 'library.stories',
          Prefix : 'stories/'
        }

        s3.listObjects(bucketParams, function(err, data) {
          if (err) {
            console.log("Error", err);
          } else {
            console.log("Success", data);
          }
        });
}











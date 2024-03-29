//jshint esversion:6
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import express from "express";
const passport = require("passport");
import s3 from "../aws/s3.js";
import User from "../models/userModel.js";
import Otp from "../models/otpModel.js";
import Profile from "../models/profileModel.js";
const { Auth } = require("two-step-auth");
import nodemailer from "nodemailer";
import axios from "axios";
import moment from "moment";

const transporter = nodemailer.createTransport({
  /// this is the email I created for sending emails to students on behalf of teacher
  service: "gmail",
  auth: {
    user: "donotreply@storybook.academy",
    pass: "EmailSender",
  },
});

const userLogin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err); // will generate a 500 error
    }

    if (!user) {
      return res.json({
        message: "invalid",
        userID: null,
      });
    }

    req.login(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }

      return res.json({
        message: "success",
        userID: req.user._id,
      });
    });
  })(req, res, next);
};

const userSignup = async (req, res) => {
  const { firstname, lastname, organization, country, email, password, otp } =
    req.body;
  const foundOtp = await Otp.findOneAndDelete({
    email: email.toLowerCase(),
    otp: otp,
  }).catch((err) => {
    console.log("Finding Otp error when signing up: " + err);
  });
  if (foundOtp) {
    // if the sent otp and the otp in the database matches, create a new user
    const newUser = new User({
      username: email.toLowerCase(),
      firstName: firstname,
      lastName: lastname,
      organization: organization,
      country: country,
    });
    const user = await User.register(newUser, password).catch((err) => {
      console.log("Registering user error: " + err);
    });
    req.login(user, (err) => {
      if (err) {
        return next(err);
      } else {
        res.json({
          message: "success",
          userID: user._id,
        });
      }
    });
  } else {
    res.json({
      message: "invalid",
    });
  }
};

const verifyEmailForSignup = async (req, res) => {
  if (!req.body.email) {
    return res.json({ message: "missing body" });
  }
  const foundUser = await User.findOne({
    username: req.body.email.toLowerCase(),
  }).catch((err) => {
    console.log("Finding user error: " + err);
  });
  if (foundUser == null) {
    const result = await Auth(
      req.body.email.toLowerCase(),
      "Storybook.Academy"
    ).catch((err) => {
      console.log("Sending Otp error when verifying email for signup: " + err);
    });
    if (result.success == true) {
      const foundOtp = await Otp.findOne({
        email: req.body.email.toLowerCase(),
      }).catch((err) => {
        console.log("Finding Otp error: " + err);
      });
      if (foundOtp == null) {
        const newOtp = new Otp({
          email: req.body.email.toLowerCase(),
          otp: result.OTP,
        });
        newOtp.save();
      } else {
        // the email exists ( which means this is not the first time the user requests a otp)
        foundOtp.otp = result.OTP; // update new otp to the document
        foundOtp.save();
      }
      res.json({
        message: "success",
      });
    } else {
      res.json({
        message: "invalid",
      });
    }
  } else {
    res.json({
      message: "match",
    });
  }
};

const addProfile = async (req, res) => {
  // done
  const userID = req.params.userID;

  if (!req.body.age || !req.body.color || !req.body.animal || !req.body.name) {
    return res.json({ message: "missing body" });
  }

  const { age, color, animal, name } = req.body;

  try {
    let foundUser = await User.findById({ _id: userID }).catch((err) => {
      console.log("Finding user error when adding profile: " + err);
    });
    if (foundUser == null) {
      res.json({
        message: "invalid",
        profileID: null,
      });
    } else {
      const matchProfile = await Profile.findOne({ name: name }).catch((err) =>
        console.log("Find the profile name error: " + err)
      );
      if (matchProfile == undefined || matchProfile == null) {
        //if the profile does not match the existing one add new profile
        const childProfile = new Profile({
          name: name,
          age: age,
          color: color,
          animal: animal,
          parent: foundUser._id,
        });

        await childProfile
          .save()
          .catch((err) => console.log("Saving profile error: " + err));
        foundUser.profiles.push({ _id: childProfile._id });
        await foundUser.save();
        //foundUser = await User.findById({_id: foundUser._id}).populate("profiles")
        res.json({
          message: "success",
          profileID: childProfile.name,
          //profile: foundUser
        });
      } else {
        res.json({
          message: "match",
          profileID: null,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const addStudent = async (req, res) => {
  const userID = req.params.userID;
  try {
    if (!req.body.student) {
      return res.json({ message: "missing body" });
    }
    const student = req.body.student;

    const foundUser = await User.findById({ _id: userID }).catch((err) => {
      console.log("Finding user error when adding student: " + err);
    }); // find the user the wants to add friend
    const foundStudent = await Profile.findOne({ name: student })
      .populate("parent")
      .catch((err) => {
        console.log("Finding student error when adding student: " + err);
      }); // find the student that user wants to add friend

    if (
      foundUser == null ||
      foundStudent == null ||
      foundStudent.parent === foundUser._id
    ) {
      // student and user both have to exist first, and teacher cannot add his/her own child as a student.
      res.json({ message: "invalid" });
    } else {
      const foundID = foundUser.students.find(
        (student) => student._id.toString() === foundStudent._id.toString()
      ); // find if the user already added student
      if (foundID === undefined) {
        // if not exists then add the student to the student list of user
        foundUser.students.push({ _id: foundStudent._id });
        await foundUser.save().catch((err) => {
          console.log("Saving user error when adding student: " + err);
        });
        foundStudent.teacher = foundUser._id; // currently there could be chances that parent of student could also be the teacher of that student as well
        await foundStudent
          .save()
          .catch((err) =>
            console.log("Add teacher to the student profile error: " + err)
          );
        res.json({
          message: "success",
          studentID: foundStudent.name,
          //user: foundUser
        });
      } else {
        res.json({ message: "match" });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const addFriend = async (req, res) => {
  try {
    if (!req.body.profile || !req.body.profileToAdd) {
      return res.json({ message: "missing body" });
    }
    const profile = req.body.profile;
    const profileToAdd = req.body.profileToAdd;

    const foundProfile = await Profile.findOne({ name: profile })
      .populate("parent")
      .catch((err) => {
        console.log("Finding profile error when adding friend: " + err);
      }); // find the profile
    const foundProfileToAdd = await Profile.findOne({ name: profileToAdd })
      .populate("parent")
      .catch((err) => {
        console.log("Finding friend to add error : " + err);
      }); // find profile to add

    if (
      foundProfile == null ||
      foundProfileToAdd == null ||
      profile === profileToAdd ||
      foundProfile.parent === foundProfileToAdd.parent
    ) {
      // student and user both have to exist first, they cannot add friend to themselves and 2 profiles with the same parent cannot be friends.
      res.json({ message: "invalid" });
    } else {
      const foundFriend = foundProfile.friends.find(
        (friend) => friend._id.toString() === foundProfileToAdd._id.toString()
      ); // find if the user already added friend to this profile
      //console.log(foundFriend)
      if (foundFriend === undefined) {
        // if not exists then add friend
        foundProfile.friends.push({ _id: foundProfileToAdd._id });
        await foundProfile.save().catch((err) => {
          console.log("Saving friend error when adding friend: " + err);
        });

        foundProfileToAdd.friends.push({ _id: foundProfile._id });
        await foundProfileToAdd.save().catch((err) => {
          console.log("Saving friend error when adding friend: " + err);
        });
        res.json({
          message: "success",
          //user: foundUser
        });
      } else {
        res.json({ message: "match" });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const returnStudents = async (req, res) => {
  const userID = req.params.userID;
  const foundUser = await User.findById({ _id: userID })
    .populate("students")
    .catch((err) => {
      console.log("Finding user error when returning students: " + err);
    });
  if (foundUser != null) {
    //console.log(foundUser.students)
    res.json({
      message: "success",
      students: foundUser.students,
    });
  } else {
    res.json({
      message: "invalid",
    });
  }
};

const verifyEmailForReset = async (req, res) => {
  if (!req.body.email) {
    return res.json({ message: "missing body" });
  }
  const foundUser = await User.findOne({
    username: req.body.email.toLowerCase(),
  }).catch((err) => {
    console.log("Finding user error when verifying email: " + err);
  }); // check if the account exists in database
  if (foundUser == null) {
    res.json({
      message: "invalid",
    });
  } else {
    // there is an account associacted with this email
    const result = await Auth(
      req.body.email.toLowerCase(),
      "Storybook.Academy"
    ).catch((err) => {
      console.log("Sending Otp error wehn verifying for reset: " + err);
    }); // send otp code to this email
    if (result.success == true) {
      const foundOtp = await Otp.findOne({
        email: req.body.email.toLowerCase(),
      }).catch((err) => {
        console.log("Finding Otp error when verifying email for reset: " + err);
      });
      if (foundOtp == null) {
        // the email does not exist, this is the first time the user request otp code
        const newOtp = new Otp({
          email: req.body.email.toLowerCase(),
          otp: result.OTP,
        });
        newOtp.save();
      } else {
        // the email exists ( which means this is not the first time the user requests a otp)
        foundOtp.otp = result.OTP; // update new otp to the document
        foundOtp.save();
      }
      res.json({
        message: "success",
      });
    } else {
      console.log("Error when sending otp to user");
    }
  }
};

const resetPassword = async (req, res) => {
  if (!req.body.otp || !req.body.password) {
    return res.json({ message: "missing body" });
  }

  const { otp, password } = req.body;

  const foundOtp = await Otp.findOneAndDelete({ otp: otp }).catch((err) => {
    console.log("Finding Otp error when resetting password: " + err);
  }); // find if the given otp code exists in the db
  if (foundOtp == null) {
    // given otp code does not exist
    res.json({
      message: "invalid",
    });
  } else {
    const foundUser = await User.findOne({
      username: foundOtp.email.toLowerCase(), // use the email associated with the otp code to find the user
    }).catch((err) => {
      console.log("Finding user error when resetting password: " + err);
    });
    const user = await foundUser.setPassword(password).catch((err) => {
      // set the password by using the given password
      console.log("Setting password error: " + err);
    });
    foundUser.save();
    res.json({
      message: "success",
    });
  }
};

const returnProfiles = async (req, res) => {
  const userID = req.params.userID;
  const foundUser = await User.findById({ _id: userID })
    .populate("profiles")
    .lean()
    .catch((err) => {
      // lean(): foundUser can be modified locally (not attached to the db), find the user based on the given user id
      console.log("Finding user error when returning profiles: " + err);
    });
  if (foundUser != null) {
    // if exists
    Promise.all(
      foundUser.profiles.map(async (profile, index, profilesList) => {
        // for each profile, attach the an image to the profile by calling to the Aws S3
        const bucketParams = {
          //find the image that match the profile
          Bucket: "library.stories",
          Key: `profileImages/${profile.color.toLowerCase()}_${profile.animal.toLowerCase()}.png`,
        };
        await addImageToProfile(bucketParams, profile); // add image to the given profile
      })
    ).then(() => {
      //console.log(foundUser.profiles)
      res.json({
        message: "success",
        profiles: foundUser.profiles,
      });
    });
  } else {
    res.json({
      message: "invalid",
      profiles: null,
    });
  }
};

const returnFriends = async (req, res) => {
  const profileID = req.params.profileID;
  const foundProfile = await Profile.findOne({ name: profileID })
    .populate("friends", "-_id name age color animal")
    .catch((err) =>
      console.log("Finding profile id error when returning friends: " + error)
    );
  if (foundProfile !== null) {
    res.json({ message: "success", friends: foundProfile.friends });
  } else {
    res.json({ message: "invalid", friends: null });
  }
};

// This method is get called from the returnProfiles method
const addImageToProfile = (bucketParams, profile) => {
  return new Promise((resolve) => {
    s3.getObject(bucketParams, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        const image = Buffer.from(data.Body).toString("base64");
        profile.icon = image;
        //console.log(profile)
        resolve();
      }
    });
  });
};

const userLogout = (req, res) => {
  req.logout();
  res.json({
    message: "success",
  });
};

const authenticateUser = (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ message: "success" });
  } else {
    res.json({ message: "invalid" });
  }
};

const sendEmailToCallee = async (req, res) => {
  if (!req.body.callee || !req.body.username) {
    return res.json({ message: "missing body" });
  }

  const { callee, username } = req.body;
  const foundCallee = await Profile.findOne({ name: callee })
    .populate("parent")
    .catch((err) => {
      console.log("Finding callee error: " + err);
    }); // find the user

  const foundCaller = await User.findById({ _id: username }).catch((err) =>
    console.log("Finding caller error: " + err)
  ); // find the student that user wants to call

  const startDate = moment().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  const endDate = moment().add(1, "hours").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

  const requestBody = {
    startDate: startDate, // start time for the meeting
    endDate: endDate, // end time for the meeting
    fields: ["hostRoomUrl"],
  };

  const configBody = {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      "Content-Type": "application/json",
    },
  };

  if (foundCallee !== null && foundCaller !== null) {
    axios
      .post("https://api.whereby.dev/v1/meetings", requestBody, configBody)
      .then((response) => {
        // call the whereby api to create the room to call
        if (response.status == 201) {
          const mailOptions = {
            // use this email to send the room url to the callee
            from: "donotreply@storybook.academy",
            to: `${foundCallee.parent.username}`,
            subject: "Reading Time",
            html: `<h1>Hey friend</h1><p>Please paste this line on the join call box: <b>${response.data.roomUrl.slice(
              40
            )}</b> to join the call with your friend!</p>`,
          };

          transporter.sendMail(mailOptions, function (error) {
            if (error) {
              console.log(error);
            } else {
              res.json({
                message: "success",
                hostRoomUrl: response.data.hostRoomUrl,
              }); // send back the room url to the caller
            }
          });
        }
      })
      .catch((err) => console.log(err));
  } else {
    res.json({ message: "invalid" });
  }
};

export {
  verifyEmailForSignup,
  userSignup,
  userLogin,
  addProfile,
  returnProfiles,
  verifyEmailForReset,
  resetPassword,
  userLogout,
  authenticateUser,
  addStudent,
  returnStudents,
  sendEmailToCallee,
  addFriend,
  returnFriends,
};

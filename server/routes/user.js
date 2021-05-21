import express from "express";
import {verifyEmailForSignup, userSignup, userLogin, addProfile, returnProfiles, verifyEmailForReset, resetPassword, userLogout} from "../controllers/userController.js"

const userRouter = express.Router();

// router.get("/auth/google", passport.authenticate("google", {
//   scope: ["profile"]
// }));

// router.get('/auth/google/secrets',
//   passport.authenticate('google', {
//     failureRedirect: "/login",
//     successRedirect: "/secrets"
//   }));

userRouter.post("/server/verify", verifyEmailForSignup)

userRouter.post("/server/register", userSignup)

userRouter.post('/server/login', userLogin)

userRouter.post("/server/:userID/profile", addProfile)

userRouter.get("/server/:userID/profiles", returnProfiles)

userRouter.post("/server/forgot", verifyEmailForReset)

userRouter.patch("/server/reset", resetPassword)

userRouter.get("/server/logout", userLogout)

export default userRouter;

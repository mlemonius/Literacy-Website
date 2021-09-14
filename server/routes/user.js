import express from "express";
import {verifyEmailForSignup, userSignup, userLogin, addProfile, returnProfiles, verifyEmailForReset, resetPassword, userLogout, authenticateUser, addStudent, returnStudents, sendEmailToStudent} from "../controllers/userController.js"

const userRouter = express.Router();

// router.get("/auth/google", passport.authenticate("google", {
//   scope: ["profile"]
// }));

// router.get('/auth/google/secrets',
//   passport.authenticate('google', {
//     failureRedirect: "/login",
//     successRedirect: "/secrets"
//   }));


/*-----------------------User Authentication-----------------------------------*/

userRouter.post("/verify", verifyEmailForSignup)

userRouter.post("/register", userSignup)

userRouter.post('/login', userLogin)

userRouter.post("/forgot", verifyEmailForReset)

userRouter.patch("/reset", resetPassword)

userRouter.get("/logout", userLogout)

userRouter.get("/authenticate", authenticateUser)

userRouter.post("/:userID/student", addStudent)
userRouter.get("/:userID/students", returnStudents)

userRouter.post("/send", sendEmailToStudent)

/*-----------------------User Profile CRUD Operations-----------------------------------*/

userRouter.post("/:userID/profile", addProfile)

userRouter.get("/:userID/profiles", returnProfiles)

// userRouter.get("/profiles/images")




export default userRouter;

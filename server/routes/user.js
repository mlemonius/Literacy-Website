import express from "express";
import { verifyEmailForSignup, userSignup, userLogin, addProfile, returnProfiles, verifyEmailForReset, resetPassword, userLogout, authenticateUser, addStudent, returnStudents, sendEmailToStudent } from "../controllers/userController.js"

const userRouter = express.Router();

/*-----------------------User Authentication-----------------------------------*/

userRouter.post("/verify", verifyEmailForSignup)

userRouter.post("/register", userSignup)

userRouter.post('/login', userLogin)

userRouter.post("/forgot", verifyEmailForReset)

userRouter.patch("/reset", resetPassword)

userRouter.get("/logout", userLogout)

userRouter.post("/authenticate", authenticateUser)

userRouter.post("/:userID/student", addStudent)

userRouter.get("/:userID/students", returnStudents)

userRouter.post("/send", sendEmailToStudent)

/*-----------------------User Profile CRUD Operations-----------------------------------*/

userRouter.post("/:userID/profile", addProfile)

userRouter.get("/:userID/profiles", returnProfiles)





export default userRouter;

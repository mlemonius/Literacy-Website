import express from "express";
import {verifyEmailForSignup, userSignup, userLogin, addProfile, returnProfiles, verifyEmailForReset, resetPassword, userLogout} from "../controllers/userController.js"

const storageRouter = express.Router();

storageRouter.get("/story")

storageRouter.get("/thumbnails")

//userRouter.post("/server/verify", verifyEmailForSignup)
import express from "express"
import {getStory, getAllStoriesTitles} from "../controllers/storageController.js"

const storageRouter = express.Router()

storageRouter.get("/story", getStory)

storageRouter.get("/titles", getAllStoriesTitles)

export default storageRouter
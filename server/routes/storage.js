import express from "express"
import { getStory, getAllStoriesDetails } from "../controllers/storageController.js"

const storageRouter = express.Router()

storageRouter.get("/story", getStory)

storageRouter.get("/titles", getAllStoriesDetails)

export default storageRouter
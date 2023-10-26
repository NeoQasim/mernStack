// import { express } from "express";
import express from 'express'
import { authUser, getUserProfile, registerUser, updateUserProfile, logoutUser } from "../Controller/userController.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router()
router.post("/", registerUser)
router.post("/auth", authUser)
router.post("/logout", logoutUser)
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile)

// export {userroutes}
export default router
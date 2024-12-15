import express from 'express';
import { signup, login, logout, updateProfile, checkAuth } from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/auth.middlewares.js';


const router = express.Router();


router.post("/signup", signup); //when a post request is made to /signup, signup function is called from auth.controller.js

router.post("/login", login);

router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile); //protect route helps only log in users to upadate their profile.

router.get("/check", protectRoute, checkAuth); //to check if the user is logged in or not. Whenever a user refresh we call this function and check if he is log in or not. If he is logged in we take them to either profile or login page.

export default router;

import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {

        //chceck for all the fields

        if (!fullName || !email || !password) {

            return res.status(400).json({ message: "All fields are required to signup/signin" });

        }


        // check if password is atleast 6 characters long
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 6 characters long" });
        }
        // check if user already exists

        const user = await User.findOne({
            email
        });
        // if userv already exists return error
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }

        //hashing password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //creating new user with hashed password

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        if (newUser) {
            // generate jwt token
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({ _id: newUser._id, fullName: newUser.fullName, email: newUser.email, profilePic: newUser.profilePic });


        } else {
            res.status(400).json({ message: "Invalid User Credentials" });
        }






        //res.send("Signup route");
    } catch (error) {
        console.log("Error in Signup Controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        //check for correct password.
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        })

    } catch (error) {
        console.log("Error in Login Controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });

    }
};

export const logout = (req, res) => {
    //just clear out the cookies.
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged Out Successfully" });
    } catch (error) {
        console.log("Error in Logout Controler", error.message);
        res.status(500).json({ message: "Internal Server Error" });

    }
};

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({ message: "Profile Picture is required" });
              ;
        }

        const uplaodResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uplaodResponse.secure_url }, { new: true });
        res.status(200).json(updatedUser);

    } catch (error) {
        console.log("Error in Update Profile Controller", error.message);
        res.staus(500).json({ message: "Internal Server Error" });


    }
};

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in Check Auth Controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });

    }
};
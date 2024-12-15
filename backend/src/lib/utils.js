//creating a function to generate jwt token which will be used in the signup route and diffrentiates between users.
//basically we are creating a token for when a user signup . This is stored in cookie and sent to client, so server can verify user data without having to ask for it again and again.
import jwt from "jsonwebtoken";
export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" })
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // MS
        httpOnly: true, //prevents access to the cookie from javascript XSS attacks
        sameSite: "strict", //CSRF attacks cross site request forgery
        secure: process.env.NODE_ENV !== "development"
    })

    return token;
};

//saving the token in the cookie
//maxAge is the time in milliseconds that the cookie will last for


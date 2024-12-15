import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(

    {
        email: {
            type: String,
            required: true,
            uninque: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        profilePic: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true // to include createdAt and updatedAt so we can know when the user was created and when it was last updated for features like last seen.
    }


);

const User = mongoose.model("User", userSchema);
export default User;
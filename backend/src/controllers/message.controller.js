import Message from '../models/message.model.js';
import User from '../models/user.model.js';
import cloudinary from '../lib/cloudinary.js';
import { getReceiverSocketId, io } from '../lib/socket.js';

// We fetch all the users in our Sidebar except ourselves.
//we want every single user but not ourselves. So we will filter out the logged in user.
export const getUsersForSidebar = async (req, res) => {
    try {

        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Erron in getUsersForSidebar", error.message);
        res.status(500).json({ message: "Internal Server Error" });



    }

};

// We need to fetch messages between two users.
/*
    db query fetches all the messages where we are the sender or we are the reciever.
*/
export const getMessages = async (req, res) => {

    try {
        const { id: userToChatId } = req.params; //other party.
        const myId = req.user._id; //me

        const messages = await Message.find({
            $or: [
                { senderId: myId, recieverId: userToChatId },
                { senderId: userToChatId, recieverId: myId },
            ],
        });

        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessages Controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });


    }

};


// get msgs bw two users.
export const sendMessage = async (req, res) => {

    try {
        const { text, image } = req.body;
        const senderId = req.user._id;
        const { id: recieverId } = req.params;

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

       

        const receiverSocketId = getReceiverSocketId(recieverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);

        }

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage Controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



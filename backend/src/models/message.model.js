import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(

    {
        senderId: {  // senderId is ref to user model and is required because both sender and reciever are Users.
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        recieverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        text: {
            type: String,
        },
        image: {
            type: String
        },

    },
    {
        timestamps: true,
    }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
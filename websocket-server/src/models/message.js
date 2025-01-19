import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: String,
    timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;

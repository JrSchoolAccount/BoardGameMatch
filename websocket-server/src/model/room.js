import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        lastMessage: {
            message: { type: String },
            timestamp: { type: Date },
        },
    },
    { timestamps: true }
);

const Room = mongoose.model('Room', roomSchema);

export default Room;

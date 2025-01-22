import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
    sessionID: String,
    userID: String,
    username: String,
    connected: Boolean,
    expiresAt: Date,
});

export const Session = mongoose.model('Session', SessionSchema);

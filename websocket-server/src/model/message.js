const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    from: String,
    to: String,
    content: String,
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', MessageSchema);

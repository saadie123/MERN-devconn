const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    text: {
        type: String,
        required: true
    },
    name: String,
    avatar: String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('comments', commentSchema);
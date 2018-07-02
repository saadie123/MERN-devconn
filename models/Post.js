const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const postSchema = new mongoose.Schema({
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
    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comments'
        }
    ]
});
postSchema.plugin(deepPopulate, {
    populate: {
        'comments.user': {
            select: ['name', 'avatar']
        }
    }
});
module.exports = mongoose.model('posts', postSchema);
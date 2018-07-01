const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    company: String,
    website: String,
    location: String,
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: String,
    githubUsername: String,
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            location: String,
            from: {
                type: Date,
                required: true
            },
            to: Date,
            current: {
                type: Boolean,
                default: false
            },
            description: String
        }
    ],
    education: [
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            fieldofstudy: String,
            from: {
                type: Date,
                required: true
            },
            to: Date,
            current: {
                type: Boolean,
                default: false
            },
            description: String
        }
    ],
    social: {
        youtube: String,
        twitter: String,
        facebook: String,
        linkedin: String,
        instagram: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('profile', profileSchema);
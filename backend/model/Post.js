const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true,
        min: 1,
        max: 60
    },
    content: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    userId: {
        type: String
    },
    userName: {
        type: String
    },
    likes: {
        type: [String]
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);
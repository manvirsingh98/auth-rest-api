const mongoose = require('mongoose');

const websiteData = new mongoose.Schema({
    title: {
        type: String,
    },
    desc: {
        type: String,
    },
    user_id: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('WebsiteData', websiteData);
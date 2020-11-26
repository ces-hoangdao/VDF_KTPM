const mongoose = require('mongoose')

const Report = mongoose.model('Report',
    new mongoose.Schema({
        userID: String,
        campaignID: String,
        content: String
    })
);

module.exports = Report
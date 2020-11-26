const mongoose = require('mongoose');

const User = mongoose.Schema({
    Email: String,
    password: String,
});

module.exports = User
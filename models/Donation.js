const mongoose = require("mongoose")

const Donation = mongoose.model(
    "Donation",
    new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User'
        },
        campaign: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Campaign'
        },
        createDate: {
            type: Date,
            default: Date.now
        },
        message: String,
        amount: Number,
        method: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Method'
        }
    })
)

module.exports = Donation
const mongoose = require("mongoose")

const Campaign = mongoose.model(
    "Campaign",
    new mongoose.Schema({
        name: String,
        shortDescription: String,
        expiredDate: Date,
        createDate: {
            type: Date,
            default: Date.now
        },
        coverImageUrl: String,
        fullDescription: String,
        ownerId: String,
        categoryId: String,
        statusId: String,
        goal: Number,
        isDelete: Boolean
    })
)

module.exports = Campaign
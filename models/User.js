const mongoose = require("mongoose")

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    donation: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Donation'}
    ]
  })
);

module.exports = User
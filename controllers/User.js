const {mongoose} = require("mongoose")
const User = require("../models/User")


exports.test = (req, res) => {
  res.status(200).json({
    message: "test success"
  })
}
// create new user
exports.createUser =  (req, res) => {
  console.log(JSON.stringify(req.body))

  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });

  console.log(user.email)
  
  user.save().then((newUser) => {
      return res.status(201).json({
        success: true,
        message: 'New user created successfully',
        User: newUser,
      });
    })
    .catch((error) => {
        console.log(error);
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: error.message,
      });
    });
  }


// module.exports = { createUser }
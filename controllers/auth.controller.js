const {mongoose} = require("mongoose")
const db = require('../models')
const User = require('../models/User')
const config = require('../config/auth.config')

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signUp = (req, res) => {
    console.log("signUp: " + JSON.stringify(req.body))
    try {
        const user = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        })

        user.save().then((newUser) => {
            return res.status(201).json({
              success: true,
              message: 'New user created successfully',
              user: user.userName
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
    } catch (e) {
    }
}

exports.signIn = (req, res) => {
    User.findOne({
        userName: req.body.userName
    })
    .exec((err, user) => {
        if (err) {
            res.status(500).send({message: err})
            return
        }

        if (!user) {
            return res.status(404).send({ message: "User not found"})
        }

        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid password"
            })
        }

        let token = jwt.sign({ id: user.id}, config.secret, {
            expiresIn: 86400
        })

        res.status(200).send({
            id: user._id,
            userName: user.userName,
            email: user.email,
            accessToken: token
        })
    })
}
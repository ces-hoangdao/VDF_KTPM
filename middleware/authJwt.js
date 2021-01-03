const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')
const db  = require('../models')
const User = db.User

verifyToken = (req, res, next) => {
    let bearerHeader  = req.headers['authorization']
    
    if(typeof bearerHeader !== 'undefined'){
        //split the space at the bearer
        const bearer = bearerHeader.split(' ');
        //Get token from string
        const bearerToken = bearer[1];

        jwt.verify(bearerToken, config.secret, (err, decoded) => {
            if (err) {
                return res.status(401).send({message: 'Unauthorized'})
            }
            req.userId = decoded.id
            next()
        })

    }else{
        return res.status(403).send({message: "no token provided"})
    }
}

const authJwt = {
    verifyToken,
}

module.exports = authJwt
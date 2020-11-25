const { model } = require('../models/User')
const auth = require('./auth.route')
const user = require('./user.route')

module.exports = {
    auth,
    user
}
const auth = require('./auth.route')
const user = require('./user.route')
const campaign = require('./campaign.route')
const donation = require('./donation.route')

module.exports = {
    auth,
    user,
    campaign,
    donation
}
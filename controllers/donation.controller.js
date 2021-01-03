const Campaign = require("../models/Campaign")
const User = require("../models/User")
const Donation = require("../models/Donation")


exports.index = (req, res) => {
    const campaignId = req.param('campaignId')
    filter = {}
    if (campaignId) {
        filter = {campaign: campaignId}
    }
    Donation.find(filter)
        .populate('user')
        .exec(function (err, donations) {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).json(donations)
        })
}

exports.create = function (req, res) {
    req.body.user = req.userId
    console.log(req.body)
    Donation.create(req.body)
    .then((newDonation) => {
        addDonationToCampaign(newDonation._id, newDonation.campaign)
        addDonationToUser(newDonation._id, newDonation.user)
        return res.status(201).json({
            message: 'New donation created successfully',
            donation: newDonation
        })
    })
    .catch((err) => {
        return res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: err.message,
        })
    })
}

exports.show = (req, res) => {
    const donationId = req.param('donationId')
    Donation.findById(donationId, function(err, donation) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: error.message,
              });
        }
        return res.status(200).send(donation);
    })
}

exports.update = (req, res) => {
    
}

exports.destroy = (req, res) => {
    
}

const addDonationToCampaign = async (donationId, campaignId) => {
    console.log("addDonationToCampaign")
    let campaign = await Campaign.findOne({_id: campaignId});
    campaign.donation.push(donationId)
    campaign.save()
    console.log(campaign)
    return campaign
}

const addDonationToUser = async (donationId, userId) => {
    console.log("addDonationToUser")
    let user = await User.findOne({_id: userId});
    user.donation.push(donationId)
    user.save()
    console.log(user)
    return user
}
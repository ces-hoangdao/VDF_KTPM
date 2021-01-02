const {mongoose} = require("mongoose")
const db = require('../models')
const Campaign = require('../models/Campaign')
const config = require('../config/auth.config')

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { json } = require("body-parser");

exports.index = (req, res) => {
    console.log("campaign index: ");
    
    Campaign.find({}, function (err, campaigns) {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(campaigns)
    })
    .catch((err) => {

    })
}

exports.create = (req, res) => {
    console.log("create campaign: " + req);
    const campaign = new Campaign({
        name: req.body.name,
        shortDescription: req.body.shortDescription,
        expiredDate: req.body.expiredDate,
        coverImageUrl: req.body.coverImageUrl,
        fullDescription: req.body.fullDescription,
        ownerId: req.userId,
        categoryId: req.body.categoryId,
        statusId: req.body.statusId,
        goal: req.body.goal
    })

    campaign.save().then((newCampaign) => {
        return res.status(201).json({
            message: 'New campaign created successfully',
            campaign: campaign
        })
    })
    .catch((err) => {
        return err.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: error.message,
        })
    })
}

exports.show = (req, res) => {
    const campaignId = req.param('campaignId')
    Campaign.findById(campaignId, function(err, campaign) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: error.message,
              });
        }
        return res.status(200).send(campaign);
    })
}

exports.update = (req, res) => {
    const campaignId = req.param('campaignId')
    console.log("update campaign: " + campaignId)
    Campaign.findByIdAndUpdate(
        {_id: campaignId},
        req.body,
        function (err, campaign) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Server error. Please try again.',
                    error: error.message,
                })
            }

            return res.status(200).json({
                success: true,
                message: 'Update successfully.',
            })
        }
    )
}

exports.destroy = (req, res) => {
    const campaignId = req.param('campaignId')
    console.log("delete campaing: " + campaignId)
    Campaign.findByIdAndDelete(campaignId, function(err, campaign) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: error.message,
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Delete successfully.',
        })
    })
}




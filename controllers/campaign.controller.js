const {mongoose} = require("mongoose")
const db = require('../models')
const Campaign = require('../models/Campaign')
const config = require('../config/auth.config')

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { json } = require("body-parser");
const { user } = require("../models");

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

exports.indexByUserId = (req, res) => {
    const userId = req.param('userId')
    Campaign.find({ownerId: userId}, function(err, campaigns) {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(campaigns)
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
    const userId = req.userId
    console.log("update campaign: " + campaignId)

    Campaign.findOne({_id : campaignId}, function (err, campaign) {
        console.log("ownerId: " + campaign.ownerId)
        console.log("ownerId: " + userId)
        if (campaign.ownerId === userId) {
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
        } else {
            return res.status(200).json({
                success: true,
                message: 'unauthorized request',
            })
        }
    })
}

exports.destroy = (req, res) => {
    const campaignId = req.param('campaignId')
    const userId = req.userId

    Campaign.findOne({_id : campaignId}, function (err, campaign) {
        if (campaign.ownerId === userId) {
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
        } else {
            return res.status(200).json({
                success: true,
                message: 'Unauthorize request.',
            })
        }
    })
}




const Report = require("../models/Report.model.js");

// Create a Report

exports.createReport = (req, res) => {
  const report = new Report({
    userID: req.body.userID,
    campaignID: req.body.campaignID,
    content: req.body.content,
  });

  //Save a Report in the MongoDB
  report
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Can't not create report!",
        error: err.message,
      });
    });
};

// FETCH all reports
exports.report = (req, res) => {
  Report.find()
    .select("-__v")
    .then((reportInfo) => {
      res.status(200).json(reportInfo);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Error!",
        error: err,
      });
    });
};

//Get a report by id
exports.getReport = (req, res) => {
  Report.findById(req.params.id)
    .select("-__v")
    .then((report) => {
      res.status(200).json(report);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Report not found with id" + req.params.id,
          error: err,
        });
      }
      return res.status(500).send({
        message: "Error retrieving Customer with id " + req.params.id,
        error: err,
      });
    });
};

//Delete a Report
exports.deleteReport = (req, res) => {
  let reportId = req.params.id;
  Report.findByIdAndRemove(reportId)
    .select("-__v -_id")
    .then((report) => {
      if (!report) {
        res.status(404).json({
          message: "Does Not exist a Report with id = " + reportId,
          error: "404",
        });
      }
      res.status(200).json({});
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error -> Can NOT delete a report with id = " + reportId,
        error: err.message,
      });
    });
};

const errorHandeler = require("./errorHandeler.js");
const ReportListModel = require("./../Models/reportListModel");

exports.addReportItem = (req, res, next) => {
  errorHandeler(req);
  let object = new ReportListModel({
    name: req.body.name
  });
  object
    .save()
    .then((data) => res.status(200).json({ data }))
    .catch((error) => next(error));
};

exports.getReportItem = (req, res, next) => {
  errorHandeler(req);
  ReportListModel.find({})
  .then(data => {
      res.status(200).json({ message: "Report List", data})
  }).catch(err => next(err))
};

exports.updateReportItem = (req, res, next) => {
  errorHandeler(req);
};

exports.deleteReportItem = (req, res, next) => {
  errorHandeler(req);
};

const errorHandeler = require("./errorHandeler.js");
const ReportListModel = require("./../Models/reportListModel");

exports.addReportItem = (req, res, next) => {
  errorHandeler(req);
  let object = new ReportListModel({
    name: req.body.name,
  });
  object
    .save()
    .then((data) => res.status(200).json({ data }))
    .catch((error) => next(error));
};

exports.getReportItem = (req, res, next) => {
  errorHandeler(req);
  ReportListModel.find({})
    .then((data) => {
      res.status(200).json({ message: "Report List", data });
    })
    .catch((err) => next(err));
};

exports.updateReportItem = (req, res, next) => {
  errorHandeler(req);
  ReportListModel.updateOne(
    { _id: req.body._id },
    {
      $set: {
        name: req.body.name,
      },
    }
  )
    .then((data) => {
      res.status(200).json({ message: "updated", body: data });
    })
    .catch((err) => next(err));
};

exports.deleteReportItem = (req, res, next) => {
  errorHandeler(req);
  ReportListModel.deleteOne({ _id: req.body._id })
    .then((data) => {
      // TODO: delete related complain
      res.status(200).json({ data: "deleted", body: data });
    })
    .catch((err) => next(err));
};

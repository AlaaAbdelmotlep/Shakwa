const errorHandeler = require("./errorHandeler.js");
const ReportContentModel = require("./../Models/reportContentModel");
const AccountModel = require("./../Models/accountModel");

exports.addReport = (req, res, next) => {
  errorHandeler(req);
  let filesName = [];
  for (let i = 0; i < req.files.length; i++) {
    filesName.push(
      new Date().toLocaleDateString().replace(/\//g, "-") +
        "-" +
        req.files[i].originalname
    );
  }
  // console.log(req.user)
  // console.log("report controller body", req.body);
  // console.log("report controller file", req.files);

  let object = new ReportContentModel({
    account: req.user._id,
    type_id: req.body.type_id,
    report_lat: req.body.report_lat,
    report_long: req.body.report_long,
    reportFile: filesName,
    report_description: req.body.report_description,
  });
  object
    .save()

    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((err) => next(err));
};

exports.getReport = (req, res, next) => {
  errorHandeler(req);

  ReportContentModel.find({ account: req.user._id })
    .populate("type_id")
    .populate("account")
    .then((data) => {
      res.status(200).json({ message: "Reports", data });
    })
    .catch((err) => next(err));
};

exports.updateReport = (req, res, next) => {
  errorHandeler(req);

  let filesName = [];
  for (let i = 0; i < req.files.length; i++) {
    filesName.push(
      new Date().toLocaleDateString().replace(/\//g, "-") +
        "-" +
        req.files[i].originalname
    );
  }

  // issue : overwrite value => handeled in frontend

  ReportContentModel.find({ account: req.user._id })
    .updateOne(
      { _id: req.body._id },
      {
        $set: {
          type_id: req.body.type_id,
          report_lat: req.body.report_lat,
          report_long: req.body.report_long,
          reportFile: filesName,
          report_description: req.body.report_description,
        },
      }
    )
    .then((data) => {
      res.status(200).json({ message: "updated", body: data });
    })
    .catch((err) => next(err));
};

exports.deleteReport = (req, res, next) => {
  errorHandeler(req);

  ReportContentModel.find({ account: req.user._id })
    .deleteOne({ _id: req.body._id })
    .then((data) => {
      res.status(200).json({ data: "deleted", body: data });
    })
    .catch((err) => next(err));
};

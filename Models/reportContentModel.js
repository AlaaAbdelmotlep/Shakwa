const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
const ReportListModel = require("./../Models/reportListModel")
const AccountModel = require("./../Models/accountModel")

const schema = new mongoose.Schema(
  {
    _id: {
      type: Number,
    },
    account : {
      type : Number,
      ref : "account"
    },
    type_id: {
      type: Number,
      ref: "report_list",
    },
    report_lat: {
      type: Number,
    },
    report_long: {
      type: Number,
    },
    reportFile: [
      {
        type: String,
      },
    ],
    report_description: {
      type: String,
    },
  },
  { timestamps: { createdAt: 'created_at' } },
  { _id: false }
);

schema.pre("save" , function(next) {
  const report = this;
  ReportListModel.findByIdAndUpdate({_id: report.type_id }, {$inc: { counter: 1} }, function(error, ReportListModel)   {
    if(error)
        return next(error);
    next();
  });
})

// TODO : Decreament counter after doc delete
// schema.pre('deleteOne', { document: true, query: false }, function(next) {
//   const report = this;
//   ReportListModel.findByIdAndUpdate({_id: report.type_id }, {$inc: { counter: -1} }, function(error, ReportListModel)   {
//     if(error)
//         return next(error);
//     next();
//   });
//   });

// schema.pre("save" , function(next) {
//   // const report = this;
//   // console.log(this)
//   console.log("after")
//   AccountModel.findById({_id : this.account}).then((data) => 
//   // console.log(report._id)
//   {
//   data.report.push(this.account)
//   console.log(data.report)
//   }
//   )
//   // AccountModel.findByIdAndUpdate({_id: this.account }, {report : report.push(report._id) }, function(error, ReportListModel)   {
//   //   if(error)
//   //       return next(error);

//   //       console.log("push works")
//   //   next();
//   // });
// })

schema.plugin(autoIncrement, { id: "report_content-auto-increament", inc_field: "_id" });
module.exports = mongoose.model("report_content", schema);

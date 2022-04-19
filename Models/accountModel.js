const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const schema = new mongoose.Schema(
  {
    _id: Number,
    email: {
      type: String,
    //   unique : true,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    address: {
      city: { type: String },
      street: { type: String },
      building: { type: Number },
    },
    report: [
      {
        type: Number,
        ref: "report_content",
      },
    ],
  },
  { _id: false }
);

schema.plugin(autoIncrement, { id: "account-auto-increament", inc_field: "_id" });
module.exports = mongoose.model("account", schema);




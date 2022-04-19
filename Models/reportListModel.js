const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const schema = new mongoose.Schema(
  {
    _id: Number,
    name: {
      type: String,
      required: true,
      unique: true,
    },
    counter : {
      type: Number,
      default: 0
    }
  },
  { timestamps: { createdAt: 'created_at' } },
  { _id: false }
);

schema.plugin(autoIncrement, { id: "report_list-auto-increament", inc_field: "_id" });
module.exports = mongoose.model("report_list", schema);

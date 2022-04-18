const mongoose = require("mongoose")
const autoIncrement = require("mongoose-sequence")(mongoose);

const schema = new mongoose.Schema(
	{
		_id: Number,
        name: {
            type: String,
            required: true,
            unique: true
        }
	},
	{ _id: false }
);

schema.plugin(autoIncrement, { id: "report-list", inc_field: "_id" });
module.exports = mongoose.model("report-list", schema);

const express = require('express');
const router = express.Router();
const { body, query, param } = require("express-validator");
const reportContentController = require("./../Controllers/reportContentController")

router
	.route("/report")
	.post(
		[
			body("type_id").isInt().withMessage("report name is required"),
			body("report_lat").isFloat().withMessage("location latitude is required"),
			body("report_long").isFloat().withMessage("location longitude is required"),
			// TODO: Custom validation for image
			// body("report_file").isInt().withMessage("report name is required"),
			body("report_description").isString().withMessage("report description is required"),
		],
		reportContentController.addReport
	)
	.get(reportContentController.getReport)
	.put(reportContentController.updateReport)
	.delete(reportContentController.deleteReport);

module.exports = router;
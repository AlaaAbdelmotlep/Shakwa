const express = require('express');
const router = express.Router();
const { body, query, param } = require("express-validator");
const reportContentController = require("./../Controllers/reportContentController")

const isAuth = require("./../middelWares/auth")


router
	.route("/report")
	.post(
		[
			body("type_id").isInt().withMessage("report name is required"),
			body("report_lat").isFloat().withMessage("location latitude is required"),
			body("report_long").isFloat().withMessage("location longitude is required"),
			// body("reportFile").is.withMessage("report file is required"),
			body("report_description").isString().withMessage("report description is required"),
		],
		isAuth,
		reportContentController.addReport
	)
	.get(
		isAuth,
		reportContentController.getReport)
	.put(
		isAuth,
		reportContentController.updateReport)
	.delete(
		isAuth,
		reportContentController.deleteReport);

module.exports = router;
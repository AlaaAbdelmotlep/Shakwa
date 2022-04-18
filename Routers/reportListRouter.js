const express = require('express');
const router = express.Router();
const { body, query, param } = require("express-validator");
const reportListController = require("./../Controllers/reportListController")

router
	.route("/report-list")
	.post(
		[
			body("name").isString().withMessage("report name is required"),
		],
		reportListController.addReportItem
	)
	.get(reportListController.getReportItem)
	.put(reportListController.updateReportItem)
	.delete(reportListController.deleteReportItem);

module.exports = router;
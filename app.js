require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const mongoose = require("mongoose");
const body_parser = require("body-parser");
const cors = require("cors");
const path = require("path");

// Create server
const app = express();


mongoose
  .connect(process.env.DB_URL)
  .then(() => {
      console.log("DB connected ..")
    app.listen(process.env.PORT || 8080, () => {
      console.log(process.env.NODE_MODE);
    });
  })
  .catch((error) => console.log("ERROR IN DATABASE!!"));

app.use(morgan(":method :url"));
app.use(cors({ origin: true }));


// MW for CORS
app.use((request, response, next) => {
	response.header("Access-Control-Allow-Origin", "*");
	response.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
	response.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
	next();
});


// body-parser
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

// Router EndPoints


// Not Found MW
app.use((request, response, next) => {
  response.status(404).json({ data: "Not Found" });
});

// Error MW
app.use((error, request, response, next) => {
  let status = error.status || 500;
  response.status(status).json({ Error: error + "" });
});

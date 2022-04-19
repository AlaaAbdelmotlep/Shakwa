require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const mongoose = require("mongoose");
const body_parser = require("body-parser");
const cors = require("cors");
const path = require("path");

// Import Routes
const reportListRouter = require("./Routers/reportListRouter");
const reportContentRouter = require("./Routers/reportContentRouter");
const accountRouter = require("./Routers/accountRouter")

// Create server
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log(path.join(__dirname, "reportFiles"));
    cb(null, path.join(__dirname, "reportFiles"));
  },
  filename: (req, file, cb) => {
    // console.log("filename", file);
    cb(
      null,
      new Date().toLocaleDateString().replace(/\//g, "-") +
        "-" +
        file.originalname
    );
  },
});

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype == "reportFile/jpeg" ||
//     file.mimetype == "reportFile/jpg" ||
//     file.mimetype == "reportFile/png"
//   )
//     cb(null, true);
// };

// const limits = { fileSize: 838861 };

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("DB connected ..");
    app.listen(process.env.PORT || 8080, () => {
      console.log(process.env.NODE_MODE);
    });
  })
  .catch((error) => console.log("ERROR IN DATABASE!!"));

app.use(morgan(":method :url"));
app.use(cors({ origin: true }));

app.use("/reportFiles", express.static(path.join(__dirname, "reportFiles")));
app.use(multer({ storage: storage }).array("reportFile"));

// body-parser
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

// Router EndPoints
app.use(reportListRouter);
app.use(reportContentRouter);
app.use(accountRouter)

// Not Found MW
app.use((request, response, next) => {
  response.status(404).json({ data: "Not Found" });
});

// Error MW
app.use((error, request, response, next) => {
  let status = error.status || 500;
  response.status(status).json({ Error: error + "" });
});

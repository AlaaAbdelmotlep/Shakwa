const express = require("express");
const router = express.Router();
const { body, query, param } = require("express-validator");
const accountController = require("./../Controllers/accountController");
const isAuth = require("./../middelWares/auth");

router
  .route("/account")
  // singUp
  .post(
    [
      body("email").isEmail().withMessage("Email not valid"),
      body("name").isString().withMessage("Name is required"),
      body("password").isStrongPassword().withMessage("Password not valid"),
      body("city").isString().withMessage("City is required"),
      body("street").isString().withMessage("Street is required"),
      body("building").isInt().withMessage("Building is required"),
    ],
    accountController.addAccount
  )
  // is Auth
  .get(isAuth, accountController.getAccount)
  .put(accountController.updateAccount)
  .delete(accountController.deleteAccount);

router
  .route("/singin")
  .post(
    [
      body("email").isEmail().withMessage("Email not valid"),
      body("password").isStrongPassword().withMessage("Password not valid"),
    ],
    accountController.singInAccount
  );

module.exports = router;

const errorHandeler = require("./errorHandeler.js");
const AccountModel = require("./../Models/accountModel");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function createAccessToken(email, user) {
  let token = JWT.sign(
    {
      email: email,
      user: user,
    },
    process.env.SECRET_KEY,
    { expiresIn: "2h" }
  );
  return token;
}

exports.addAccount = (req, res, next) => {
  errorHandeler(req);

  let hashedPassword = bcrypt.hashSync(req.body.password, 15);

  let object = new AccountModel({
    email: req.body.email,
    name: req.body.name,
    password: hashedPassword,
    address: {
      city: req.body.city,
      street: req.body.street,
      building: req.body.building,
    },
  });
  object
    .save()
    .then((data) => res.status(200).json({ data }))
    .catch((error) => next(error));
};

exports.singInAccount = (req, res, next) => {
  errorHandeler(req);

  AccountModel.findOne({ email: req.body.email })
    .then((data) => {
      // check user is on system
      if (data == null) {
        return res.status(400).json({ massage: "You are not in system" });
      }
      // check password matching
      if (bcrypt.compareSync(req.body.password, data.password)) {
        let token = createAccessToken(req.body.email, data);
        return res.status(200).json({ message: "welcome user", data, token });
      } else {
        return res.status(400).json({ massage: "Password is not correct" });
      }
    })
    .catch((err) => next(err));
};

exports.getAccount = (req, res, next) => {
  errorHandeler(req);
  AccountModel.findById(req.user._id)
    .populate("report")
    .then((data) => {
      res.status(200).json({ message: "Account", data });
    })
    .catch((err) => next(err));
  // res.status(200).json(req.user);
};

exports.updateAccount = (req, res, next) => {
  errorHandeler(req);
};

exports.deleteAccount = (req, res, next) => {
  errorHandeler(req);
};

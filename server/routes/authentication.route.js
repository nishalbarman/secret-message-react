const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { randomInt } = require("crypto");
const jwt = require("jsonwebtoken");

// model
const { User, Message } = require("../mongo/models");

const router = Router();

const secret = process.env.SECRET || "692167";

// constructor function
function createResponseObject(statusCode, message, token) {
  this.statusCode = statusCode || 200;
  this.message = message || null;
  this.token = token || null;
}

const verifyToken = (req, res, next) => {
  try {
    const token = req.get("Auth-Token");
    const decoded = jwt.verify(token, secret);

    req.userid = decoded._id;
    req.userpass = decoded.password;

    next();
  } catch (er) {
    const response = new createResponseObject(400, "Unauthorised Access");
    res.send(response);
  }
};

// signup route
router.post("/signup", (req, res) => {
  const { name } = req.body;
  randomInt(100000, 999999, async (err, n) => {
    try {
      if (err) {
        res.sendStatus(500);
      } else {
        const userObject = new User({
          name: name,
          password: n + "",
        });
        await userObject.save();
        const token = jwt.sign(
          {
            name: userObject.name,
            _id: userObject._id,
            password: userObject.password,
          },
          secret,
          { expiresIn: "240h" }
        ); // json web token
        res.send({
          uid: userObject._id,
          password: userObject.password,
          token: token,
          name: userObject.name,
        });
      }
    } catch (er) {
      res.sendStatus(500);
    }
  });
});

// login route
router.post("/login", (req, res) => {
  const { userid, userpin } = req.body;
  User.findOne()
    .byUserIdPassword(userid, userpin)
    .exec()
    .then((userObject) => {
      console.log("After search on mogoose data => ", userObject);
      if (userObject === null || typeof userObject !== "object") {
        const response = new createResponseObject(
          200,
          "User credintials invalid!"
        );
        console.log("Login failed ", response);
        res.send(response);
      } else {
        const token = jwt.sign(
          {
            name: userObject.name,
            _id: userObject._id,
            password: userObject.password,
          },
          secret,
          { expiresIn: "240h" }
        ); // json web token

        res.send({
          uid: userObject._id,
          password: userObject.password,
          token: token,
          name: userObject.name,
        });
      }
    });
});

// delete route
router.delete("/delete", verifyToken, async (req, res) => {
  try {
    console.log(req.userid, req.userpass);
    const user = await User.deleteOne({
      _id: req.userid,
      password: req.userpass,
    });

    console.log(user);

    const msg = await Message.deleteMany({
      uid: req.userid,
    });

    res.send();
  } catch (er) {
    console.log("Delete error => ", er);
  }
});

module.exports = router;

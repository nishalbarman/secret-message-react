const { Router } = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { randomInt } = require("crypto");
const jwt = require("jsonwebtoken");

// model
const { User, Message } = require("../mongo/models");

const router = Router();

const secret = process.env.SECRET || "692167";

const verifyToken = (req, res, next) => {
  try {
    const token = req.get("Auth-Token");
    const decoded = jwt.verify(token, secret);

    req.userid = decoded._id;
    req.userpass = decoded.password;

    next();
  } catch (er) {
    res.send(400, { status: false, message: "Unauthorised Access" });
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
          status: true,
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
router.post("/login", async (req, res) => {
  try {
    const { userid, userpin } = req.body;
    const userObject = await User.findOne()
      .byUserIdPassword(userid, userpin)
      .exec();

    if (userObject === null) {
      return res.send({ status: false, message: "Invalid Credinitals!" });
    }
    // let's create a token because he is authenticated
    const token = jwt.sign(
      {
        name: userObject.name,
        _id: userObject._id,
        password: userObject.password,
      },
      secret,
      { expiresIn: "240h" }
    );

    res.send({
      status: true,
      uid: userObject._id,
      password: userObject.password,
      token: token,
      name: userObject.name,
    });
  } catch (er) {
    if (er instanceof mongoose.MongooseError)
      res.send({ status: false, message: "Invalid Credinitals!" });
    else {
      res.sendStatus(500);
    }
  }
});

// delete route
router.delete("/delete", verifyToken, async (req, res) => {
  try {
    console.log(req.userid, req.userpass);
    const userDel = User.deleteOne({
      _id: req.userid,
      password: req.userpass,
    });

    const msgDel = Message.deleteMany({
      uid: req.userid,
    });

    Promise.all([userDel, msgDel]).then((data) => {
      res.send({ status: true, message: "Your account has been deleted!" });
    });
  } catch (er) {
    console.log("Delete error => ", er);
    res.send({
      status: false,
      message: "Oh No, there is a problem with deletion!",
    });
  }
});

module.exports = router;

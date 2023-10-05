const { Router } = require("express");
const jwt = require("jsonwebtoken");
const router = Router();

function createResponseObject(statusCode, message, token) {
  this.statusCode = statusCode || 200;
  this.message = message || null;
  this.token = token || null;
}

// message model
const { User } = require("../mongo/models");
const { Message } = require("../mongo/models");

const secret = process.env.SECRET || "692167";

const verifyToken = (req, res, next) => {
  try {
    const token = req.get("Auth-Token");
    const decoded = jwt.verify(token, secret);

    req.userid = decoded._id;
    req.userpass = decoded._userpass;

    next();
  } catch (er) {
    const response = new createResponseObject(400, "Unauthorised Access");
    res.send(response);
  }
};

router.get("/", verifyToken, async (req, res) => {
  try {
    const messages = await Message.find().getMessageById(req.userid).exec();
    res.send(messages || []);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.where({ _id: id }).findOne().sort({ date: "desc" });
    if (user === null) {
      res.send(new createResponseObject(404, "Invalid"));
    } else {
      const { message } = req.body;
      const postMessage = new Message({
        message: message,
        uid: id,
      });
      await postMessage.save();
      res.send(new createResponseObject(201, "Message sent!"));
    }
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;

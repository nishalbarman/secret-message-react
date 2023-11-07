require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const http = require("http");
const socket = require("socket.io");
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET || "692167";

//custom routes
const authenticationRoute = require("./routes/authentication.route");
const messageRoute = require("./routes/messages.route");
const { User, Message } = require("./mongo/models");

// mogo db model

const port = process.env.PORT || 8000;

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

// express application
const app = express();

//socket server
const server = http.createServer(app);
const socket_users = {}; // maping the user email with id to send private messages
const io = new socket.Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("joined", (token) => {
    try {
      const { _id } = jwt.verify(token, secret);
      socket_users[_id] = socket.id;
    } catch (er) {
      console.log("Wrong token is given.. So ignore the request");
      socket.emit("wrong_token", "Wrong token is given..");
    }
  });

  socket.on("new-anonymouse-message", async (data) => {
    try {
      io.to(socket_users[data.uid]).emit("new_message", data);
      const user = await User.where({ _id: data.uid }).findOne();
      console.log("User data => ", user);
      if (user === null) {
        socket.emit("response-back", {
          status: false,
          message: "Message failed!",
        });
      } else {
        const postMessage = new Message({
          message: data.message,
          uid: data.uid,
        });
        await postMessage.save();
        socket.emit("response-back", {
          status: true,
          message: "Message sent!",
        });
      }
    } catch (error) {
      console.log("socket.io => ", error);
      socket.emit("response-back", {
        status: false,
        message: "Message failed!",
      });
    }
  });
});

// normal express methods
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://secret-msg-test.netlify.app",
      "https://nishalbarman.github.io/secret-message-react/",
      "https://nishalbarman.github.io",
    ],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
); // cros origin resource sharing
// app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.json());

app.use("/auth", authenticationRoute);
app.use("/m", messageRoute);

app.get("/", (req, res) => {
  res.send("Not allowed");
});

server.listen(port, () => {
  console.log(`App is running in port ${port}`);
});

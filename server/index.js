const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

//custom routes
const authenticationRoute = require("./routes/authentication.route");
const messageRoute = require("./routes/messages.route");

// mogo db model

const port = process.env.PORT || 8000;

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "https://secret-msg-test.netlify.app"],
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

app.listen(port, () => {
  console.log(`App is running in port ${port}`);
});

const mongoose = require("mongoose");
const { Schema } = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://project-playo:hSps3JdhvSTEYpPbkWQDMlcPxbsP3Ltq@project-playo.z9knmzk.mongodb.net/secret-messaging?retryWrites=true&w=majority"
  )
  .catch((error) => {
    console.error("Mongo connection issue => ", error);
  });

mongoose.connection.on("error", (err) => {
  console.error("Mongo connection issue => ", err);
});

// models for mongoose
const userSchema = new Schema(
  {
    name: String,
    password: String,
    date: { type: Date, default: Date.now },
  },
  {
    query: {
      byUserIdPassword(uid, pass) {
        return this.where({ _id: uid, password: pass });
      },
    },
  }
);

// Message schema
const messageSchema = new Schema({
  message: String,
  date: { type: Date, default: Date.now },
  uid: String,
});

messageSchema.query.getMessageById = function (uid) {
  return this.where({ uid: uid });
};

const User = new mongoose.model("users", userSchema);
const Message = new mongoose.model("messages", messageSchema);
module.exports = { User, Message };

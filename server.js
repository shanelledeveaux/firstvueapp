const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const Pusher = require("pusher");
const crypto = require("crypto");

const pusher = new Pusher({
  // app_id = "557550",
  // key = "411e4b6723e899d77446",
  // secret = "11b100f9c49b72fe651d",
  // cluster = "us2",
  // encrypted: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});

app.get("/", (req, res) => {
  res.send("heyyy");
});

app.post("/pusher/auth", (req, res) => {
  let socketId = req.body.socket_id;
  let channel = req.body.channel_name;

  let presenceData = {
    user_id: crypto.randomBytes(16).toString("hex")
  };

  let auth = pusher.authenticate(socketid, channel, presenceData);
  res.send(auth);
});

app.set("port", 3000);

app.listen(app.get("port"), () => {
  console.log("LISTENING", app.get("port"));
});

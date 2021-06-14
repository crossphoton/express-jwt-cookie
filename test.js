const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
const secret = "878yt78vw4ytvenhrtk90jmiudfhevn89";

app.get("/", (req, res) => {
  console.log("GET");
  const token = jwt.sign({ username: "Aditya" }, secret, { expiresIn: 5 });
  res.set("Set-Cookie", `jwt_token=${token}; Max-Age=500000; HttpOnly; Path=/`);
  res.end("Success");
});

app.get("/test", (req, res) => {
  if (req.cookies) console.log(req.cookies);
  res.json(req.cookies);
});

app.listen(6050, () => console.log("Server Up"));

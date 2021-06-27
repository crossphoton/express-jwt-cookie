const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

// app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.disable('x-powered-by');
const secret = process.env.JWT_SECRET;

// if(!secret) {console.error("No secret provided for JWT. Exiting...."); process.exit(1);}

app.get("/", (req, res) => {
  res.set('Cache-Control', 'public, max-age=31557600');
  res.json({message: "Hello from express-jwt-cookie"});
});

app.get("/version", (req, res) => {
  res.set('Cache-Control', 'public, max-age=1000');
  res.json({version: process.env.VERSION});
});

app.get("/environment", (req, res) => {
  res.json({message: process.env.ENVIRONMENT});
});

app.get("/send-cookie", (req, res) => {
  console.log("GET", Date.now());
  try{
    const token = jwt.sign({ username: "Aditya" }, secret, { expiresIn: 5 });
    res.set("Set-Cookie", `jwt_token=${token}; Max-Age=500000; HttpOnly; Path=/`);
    res.json({message: "Cookie sent!!"});
  }
  catch(err){
    res.status(500);
    res.json({message: err.message});
  }
});

app.get("/clear-cookie", (req, res) => {
  res.set("Set-Cookie", `jwt_token=_; Max-Age=0; HttpOnly; Path=/`);
  res.json({message: "Cleared cookie jwt_token"});
})

app.get("/test-cookie", (req, res) => {
  res.json(req.cookies);
});

var server = app.listen(process.env.PORT, () => console.log("Server Up"));

process.on("SIGINT", (singal) => {
  console.log("Shutting down server...");
  server.close();
  console.log("Done");
})
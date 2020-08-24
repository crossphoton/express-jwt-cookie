const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
const secret = "878yt78vw4ytvenhrtk90jmiudfhevn89";

var users = [];

class user{
  constructor(username, password){
    this.username = username;
    this.password = password;
  }
}

const form = `
<form action=/register method=POST>
  <input name=username placeholder=Username required type=text />
  <input name=password placeholder=Password required type=text />
  <button type=submit>Submit</button>
</form>
`


function verify(req, res, next){
  next();
}


function newUser(req, res, next){
  const newU = new user(req.body.username, req.body.password);
  users.push(newU);
  next();
}


const login = (req, res) => {
  console.log("GET");
  const token = jwt.sign({ username: req.body.username }, secret, { expiresIn: 5 });
  // res.cookie("jwt_access_token", token, {
  //   // expires: new Date(Date.now() + 300000),
  //   // secure: true,
  //   // httpOnly: true,
  // });
  // OR
  res.set('Set-Cookie', `jwt_token=${token}; Max-Age=500000; HttpOnly; Path=/`);
  res.end("Success");
};

app.post("/login", verify, login);

app.post("/register", newUser, login);

app.get("/register", (req, res)=>{
  res.send(form);
})

app.get("/test", (req, res) => {
  if (!!req.cookies) console.log(req.cookies);
  res.json(req.cookies);
});

app.listen(6050, () => console.log("Server Up"));

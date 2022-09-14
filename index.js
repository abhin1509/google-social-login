const express = require("express");
const mongoose = require("mongoose");
const passportConfig = require("./passport/passport");
const passport = require("passport");
const auth = require("./routes/auth");
const session = require("express-session");
// const cookieSession = require("cookie-session");
const app = express();

// connect to db
mongoose.connect(process.env.MONGO_URL, () => console.log("DB connected!"));

// app.use(
//   cookieSession({
//     maxAge: 3 * 24 * 60 * 60 * 1000,
//     keys: ["thisisabhinvku"], // in .env
//   })
// );

app.use(
  session({
    maxAge: 3 * 24 * 60 * 60 * 1000,
    secret: "thisisabhinvku",
  })
);

app.use(passport.initialize());
app.use(passport.session());

// req.user is present if we get a successful callback from google
// use this to check whether the user is logged in or not
// middleware
const isLoggedIn = (req, res, next) => {
  if (!req.user) {
    res.redirect("/auth/login");
  }
  // if logged in just continue
  next();
};

app.set("view engine", "ejs");
app.use("/auth", auth);

app.get("/", isLoggedIn, (req, res) => {
  res.render("home");
});

app.listen(4000, () => console.log("Server is running at port 4000..."));

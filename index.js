const express = require("express");
const mongoose = require("mongoose");
const passportConfig = require("./passport/passport");
const passport = require("passport");
const auth = require("./routes/auth");
const app = express();

// connect to db
mongoose.connect("", () => console.log("DB connected!"));

app.use(passport.initialize());

app.set("view engine", "ejs");
app.use("/auth", auth);

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(4000, () => console.log("Server is running at port 4000..."));

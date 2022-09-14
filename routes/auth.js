const router = require("express").Router();
const passport = require("passport");

router.get("/login", (req, res) => {
  res.render("login");
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
  (req, res) => {
    res.send("login with google");
  }
);

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.send("google callback");
});

module.exports = router;

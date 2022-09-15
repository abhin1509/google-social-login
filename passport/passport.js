const passport = require("passport");
require("dotenv").config();
const User = require("../model/user");

var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser(function (user, next) {
  process.nextTick(function () {
    next(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user, next) {
  process.nextTick(function () {
    return next(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, next) => {
      console.log("my profile :: ", profile._json.email);

      User.findOne({ email: profile._json.email }).then((user) => {
        if (user) {
          console.log("user already in db", user);
          next(null, user);
          // cookie token
        } else {
          User.create({
            name: profile.displayName,
            googleId: profile.id,
            email: profile._json.email,
          })
            .then((user) => {
              console.log("new user ", user);
              next(null, user);
              //cookie token
            })
            .catch((err) => console.log(err));
        }
      });
    }
  )
);

const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const USER_MODEL = require("../model/user.model");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4500/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await USER_MODEL.findOne({ googleId: profile.id });
        console.log(user);
        // if (!user) {
        user = await USER_MODEL.create({
          googleId: profile.id,
          avatar: profile.photos[0].value,
          displayName: profile.displayName,
          email: profile.emails[0].value,
        });
        // }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

//searlize the data into session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//retriving the data
passport.deserializeUser(async (id, done) => {
  try {
    const user = await USER_MODEL.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;

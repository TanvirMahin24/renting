const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../Model/User.model");
const { validPassword } = require("./hashPassword");

// TODO: passport.use();
const customFields = {
  usernameField: "email",
  passwordField: "password",
};

const verifyCallback = async (username, password, done) => {
  try {
    const user = await User.findAll({ email: username });
    if (user.length > 0) {
      const isValid = validPassword(password, user[0].password, user[0].salt);

      if (isValid) {
        return done(null, user[0]);
      } else {
        done(null, false);
      }
    } else {
      return done(null, false);
    }
  } catch (error) {
    done(error);
  }
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser((userId, done) => {
  User.findByPk(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});

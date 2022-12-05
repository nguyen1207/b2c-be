const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const db = require("../models");
const Account = db.account;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const strategy = new JwtStrategy(options, async (jwtPayload, done) => {
  try {
    const user = await Account.findOne({ where: { email: jwtPayload.email } });
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (err) {
    console.log(err);
    done(err, false);
  }
});

passport.use(strategy);

module.exports = passport;

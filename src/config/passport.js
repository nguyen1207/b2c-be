const passport = require("passport");
const Account = require("../models/Account");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

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

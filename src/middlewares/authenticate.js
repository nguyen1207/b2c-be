const createHttpError = require("http-errors");
const passport = require("passport");

function authenticate(req, res, next) {
  passport.authenticate("jwt", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      throw createHttpError(401, "User is not authenticated");
    }
    req.user = user;
    next();
  })(req, res, next);
}

module.exports = authenticate;

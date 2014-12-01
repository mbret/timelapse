
var passport = require('passport');

module.exports = {

    /**
     * Signin route.
     * If this route is called then authenticate was successful
     */
    signin: function (req, res, next) {

        passport.authenticate('local', function (err, user, info) {
            if (err) return res.sendServerError(err);

            // Authentication failed
            if (!user) return res.sendBadRequest(info);

            // Log the user in
            req.logIn(user, function (err) {
                if(err) return res.sendServerError(err);
                return res.redirect('/');
            });

        })(req, res, next);
    }

}
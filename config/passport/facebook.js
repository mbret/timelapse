var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function (app, config) {

    var strategy =new FacebookStrategy({
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            callbackURL: config.facebook.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
            var options = {
                criteria: { 'facebook.id': profile.id }
            };
            app.models.user.load(options, function (err, user) {
                if (err) return done(err);
                if (!user) {
                    user = new User({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        username: profile.username,
                        provider: 'facebook',
                        facebook: profile._json
                    });
                    user.save(function (err) {
                        if (err) console.log(err);
                        return done(err, user);
                    });
                } else {
                    return done(err, user);
                }
            });
        }
    );

    return strategy;
};
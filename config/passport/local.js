var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app, config) {

    var strategy = new LocalStrategy(
        function(login, password, done) {
            console.log('Call passport local strategy');

            app.models.user.findOne( {login: login}, function (err, user) {
                if (err) return done(err)
                if (!user) {
                    return done(null, false, { message: 'Unknown user' });
                }
                if (!user.authenticate(password)) {
                    return done(null, false, { message: 'Invalid password' });
                }
                return done(null, user);
            });
        }
    );

    return strategy;
};
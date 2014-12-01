var Promise = require("bluebird");

module.exports = {

    index: function (req, res) {

        res.sendOk({foo: 'bar'}, 'index');
    },

    /**
     * This is a example route
     *
     */
    example: function(req, res) {

        // get app
        var app = req.app;

        // send json anyway
        req.wantsJSON = true;

        // add one user
        app.models.user.create({login:'demo', password:'demo'}).then(function(user){

            // retrieve users
            var users = app.models.user.find().then(function(users){
                return users;
            });
            return [users];

        }).spread(function(users){

            return res.sendOk({
                foo: 'bar',
                users: users
            })

        }).catch(function(err){
            return next(err);
        });

    }
}
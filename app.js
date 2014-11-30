
var express = require('express');
var config = require('./config/config');
//var passport = require('passport');
var models = require("./app/models");

var app = express();
app.set('port', process.env.PORT || 3000);

// Bootstrap passport config
//require('./config/passport')(passport, config);

// Bootstrap application settings
require('./config/express')(app, /*passport*/ null);

// Bootstrap routes
require('./config/routes')(app, /*passport*/ null);


models.sequelize.sync().success(function () {
    var server = app.listen(app.get('port'), function() {
        debug('Express server listening on port ' + server.address().port);
    });
});

/**
 * Expose
 */

module.exports = app;
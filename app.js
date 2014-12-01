
var express = require('express');
var config = require('./config/config');
var Waterline = require('waterline');
var passport = require('passport');

var app = express();

app.set('port', config.server.port);

// Instantiate a new instance of the ORM
var orm = new Waterline();


/*
 * Load the Waterline Models
 */
require('fs').readdirSync( config.models.path ).forEach(function (file) {
    if (~file.indexOf('.js')){
        orm.loadCollection( require( config.models.path + '/' + file) )
    }
});


// Start Waterline passing adapters in
orm.initialize( require('./config/waterline') , function(err, models) {
    if(err) throw err;

    app.models = models.collections;
    app.connections = models.connections;

    // Bootstrap passport config
    require('./config/passport')(app, passport, config);


    // Bootstrap application settings
    require('./config/express')(app, passport, config);


    // Inject plugins
    app.plugins = {};
    require('fs').readdirSync( config.plugins.path ).forEach(function (file) {
        if (~file.indexOf('.js')){
            var pluginName = file.substr(0, file.length - '.js'.length);
            var plugin = require( config.plugins.path + '/' + file);
            app.use( plugin.dispatch );
            app.plugins[pluginName] = plugin;
        }
    });

    // Bootstrap routes
    // load controllers
    require('./config/routes')(app, passport, config);

    // Start Server
    var server = app.listen(app.get('port'), function() {
        console.log('Express server listening on port ' + server.address().port);
    });
});

/**
 * Expose
 */

module.exports = app;
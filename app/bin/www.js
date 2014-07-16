#!/usr/bin/env node
var LOGGER = require( '../config/logger' );
var app = require('../app');

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    LOGGER.debug('Express server listening on port:' + server.address().port + '. Environment: ' + app.get('env'));
});

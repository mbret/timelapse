/**
 * RESTful Api application skeleton for node.js
 * "REST is an "architectural style" that basically exploits the existing technology and protocols of the Web"
 *
 * - The line beginning with var loads the modules needed for the application<
 * -
 *
 */

/**===========================================
 *
 * Includes
 *
 =============================================*/
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var morgan = require('morgan'); // http request logger (https://www.npmjs.org/package/morgan)
var LOGGER = require( './config/logger' ); // Application logging (https://www.npmjs.org/package/log4js)
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


/**===========================================
 *
 * Middleware declarations & init
 *
 =============================================*/
var app = express();
//app.set( 'env', process.env.NODE_ENV ); // by default inside node core
app.set( 'case sensitive routing', true );
app.set( 'strict routing', true );

app.use(favicon());
app.use( morgan({
    format: (app.get('env') === 'development') ? 'dev' : 'default'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'assets')));


/**===========================================
 *
 * Routing
 *
 =============================================*/
app.use( function init( req, res, next ){
    LOGGER.debug('Request parameters:',req.params);
    res.setHeader('Content-Type', 'application/json');
    return next();
});

app.use( '/api', require('./routes/index') );

app.use( '/api/products', require('./routes/products') );

/**
 * Error 404 handler
 */
app.use( function pageNotFoundError(req, res, next) {
    var err = new Error('Page not Found');
    err.description = err.message;
    err.code = 1234;
    err.status = 404;
    return next(err);
});

/**===========================================
 *
 * End of application
 *
 =============================================*/

/**
 * Error handler
 */
app.use( function errorHandler(err, req, res, next) {
    res.status = err.status || 500;
    res.json( {
        code: err.code,
        message: err.message,
        description: err.description,
        detail: (app.get( 'env' ) === 'development') ? err : {}
    });
} );



module.exports = app;


/**
 * Module dependencies.
 */

var express = require('express');
var session = require('express-session');
var compression = require('compression');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var multer = require('multer');
var swig = require('swig');
var flash = require('connect-flash');
var winston = require('winston');
var getRawBody  = require('raw-body');
var typer      = require('media-typer');

var env = process.env.NODE_ENV || 'development';

/**
 * Expose
 */

module.exports = function (app, passport, config) {

    // Compression middleware (should be placed before express.static)
    app.use(compression({
        threshold: 512
    }));

    // Static files middleware
    app.use( express.static(config.root + '/public') );

    // Use winston on production
    var log;
    if (env === 'production') {
        log = {
            stream: {
                write: function (message, encoding) {
                    winston.info(message);
                }
            }
        };
    } else {
        log = 'dev';
    }

    // Don't log during tests
    // Logging middleware
    if (env !== 'test') app.use(morgan(log));

    /*
     * Swig engine settings
     */
    if (env === 'development' || env === 'test') {
        swig.setDefaults({
            cache: false
        });
    }

    /*
     * Express views settings
     */
    // set views path, template engine and default layout
    // res.render will look at the view folder so we also set view folder
    app.engine('html', swig.renderFile); // associate engine to .html files
    app.set('view engine', 'html');
    app.set('views', config.views.path);
    app.use(express.static( config.views.assets.path) ); // serve static files as /css/foo.css

    // bodyParser should be above methodOverride
    // Node.js body parsing middleware.
    app.use(bodyParser.json());                         // for parsing application/json
    app.use(function (req, res, next) {
        getRawBody(req, 'utf8', function (err, string) {
            if (err) return next(err);
            req.rawBody = string
            next()
        });
    });
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    app.use(multer());                                  // for parsing multipart/form-data

    app.use(methodOverride(function (req, res) {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            // look in urlencoded POST bodies and delete it
            var method = req.body._method;
            delete req.body._method;
            return method;
        }
    }));


    // CookieParser should be above session
    app.use(cookieParser());
//    app.use(cookieSession({ secret: 'secret' }));
    app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: config.session.secret,
//        store: new mongoStore({
//            url: config.db,
//            collection : 'sessions'
//        })
    }));


    // use passport session
    app.use(passport.initialize());

    app.use(passport.session());

    // connect flash for flash messages - should be declared after sessions
    app.use(flash());

    // should be declared after session and flash
//    app.use(helpers(pkg.name));


    /*
     * Express response object injection
     */
    app.use(function (req, res, next) {

        // Injection of responses
        // Check all files in responses and add the first method (with name as index) to
        // response object
        // ex /responses/sendOk.js with exports.ok = ... will give res.ok(..);
        require('fs').readdirSync( config.responses.path ).forEach(function (file) {
            if (~file.indexOf('.js')){
                var exported = require(config.responses.path + '/' + file);
                res[exported.name] = exported;
            }
        });

        return next();
    });
};
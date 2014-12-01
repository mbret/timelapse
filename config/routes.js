/*!
 * Module dependencies.
 */

var indexController = require('../app/controllers/index');
var authController = require('../app/controllers/auth');

/**
 * Expose routes
 */

module.exports = function (app, passport, config) {


    // Index
    app.get('/', indexController.index);
    app.get('/example', indexController.example);

    // Auth
    app.post('/signin', authController.signin);

    /**
     * Error handling
     */

    // assume 404 since no middleware responded
    app.use(function (req, res, next) {
        return res.sendNotFound(res, '404', {
            url: req.originalUrl,
            error: 'Not found'
        });
    });

    app.use(function (err, req, res, next) {
        console.error(err.stack);
        // error page
        res.sendServerError({ error: err.stack });
    });

}
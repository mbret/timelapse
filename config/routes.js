/*!
 * Module dependencies.
 */

var indexController = require('../app/controllers/index');

/**
 * Expose routes
 */

module.exports = function (app, passport, config) {


    // Index
    app.get('/', indexController.index);
    app.post('/enonce/:id', indexController.retrieveEnonce);

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
        app.logger.error(err);
        // error page
        res.sendServerError({ error: err.stack });
    });

}
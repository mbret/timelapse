/*!
 * Module dependencies.
 */


var index = require('../app/controllers/index');

/**
 * Expose routes
 */

module.exports = function (app, passport) {

    app.use(function (req, res, next) {

        res.sendOk = require('../app/responses/ok').response;
        res.notFound = require('../app/responses/notFound').response;

        return next();
    });

    // Index
    app.get('/', index.index);
    app.get('/test', index.test);

    /**
     * Error handling
     */

    // assume 404 since no middleware responded
    app.use(function (req, res, next) {
        return res.notFound(res, '404', {
            url: req.originalUrl,
            error: 'Not found'
        });
    });

    app.use(function (err, req, res, next) {
        // treat as 404
        if (err.message
            && (~err.message.indexOf('not found')
                || (~err.message.indexOf('Cast to ObjectId failed')))) {
            return next();
        }
        console.error(err.stack);
        // error page
        res.status(500).render('500', { error: err.stack });
    });

}
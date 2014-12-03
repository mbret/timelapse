/*!
 * Module dependencies.
 */

var indexController = require('../app/controllers/index');
var bodyParser = require('body-parser');

/**
 * Expose routes
 */

module.exports = function (app, passport, config) {


    // Index
    app.get('/', indexController.index);
    app.post('/enonce/:id', bodyParser.raw(), indexController.retrieveEnonce);
    app.get('/enonce/:id', indexController.getEnonce);
    app.get('/rooms/:id', indexController.getRoom);
    app.get('/rooms', indexController.getRooms);
    app.post('/message', indexController.message);

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
//        app.logger.error(err);
        // error page
        // Case of configuration has been entire loaded
        if(res.sendServerError){

        }
        // Case of something thrown an error during middleware process and responses has not been loaded
        else{
            console.error(err.stack);
            // error page
            res.status(500).render('500', { error: err.stack });
        }
    });

}
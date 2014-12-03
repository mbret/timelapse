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
        return res.sendStatus(404);
    });

    app.use(function (err, req, res, next) {
        console.error(err.stack);
        // error page
        res.status(500).json({ error: err.stack });
    });

}
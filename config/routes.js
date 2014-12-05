/**
 * Here are the routes definitions
 * To add a route refer to express documentation.
 * - To get app config just use app.config
 *
 * @param app
 * @param passport
 * @param controllers
 */
module.exports = function (app, passport, controllers) {


    // Index
    app.get('/', controllers.index.index);
    app.post('/enonce/:id',controllers.index.retrieveEnonce);
    app.get('/enonce/:id', controllers.index.getEnonce);
    app.get('/rooms/:id', controllers.index.getRoom);
    app.get('/rooms', controllers.index.getRooms);
    app.post('/message', controllers.index.message);

    // Error handling
    // These two special routes will handle 404 and 500

    // assume 404 since no middleware responded
    app.use(function (req, res, next) {
        return res.sendNotFound();
    });

    // This route is called whenever an error appear during the dispatch process
    // You can call this route by next(err); inside any routes
    app.use(function (err, req, res, next) {
        // Sometimes some middleware throw an error and this error is not error 500
        if(err.status){
            // body parser middleware may sometimes throw error 400 if content is incorrect
            if(err.status == 400){
                return res.sendBadRequest(err);
            }
        }
        return res.sendServerError( err );
    });

}
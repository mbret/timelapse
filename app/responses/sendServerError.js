module.exports = function sendServerError(data, options) {

    // As we use res.sendOk() we can get the res reference inside function
    var req = this.req;
    var res = this;

    // Set status code
    res.status(500);

    // Log error to console
    if (data !== undefined) {
        console.log('Sending 500 ("Server Error") response: \n',data);
    }
    else console.log('Sending empty 500 ("Server Error") response');

    // Only include errors in response if application environment
    // is not set to 'production'.  In production, we shouldn't
    // send back any identifying information about errors.
//    if (sails.config.environment === 'production') {
//        data = undefined;
//    }

    // If the user-agent wants JSON, always respond with JSON
    if (req.wantsJSON) {
        return res.jsonx(data);
    }

    // If second argument is a string, we take that to mean it refers to a view.
    // If it was omitted, use an empty object (`{}`)
    options = (typeof options === 'string') ? { view: options } : options || {};

    // If a view was provided in options, serve it.
    // Otherwise try to guess an appropriate view, or if that doesn't
    // work, just send JSON.
    if (options.view) {
        return res.render(options.view, { data: data });
    }

    // If no second argument provided, try to serve the default view,
    // but fall back to sending JSON(P) if any errors occur.
    else return res.render('500', { data: data });

};

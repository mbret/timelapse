module.exports = function sendOk(data, options) {

    // As we use res.sendOk() we can get the res reference inside function
    var req = this.req;
    var res = this;

    console.log('res.ok() :: Sending 200 ("OK") response');

    // Set status code
    res.status(200);

    // If appropriate, serve data as JSON(P)
    if (req.wantsJSON) {
        return res.json(data);
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

    // If no second argument provided, try to serve the implied view,
    // but fall back to sending JSON(P) if no view can be inferred.
    else{
        return res.sendNotFound();
    }
};

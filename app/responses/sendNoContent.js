module.exports = function sendNoContent (data, options) {

    var req = this.req;
    var res = this;

    req.app.logger.debug('res.noContent() :: Sending 204 ("NO CONTENT") response');

    // Set status code
    res.status(204);

    // If appropriate, serve data as JSON(P)
    if (req.wantsJSON) {
        return res.json();
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
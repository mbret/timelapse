exports.response = function sendOK (res, view, data) {

    console.log('res.notfond() :: Sending 404 ("NOT FOUND") response');

    // Set status code
    res.status(404);

    // send response
    return res.json( data );

};

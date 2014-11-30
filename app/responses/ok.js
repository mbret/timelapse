exports.response = function sendOK (res, view, data) {

    console.log('res.ok() :: Sending 200 ("OK") response');

    // Set status code
    res.status(200);

    // send response
    return res.json( data );

};

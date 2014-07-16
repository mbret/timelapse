/**
 * Index router
 * @author Maxime Bret
 */

var express = require('express');
var router = express.Router();

/**
 * Return the api informations
 */
router.route( '/docs').get(function(req, res) {

    return res.json( 'API is running' );
});

/**
 * Simulate a call to an old api which is wnot working anymore
 */
router.route( '/old_api').get(function(req, res){

    res.status(410); // Indicates that the resource at this end point is no longer available. Useful as a blanket response for old API versions
    return res.json( null );
});

module.exports = router;
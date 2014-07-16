/**
 * Product router.
 *
 * Some of these methods use url parameters in order to process the action.
 * Some of these method use Form Data values in order to process the action.
 * @author Maxime Bret
 */

var express = require('express');
var router = express.Router();
var Product = require( '../models/Product');
var validator = require( 'validator' ); // use https://www.npmjs.org/package/validator for String validation and sanitization
var LOGGER = require( '../config/logger' );

/**
 * Retrieve the list of products
 * @param req
 * @param res
 * @returns {*|ServerResponse}
 */
router.route( '/' ).get(function fetchAll(req, res) {
    var listOfProducts = [];
    listOfProducts.push( new Product( 1, 'response product 1' ) );
    listOfProducts.push( new Product( 3, 'response product 3' ) );

    res.status(200);
    return res.json({
        products:listOfProducts
    });
});

/**
 * Add a product
 * @param req
 * @param res
 * @returns {*|ServerResponse}
 */
router.route( '/' ).post(function createProduct(req, res, next){
    console.log('record a new product');
    console.log( req.body.id );

    // Check parameters
    if( validator.isNull( req.body.id ) || validator.isNull(req.body.name) ){

        var error = new Error("Please provide valid parameters");
        error.description = error.message;
        error.code = 1234;
        error.status = 400;
        return next( error );
    }
    else{
        var product = new Product( req.body.id, req.body.name );

        res.status(201); // Response to a POST that results in a creation.
        return res.json({
            location:'http://new_location_of_the_created_object',
            product:product
        });
    }

});

/**
 * Retrieve a random product.
 *
 * Its important to put /random before /:id because route are checked in order
 * @param req
 * @param res
 * @returns {*|ServerResponse}
 */
router.route( '/random').get(function getRandom( req, res ){
    var product = new Product( 10, 'random response product' );

    res.status(200);
    return res.json({
        product:product
    });
});

/**
 * Get a product by id
 * @param req
 * @param res
 * @returns {*|ServerResponse}
 */
router.route( '/:id' ).get(function getById( req, res, next ){
    if( ! validator.isNumeric( req.params.id ) ){

        var error = new Error("Please provide valid parameters");
        error.description = error.message;
        error.code = 1234;
        error.status = 400;
        return next( error );
    }
    else{
        var product = new Product( req.params.id, 'response product' );

        res.status(200);
        return res.json({
            product:product
        });
    }
});

/**
 * Update a product
 * @param req
 * @param res
 * @returns {*|ServerResponse}
 */
router.route( '/:id' ).put(function updateById( req, res, next ){

    if( ! validator.isNumeric( req.params.id ) || validator.isNull(req.body.name) ){

        var error = new Error("Please provide valid parameters");
        error.description = error.message;
        error.code = 1234;
        error.status = 400;
        return next( error );
    }
    else{
        var product = new Product( req.params.id, 'product modified' ); // new product modified

        res.status(200);
        return res.json({
            product:product
        });
    }
});

/**
 * Delete a product
 * @param req
 * @param res
 * @returns {*|ServerResponse}
 */
router.route( '/:id' ).delete( function deleteById( req, res, next ){

    if( ! validator.isNumeric( req.params.id ) ){

        var error = new Error("Please provide valid parameters");
        error.description = error.message;
        error.code = 1234;
        error.status = 400;
        return next( error );
    }
    else{

        res.status(204); // Response to a successful request that won't be returning a body (like a DELETE request)
        return res.json(null);
    }
});



module.exports = router;




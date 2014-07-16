/**
 * Created by Maxime on 7/15/2014.
 */

var Abstract = require( './Abstract' );
var nbProductInstance = 0;

/**
 * Product constructor
 * @param id
 * @constructor
 */
function Product( id, name ){ // better stack traces from Node when named function is used
    Abstract.apply( this, Array.prototype.slice.call(arguments)); // call super constructor
    this._id = id;
    this._name = name;
    nbProductInstance++;
};
Product.prototype = new Abstract();

/**
 * Return the product's id.
 * @returns {int}
 */
Product.prototype.getID = function(){
    return this._id;
};

/**
 * Display a complete object inline.
 * @returns {string}
 */
Product.prototype.display = function(){
    return "Product:[id=" + this._id + "][name=" + this._name + "]";
};

Product.prototype.getTotalObjects = function(){
    return nbProductInstance;
};

module.exports = Product;
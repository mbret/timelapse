
/**
 * Module dependencies.
 */

var path = require('path');
var extend = require('util')._extend;

var development = require('./env/development');
var production = require('./env/production');

var notifier = {
    service: 'postmark',
    APN: false,
    email: true, // true
    actions: ['comment'],
    tplPath: path.normalize(__dirname + '/../app/mailer/templates'),
    key: 'POSTMARK_KEY'
};

/*******************************************
 *
 * Default configurations
 *
 *******************************************/
var defaults = {
    root: path.normalize(__dirname + '/..'),
    notifier: notifier,

    /*******************************************
     *
     * Server configurations
     *
     *******************************************/
    get server() {
        return {
            port: process.env.PORT || 3000
        }
    },

    /*******************************************
     *
     * Views configurations
     *
     *******************************************/
    get views() {
        return {
            engine: 'swig',
            path: this.root + '/app/views',
            assets: {
                path: this.root + '/public/assets'
            }
        }
    },

    /*******************************************
     *
     * Responses configurations
     *
     *******************************************/
    get responses() {
        return {
            path: this.root + '/app/responses'
        }
    },

    get models() {
        return {
            path: this.root + '/app/models'
        }
    },

    get session() {
        return {
            secret: 'a05a8ds39d9524adfc77359b58e8792d'
        }
    }
};


/**
 * Expose
 */

module.exports = {
    development: extend(development, defaults),
    production: extend(production, defaults)
}[process.env.NODE_ENV || 'development'];

/**
 * Module dependencies.
 */

var path = require('path');
var extend = require('util')._extend;

var development = require('./env/development');
var production = require('./env/production');

/*******************************************
 *
 * Default configurations
 *
 *******************************************/
var defaults = {
    root: path.normalize(__dirname + '/..'),

    notifier: {
        service: 'postmark',
        APN: false,
        email: true, // true
        actions: ['comment'],
        tplPath: path.normalize(__dirname + '/../app/mailer/templates'),
        key: 'POSTMARK_KEY'
    },

    get server() {
        return {
            port: process.env.PORT || 3000
        }
    },

    get views() {
        return {
            engine: 'swig',
            path: this.root + '/app/views',
            assets: {
                path: this.root + '/public/assets'
            }
        }
    },

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
    },

    get plugins(){
        return {
            path: this.root + '/app/plugins'
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
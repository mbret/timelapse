var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({

    identity: 'room',
    connection: 'myLocalDisk',

    attributes: {
        capacity: 'integer',
        links: 'string',
        login: 'string',
        password: 'string'
    }
});
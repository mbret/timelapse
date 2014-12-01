var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({

    identity: 'user',
    connection: 'myLocalDisk',

    attributes: {
        first_name: 'string',
        last_name: 'string',
        login: 'string',
        password: 'string'
    }
});
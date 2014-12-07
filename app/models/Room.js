var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({

    identity: 'room',
    connection: 'myLocalDisk',

    attributes: {
        id: {
            type: 'string',
            primaryKey: true
//            required: true
        },
        capacity: 'integer',
        description: 'text',
        projector: 'json',
        slots: {
            collection: 'slot',
            via: 'room'
        }
    }
});
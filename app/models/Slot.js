var Waterline = require('waterline');
var moment = require('moment');

module.exports = Waterline.Collection.extend({

    identity: 'slot',
    connection: 'myLocalDisk',

    attributes: {
        id: {
            type: 'string',
            primaryKey: true,
            unique: true,
            required: true
        },
        title:{
            type: 'string',
            required: true
        },
        description: {
            type: 'text',
            required: true
        },
        room: {
            model: 'room',
            required: true
        },
        start:{
            type: 'datetime',
            required: true
        },
        stop: {
            type: 'datetime',
            required: true
        },

        toResponse: function(){
            var obj = this.toObject();
            obj.start = moment( obj.start ).format('YYYY-MM-DD HH:mm');
            obj.stop = moment( obj.stop ).format('YYYY-MM-DD HH:mm');
            return obj;
        }
    },

    toResponse: function( slots ){
        var objs = [];
        for( var i = 0; i < slots.length ; i++ ){
            objs.push( slots[i].toResponse() );
        }
        return objs;
    }
});
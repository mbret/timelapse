var Promise = require("bluebird");

/**
 * Bootstrap configuration.
 * You can use this module to init some jobs like database.
 *
 * @param app
 * @param cb
 * @returns {*}
 */
module.exports = function(app, cb){

    var rooms = [
        {
            capacity: 100,
            links:{
                "rel":"self",
                "uri":"http://timelapse.unreachable.me/rooms/b121"
            },
            id: "b121",
            description: "La salle b121",
            projector: "true"

        },
        {
            capacity: 100,
            links:{
                "rel":"self",
                "uri":"http://timelapse.unreachable.me/rooms/b212"
            },
            id: "b212",
            description: "La salle b212",
            projector: "true"

        },
        {
            "capacity": 200,
            "links":{
                "rel":"self",
                "uri":"http://timelapse.unreachable.me/rooms/c181"
            },
            "id": "c181",
            "description": "La salle c181",
            "projector": "false"

        },
        {
            "capacity": 50,
            "links":{
                "rel":"self",
                "uri":"http://timelapse.unreachable.me/rooms/1213"
            },
            "id": "1213",
            "description": "La salle 1213",
            "projector": "false"
        },
        {
            "capacity": 400,
            "links":{
                "rel":"self",
                "uri":"http://timelapse.unreachable.me/rooms/1214"
            },
            "id": "1214",
            "description": "La salle 1214",
            "projector": "false"
        },
        {
            "capacity": 200,
            "links":{
                "rel":"self",
                "uri":"http://timelapse.unreachable.me/rooms/1215"
            },
            "id": "1215",
            "description": "La salle 1215",
            "projector": "true"

        }
    ];

    var slots = [
        {
            id: 1,
            title: 'Cours 1',
            description: 'Foo',
            room: "b212",
            start: '2013-12-25 08:00',
            stop: '2013-12-25 12:00'
        },
        {
            id: 2,
            title: 'Cours 2',
            description: 'Bar',
            room: "1215",
            start: '2013-12-26 08:00',
            stop: '2013-12-26 12:00'
        },
        {
            id: 3,
            title: 'Cours 3',
            description: 'Foo',
            room: "1215",
            start: '2013-12-26 14:00',
            stop: '2013-12-26 17:00'
        },
        {
            id: 4,
            title: 'Cours 4',
            description: 'Foo',
            room: "1215",
            start: '2013-12-26 17:00',
            stop: '2013-12-26 18:00'
        }
    ];

    Promise.map(rooms, function( room ){

        return app.models.room.create(room);

    }).then(function(roomsCreated){

        var slotsCreated = Promise.map(slots, function(slot){
            return app.models.slot.create(slot);
        });
        return [roomsCreated, slotsCreated];

    }).spread(function( rooms, slots ){


//        console.log(rooms);
//        console.log(slots);
        return cb();

    }).catch(function(err){
        return cb(err);
    })

};
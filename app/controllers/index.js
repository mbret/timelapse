var marked = require('marked');
var fs = require('fs');
var js2xmlparser = require("js2xmlparser");
var validator = require('validator');




module.exports = {

    /**
     * First call
     * /q? ...
     */
    // GET /?q=blabla
    index: function (req, res) {

        console.log(req.query);

        // Handle query ?q
        var mappingQ = {
            'Quelle est ton adresse email ?': 'mail@mail.com',
            'Es-tu content de participer ? (OUI/NON)': 'OUI',
            'Es-tu que tu as compris le principe du jeu ? (OUI/NON)': 'OUI',
            'Es-tu que tu reponds toujours oui ? (OUI/NON)': 'NON',
            'Es-tu pret a recevoir un enonce au format markdown par http post ? (OUI/NON)': 'OUI',
            'As-tu bien recu le premier enonce ? (OUI/NON)': 'OUI',
            'Bravo, je connais tes salles de cours maintenant, es-tu pret pour un nouvel ennonce ? (OUI/NON)': 'OUI',
            'Bravo, je vois que tu modelise bien tes ressources en REST, es-tu pret pour un nouvel ennonce ? (OUI/NON)': 'OUI',
            'Bravo, tu as passe un niveau difficile, peux-tu me dire le titre du slot que j\'ai cree le 13 décembre 2014 ?': 'Partiel Miage Web Services'
        }
        if( req.param('q') && req.param('q') in mappingQ ){
            return res.send( mappingQ[req.param('q')] );
        }

        return res.send('nothing');
    },

    // GET /enonce/2
    getEnonce: function( req, res, next){

        require('fs').readFile(req.app.config.root + '/data/enonce/' + req.param('id') + '.html', 'utf8', function (err,data) {
            if (err) {
                if(err.code == 'ENOENT'){
                    return res.sendNotFound();
                }
                return next(err);
            }
            return res.send(200, data);
        });

    },

    /**
     * Post enonce call
     * POST /enonce/1
     */
    // POST /enonce/2
    retrieveEnonce: function(req, res, next){

        req.app.logger.debug('Raw content :' + req.rawBody);

        fs.writeFile("./data/enonce/" + req.param('id') + ".html", marked(req.rawBody), function(err) {
            if(err) {
                return next(err);
            } else {
                req.app.logger.debug('Enonce saved to ' + "./data/enonce/" + req.param('id') + ".html");
                return res.sendStatus(200);
            }
        });

    },

    // GET /rooms?capacity=10
    getRooms: function(req, res, next){

        var requestType = req.get('Content-Type');

        var response = {
            "description":"Miage rooms list",
            "data": []
        };

        // Error 400
        if( req.param('capacity') && ( ! validator.isNumeric( req.param('capacity') ) || parseInt(req.param('capacity')) < 0) ){
            return res.sendStatus(400);
        }
        // 200
        else{
            var capacity = -1;

            // ask a sort
            if( req.param('capacity') ) {
                var capacity = parseInt(req.param('capacity'));
            }

            req.app.models.room.find().where( {capacity: { '>': capacity}}).exec(function(err, rooms){

                if(err) return next(err);

                response.data = rooms;
                if(requestType == 'application/xml'){
                    res.set('Content-Type', 'application/xml');
                    return res.send( js2xmlparser("Rooms", response) );
                }
                else {
                    return res.json( response);
                }

            });
        }



    },

    // GET /rooms/12
    getRoom: function(req, res, next){

        var requestType = req.get('Content-Type');

        // Get object
        req.app.models.room.findOne( req.param('id') ).exec(function(err, room){
            if(err) return next(err);
            if(!room) return res.sendStatus(404);

            if(requestType == 'application/xml'){
                res.set('Content-Type', 'application/xml');
                return res.send( js2xmlparser("Room", room) );
            }
            else {
                return res.json( room );
            }
        })

    },

    // GET /slots?room=a121
    getSlots: function(req, res, next){

        var requestType = req.get('Content-Type');

        var response = {
            "description":"Slots list",
            "data": []
        };

        var query = {};
        if( req.param('room') ){
            query.room = [req.param('room')]; // add an IN condition
        }

        req.app.models.slot.find(query).exec(function(err, slots){

            if(err) return next(err);

            response.data = req.app.models.slot.toResponse( slots ); // format date of all object to match response
            if(requestType == 'application/xml'){
                res.set('Content-Type', 'application/xml');
                return res.send( js2xmlparser("Slots", response) );
            }
            else {
                return res.json( response );
            }

        });
    },

    // GET /rooms/:id/slots
    getSlotsFromRoom: function(req, res, next){
        var requestType = req.get('Content-Type');

        var response = {
            "description":"Slots list",
            "data": []
        };

        // Check room
        req.app.models.room.findOne( req.param('id') ).populate('slots').exec(function(err, room){
            if(err) return next(err);
            if(!room) return res.sendNotFound();

            response.data = req.app.models.slot.toResponse( room.slots ); // format date of all object to match response
            if(requestType == 'application/xml'){
                res.set('Content-Type', 'application/xml');
                return res.send( js2xmlparser("Slots", response) );
            }
            else {
                return res.json( response );
            }
        });
    },

    // GET /slots/12
    getSlot: function(req, res, next){

        var requestType = req.get('Content-Type');

        // Get object
        req.app.models.slot.findOne( req.param('id') ).exec(function(err, slot){
            if(err) return next(err);
            if(!slot) return res.sendStatus(404);

            if(requestType == 'application/xml'){
                res.set('Content-Type', 'application/xml');
                return res.send( js2xmlparser("Slot", slot.toResponse() ) );
            }
            else {
                return res.json( slot.toResponse() );
            }
        });

    },

    // POST /slots
    // {"id": 42,"title": "Cours 4","description": "Foo","room": "451","start": "2013-12-26 17:00","stop": "2013-12-26 18:00"}
    createSlot: function(req, res){

        console.log(req.body);
        console.log(req.param('id'));

        var slot = {
            id: req.param('id'),
            title: req.param('title'),
            description: req.param('description'),
            room: req.param('room'),
            start: req.param('start'),
            stop: req.param('stop')
        };

        // auto generate id
        if( (typeof slot.id === 'undefined') || slot.id === '' || slot.id === null ){
            delete slot.id;
        }

        // Has an ID
        if( slot.id ){
            req.app.models.slot.findOne( slot.id ).exec(function(err, slotFound) {
                if(err) return res.sendServerError(err);

                if(slotFound) {
                    var e = new Error('Slot with this id already exist!'); e.code = 'E_UNIQUE'; return res.sendBadRequest( e );
                }

                return createSlot( slot );

            });
        }
        // Auto generate ID
        else{
            return createSlot( slot );
        }


        // Function helper
        function createSlot( slotToAdd ){
            console.log(slotToAdd)
            req.app.models.slot.create( slotToAdd ).exec(function(err, slotCreated ){
                if(err){
                    if(err.invalidAttributes) return res.sendBadRequest( err );
                    return res.sendServerError(err);
                }

                console.log(slotCreated);
                return res.sendCreated({location: 'http://timelapse.unreachable.me/slots/' + slotCreated.id});
            });
        }


    },

    // PUT /slots/:id
    updateSlot: function(req, res){

        var data = {};
        if ( req.param('title') ) data.title = req.param('title');
        if ( req.param('description') ) data.description = req.param('description');
        if ( req.param('room') ) data.room = req.param('room');
        if ( req.param('start') ) data.start = req.param('start');
        if ( req.param('stop') ) data.stop = req.param('stop');

        // Update process
        req.app.models.slot.update( req.param('id'), data, function(err, slot) {

            if (err) {
                if(err.invalidAttributes) return res.sendBadRequest( err );
                else return res.sendServerError(err);
            }
            if(!slot || slot.length < 1) return res.sendNotFound();

            return res.sendOk( slot[0].toResponse() );
        });

    },

    deleteSlot: function(req, res){

        req.app.models.slot.findOne(req.param('id')).then(function( slot ){
            if(!slot) return res.sendNotFound();
            return req.app.models.slot.destroy( slot.id ).then(function(){
                return res.sendNoContent();
            });
        }).catch(function(err){
            return res.sendServerError(err);
        });

    },

    // POST /message
    message: function(req, res){
        console.log(req.rawBody);
        res.sendStatus(201);
    },


    downloadFile: function(req, res){

        digest = req.param('id');

        var request = require('request');
        request('http://timelapse-jayblanc.rhcloud.com/rest/players/mbret/digest', function(err, response, body){
            if(err) return res.sendServerError(err);

            if (!err && response.statusCode == 200) {
                var validDigest = body;
                console.log(validDigest);
                if( digest == validDigest ){

                    res.set('Content-Type', 'application/x-tar');
                    res.set('Content-Disposition', 'inline; filename="mbret.tar.gz"' );
                    res.sendFile( req.app.config.root + '/data/mbret.tar.gz' );
                }
                else{
                    return res.sendNotFound();
                }
            }
            else{
                return res.sendServerError();
            }
        });
    }

}
var Promise = require("bluebird");
var marked = require('marked');
var fs = require('fs');
var js2xmlparser = require("js2xmlparser");
var validator = require('validator');


var rooms = {

        "b212":{
            "capacity": 100,
            "links":[
                {
                    "rel":"self",
                    "uri":"http://timelapse.unreachable.me/rooms/b212"
                }
            ]
        },
        "c181": {
            "capacity": 200,
            "links":[
                {
                    "rel":"self",

                    "uri":"http://timelapse.unreachable.me/rooms/c181"
                }
            ]
        },
        "1213": {
            "capacity": 50,
            "links":[
                {
                    "rel":"self",

                    "uri":"http://timelapse.unreachable.me/rooms/1213"
                }
            ]
        },
        "1214": {

            "capacity": 400,
            "links":[
                {
                "rel":"self",

                "uri":"http://timelapse.unreachable.me/rooms/1214"
                }
            ]
        },
        "1215" : {
            "capacity": 200,
            "links":[
            {
                "rel":"self",

                "uri":"http://timelapse.unreachable.me/rooms/1215"
                }
            ]
        }
};

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
            'Bravo, je connais tes salles de cours maintenant, es-tu pret pour un nouvel ennonce ? (OUI/NON)': 'OUI'
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
                    return res.sendBadRequest();
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
    getRooms: function(req, res){

        var requestType = req.get('Content-Type');

        var response = {
            "description":"La liste des salles de Miage",
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

            for (var key in rooms) {
                var room = rooms[key];
                if (room.capacity > capacity) {
                    response.data.push({
                        id: key,
                        links: room.links
                    });
                }
            }
        }

        if(requestType == 'application/xml'){
            res.set('Content-Type', 'application/xml');
            res.send( js2xmlparser("SallesListe", response) );
        }
        else {
            res.json(response);
        }


    },

    // GET /rooms/12
    getRoom: function(req, res){

        var requestType = req.get('Content-Type');
        var response = {};

        if( req.param('id') && req.param('id') in rooms ){
            response = rooms[req.param('id')];
        }
        else{
            return res.sendStatus(404);
        }


        if(requestType == 'application/xml'){
            res.set('Content-Type', 'application/xml');
            res.send( js2xmlparser("Salle", response) );
        }
        else {
            res.json( response );
        }
    },

    // POST /message
    message: function(req, res){
        console.log(req.rawBody);
        res.sendStatus(201);
    }

}
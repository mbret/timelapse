var Promise = require("bluebird");
var marked = require('marked');
var fs = require('fs');
var o2x = require('object-to-xml');
var js2xmlparser = require("js2xmlparser");

module.exports = {

    /**
     * First call
     * /q? ...
     */
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
    retrieveEnonce: function(req, res, next){

        //        return next(new Error('Iam an error'));
//        console.log(req.rawBody);
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

    getRooms: function(req, res){
//        res.json([{"id":"b121"}, {"id":"c181"}, {"id":"1213"}]);

        var requestType = req.get('Content-Type');

        var rooms = [
            {
                "id":"b212",
                "capacity": 100,
                "links":[
                    {
                        "rel":"self",

                        "uri":"http://timelapse.unreachable.me/rooms/b212"
                    }
                ]
            },
            {
                "id":"c181",
                "capacity": 200,
                "links":[
                    {
                        "rel":"self",

                        "uri":"http://timelapse.unreachable.me/rooms/c181"
                    }
                ]
            },
            {
                "id":"1213",
                "capacity": 50,
                "links":[
                    {
                        "rel":"self",

                        "uri":"http://timelapse.unreachable.me/rooms/1213"
                    }
                ]
            },
            {
                "id":"1214",
                "capacity": 400,
                "links":[
                    {
                        "rel":"self",

                        "uri":"http://timelapse.unreachable.me/rooms/1214"
                    }
                ]
            },
            {
                "id":"1215",
                "capacity": 200,
                "links":[
                    {
                        "rel":"self",

                        "uri":"http://timelapse.unreachable.me/rooms/1215"
                    }
                ]
            }
        ];

        if( parseInt(req.param('capacity')) < 0){
            return res.sendStatus(400);
        }

        if( req.param('capacity') ){
            var capacity = parseInt(req.param('capacity'));
            var goodRooms = [];
            for( var i = 0; i < rooms.length ; i++){
                var tmp = rooms[i];
                if( tmp.capacity >= capacity ){
                    goodRooms.push(tmp);
                }
            }

            var obj = {
                "description":"La liste des salles de Miage",
                "data": goodRooms
            };

            if(requestType == 'application/xml'){
                res.set('Content-Type', 'application/xml');
                res.send( js2xmlparser("SallesListe", obj) );
            }
            else {
                res.json({
                    SallesListe: obj
                });
            }

        }

        if( ! req.param('capacity') || (req.param('capacity') && parseInt(req.param('capacity') == 0) ) ){

            var goodRooms = rooms;

            var obj = {
                "description":"La liste des salles de Miage",
                "data": goodRooms
            };

            if(requestType == 'application/xml'){
                res.set('Content-Type', 'application/xml');
                res.send( js2xmlparser("SallesListe", obj) );
            }
            else {
                res.json({
                    SallesListe: obj
                });
            }
        }


    },

    getRoom: function(req, res){

        var requestType = req.get('Content-Type');
        var obj = {};

        switch( req.param('id') ){
            case 'b121':
                obj = {"id": "b121", "description": "La salle de mon a", "capacity": 100, "projector": "false"};
                break;
            case 'c181':
                obj = {"id": "c181", "description": "La salle de mon b", "capacity": 200, "projector": "true"};
                break;
            case '1213':
                obj = {"id": "1213", "description": "La salle de mon c", "capacity": 50, "projector": "false"};
                break;
            case '1214':
                obj = {"id": "1214", "description": "La salle de mon c", "capacity": 400, "projector": "false"};
                break;
            case '1215':
                obj = {"id": "1215", "description": "La salle de mon c", "capacity": 200, "projector": "false"};
                break;
            default:
                return res.sendStatus(404);
            break;

        }

        if(requestType == 'application/xml'){
            res.set('Content-Type', 'application/xml');
            res.send( js2xmlparser("Salle", obj) );
        }
        else {
            res.json(obj);
        }
    },

    message: function(req, res){
        console.log(req.rawBody);
        res.sendStatus(201);
    }

}
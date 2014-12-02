var Promise = require("bluebird");
var marked = require('marked');
var fs = require('fs');

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
        res.json([{"id":"b121"}, {"id":"c181"}, {"id":"1213"}]);
    },

    getRoom: function(req, res){
        switch( req.param('id') ){
            case 'b121':
                res.json({"id": "b121", "description": "La salle de mon a", "capacity": "10", "projector": "false"});
                break;
            case 'c181':
                res.json({"id": "c181", "description": "La salle de mon b", "capacity": "20", "projector": "true"});
                break;
            case '1213':
                res.json({"id": "1213", "description": "La salle de mon c", "capacity": "30", "projector": "false"});
                break;
            default:
                return res.sendStatus(404);
            break;
        }

    }

}
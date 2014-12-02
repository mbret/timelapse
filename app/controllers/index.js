var Promise = require("bluebird");

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
            'Es-tu que tu reponds toujours oui ? (OUI/NON)': 'NON'
        }
        if( req.param('q') && req.param('q') in mappingQ ){
            return res.send( mappingQ[req.param('q')] );
        }

        return res.send('nothing');
    },

    /**
     * Post enonce call
     * POST /enonce/1
     */
    retrieveEnonce: function(req, res){

        console.log(req.body);
        return res.send('nothing');

    }

}
module.exports = {

    dispatch: function(req, res, next){

        console.log("I'm a plugin");
        return next();
    },

    bar: function( foo, bar ){
        return foo + bar;
    }

};
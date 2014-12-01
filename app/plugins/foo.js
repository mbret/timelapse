module.exports = {

    dispatch: function(req, res, next){

        console.log("I'm a plugin");
        return next();
    },

    foo: function( foo, bar ){
        return foo + bar;
    }

};
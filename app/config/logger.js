// Application logger (https://www.npmjs.org/package/log4js)
var log4js = require("log4js");
log4js.configure({
    appenders: [
        { type: 'console' },
        { type: 'file', filename: "../data/logs/log_file.log", category: 'api_test' }
    ]
});
var logger  = log4js.getLogger('api_test');

// Set the level of the logger and export as global
logger.setLevel( ( 'development' === 'development') ? 'DEBUG' : 'ERROR' ); // set logger level depend of the environment
Object.defineProperty( exports, "LOGGER", {
    value:logger
});

module.exports = logger;
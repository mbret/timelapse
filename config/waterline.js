// Require any waterline compatible adapters here
var diskAdapter = require('sails-disk');
// Build A Config Object
module.exports = {

    // Setup Adapters
    // Creates named adapters that have have been required
    adapters: {
        'default': diskAdapter,
        disk: diskAdapter
    },

    // Build Connections Config
    // Setup connections using the named adapter configs
    connections: {
        myLocalDisk: {
            adapter: 'disk'
        }
    },

    defaults: {
        migrate: 'drop'
    }

};
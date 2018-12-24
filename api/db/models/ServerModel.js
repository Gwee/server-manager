var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ServerSchema = new Schema({
    name: {
        type: String
    },
    discovered_date: {
        type: Date,
        default: Date.now
    },
    ip_addr: {
        type: Array,
        required: false
    },
    dns_name: {
        type: String,
        required: 'DNS name is required'
    },
    status: {
        type: [{
            type: String,
            enum: ['running', 'stopped', 'stopping', 'starting', 'terminating', 'terminated']
        }],
        default: ['stopped']
    }
});

module.exports = mongoose.model('Servers', ServerSchema);
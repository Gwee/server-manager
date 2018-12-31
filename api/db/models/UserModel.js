var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    registered_date: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: true
    },
    tokens: {
        type: Array
    }
});

module.exports = mongoose.model('Users', UserSchema);
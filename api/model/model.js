// To define a scheme for mongodb

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema and Model
const testSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    rank: {
        type: String
    },

    available: {
        type: Boolean,
        default: false
    }
    // Add geo location later
});

const Test = mongoose.model('test', testSchema);

module.exports = Test;
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const usersSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    loans: [{
        type: mongoose.Types.ObjectId,
        ref: 'Loan',
        required: true
    }]
})

module.exports = mongoose.model('User', usersSchema)
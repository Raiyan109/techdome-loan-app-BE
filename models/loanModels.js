const mongoose = require('mongoose');

const Schema = mongoose.Schema

const loanSchema = new Schema({
    amount: {
        type: Number,
        required: true,
    },
    term: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Loan', loanSchema)
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
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isPaid: {
        type: String,
    }
}, { timestamps: true })

module.exports = mongoose.model('Loan', loanSchema)
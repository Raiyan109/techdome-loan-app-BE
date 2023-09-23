const express = require('express');
const { getAllLoans, addLoan } = require('../controllers/loanController');

const router = express.Router()

// GET all loans
router.get('/', getAllLoans)

// POST new loan
router.post('/add', addLoan)

module.exports = router
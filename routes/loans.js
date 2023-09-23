const express = require('express');
const { getAllLoans, addLoan, updateLoan, deleteLoan } = require('../controllers/loanController');

const router = express.Router()

// GET all loans
router.get('/', getAllLoans)

// POST new loan
router.post('/add', addLoan)

// UPDATE a loan
router.put('/update/:id', updateLoan)

// DELETE
router.delete('/:id', deleteLoan)

module.exports = router
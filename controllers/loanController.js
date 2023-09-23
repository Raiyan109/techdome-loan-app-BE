const Loan = require('../models/loanModels.js')

// GET all loans
const getAllLoans = async (req, res) => {
    let loans;
    try {
        loans = await Loan.find()
    } catch (error) {
        return console.log(error);
    }

    if (!loans) {
        return res.status(404).json({ message: 'No loan found' })
    }

    return res.status(200).json({ loans })
}


const addLoan = async (req, res) => {
    const { amount, term } = req.body

    const loan = new Loan({
        amount,
        term,
    })

    try {
        await loan.save()
    } catch (error) {
        return console.log(error)
    }

    return res.status(200).json({ loan })
}

const updateLoan = async (req, res) => {
    const { amount, term } = req.body
    const loanId = req.params.id
    let loans;
    try {
        loans = await Loan.findByIdAndUpdate(loanId, {
            amount,
            term,
        })
    } catch (error) {
        return console.log(error);
    }

    if (!loans) {
        return res.status(404).json({ message: 'No loan found for update' })
    }
    return res.status(200).json({ loans })
}

const deleteLoan = async (req, res) => {
    const loanId = req.params.id
    let loans;
    try {
        loans = await Loan.findByIdAndRemove(loanId)
    } catch (error) {
        return console.log(error);
    }

    if (!loans) {
        return res.status(404).json({ message: 'No such Loan found for delete' })
    }
    return res.status(200).json({ message: "Successfully deleted" })
}





module.exports = {
    getAllLoans,
    addLoan,
    updateLoan,
    deleteLoan,
}
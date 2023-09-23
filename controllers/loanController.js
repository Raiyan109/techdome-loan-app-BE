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





module.exports = {
    getAllLoans,
    addLoan,
}
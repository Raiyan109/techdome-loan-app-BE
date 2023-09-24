const { default: mongoose } = require('mongoose');
const Loan = require('../models/loanModels.js')
const User = require('../models/userModels.js')

// GET all loans
const getAllLoans = async (req, res) => {
    let loans;
    try {
        loans = await Loan.find().sort({ createdAt: -1 })
    } catch (error) {
        return console.log(error);
    }

    if (!loans) {
        return res.status(404).json({ message: 'No loan found' })
    }

    return res.status(200).json({ loans })
}


const addLoan = async (req, res) => {
    const { amount, term, user } = req.body
    let existingUser;
    try {
        existingUser = await User.findById(user)
    } catch (error) {
        return console.log(error);
    }

    if (!existingUser) {
        return res.status(404).json({ message: 'No User found by this id' })
    }

    const loan = new Loan({
        amount,
        term,
        user
    })

    try {
        const session = await mongoose.startSession()
        session.startTransaction()
        await loan.save({ session })
        existingUser.loans.push(loan)
        await existingUser.save({ session })
        await session.commitTransaction()
    } catch (error) {
        console.log(error)
        return res.status(404).json({ message: error })
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
        loans = await Loan.findByIdAndRemove(loanId).populate('user')
        await loans.user.loans.pull(loans)
        await loans.user.save()
    } catch (error) {
        return console.log(error);
    }

    if (!loans) {
        return res.status(404).json({ message: 'No such Loan found for delete' })
    }
    return res.status(200).json({ message: "Successfully deleted" })
}

const getLoanById = async (req, res) => {
    const id = req.params.id
    let loans;
    try {
        loans = await Loan.findById(id)
    } catch (error) {
        return console.log(error);
    }

    if (!loans) {
        return res.status(404).json({ message: 'No loan found by this id' })
    }
    return res.status(200).json({ loans })
}

// GET all loans of a single user
const getByUserId = async (req, res) => {
    const userId = req.params.id
    let userLoans;
    try {
        userLoans = await User.findById(userId).populate('loans')
    } catch (error) {
        return console.log(error);
    }

    if (!userLoans) {
        return res.status(404).json({ message: 'No loan found' })
    }
    return res.status(200).json({ loans: userLoans })
}





module.exports = {
    getAllLoans,
    addLoan,
    updateLoan,
    deleteLoan,
    getLoanById,
    getByUserId
}
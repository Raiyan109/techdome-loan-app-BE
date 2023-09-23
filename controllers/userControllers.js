const User = require("../models/userModels");
const bcrypt = require('bcrypt');

// GET all users
const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find()
    } catch (error) {
        return console.log(error);
    }

    if (!users) {
        return res.status(400).json({ message: 'No users found' })
    }
    return res.status(200).json({ users })
}

// Signup
const signup = async (req, res) => {
    const { name, email, password } = req.body

    let existingUser;
    try {
        existingUser = await User.findOne({ email })
    } catch (error) {
        return console.log(error);
    }

    if (existingUser) {
        return res.status(400).json({ message: 'User already signup. try login instead' })
    }

    // Bcrypt

    // const salt = bcrypt.genSaltSync(saltRounds);
    const saltRounds = 10
    const hashedPassword = bcrypt.hashSync(password, saltRounds)

    const user = new User({
        name,
        email,
        password: hashedPassword
    })

    try {
        await user.save()
    } catch (error) {
        return console.log(error);
    }

    return res.status(200).json({ user })
}

// Login POST
const login = async (req, res) => {
    const { email, password } = req.body

    let existingUser;
    try {
        existingUser = await User.findOne({ email })
    } catch (error) {
        return console.log(error);
    }

    if (!existingUser) {
        return res.status(400).json({ message: "User not found with this email" })
    }

    // Bcrypt compare password
    const isCorrectPassword = bcrypt.compareSync(password, existingUser.password)

    if (!isCorrectPassword) {
        return res.status(400).json({ message: 'Password did not match' })
    }

    return res.status(200).json({ message: "Login successful" })
}

module.exports = {
    getAllUsers,
    signup,
    login,
}
const express = require('express');
const { getAllUsers, signup, login } = require('../controllers/userControllers');

const router = express.Router()

router.get('/', getAllUsers)

// Signup
router.post('/signup', signup)

// Login
router.post('/login', login)

module.exports = router


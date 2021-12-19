const express = require('express')
const pageController = require('../controllers/pageController')

router = express.Router()

router.get('/', pageController.loggedIn, pageController.home)

router.get('/register', pageController.register)

router.get('/login', pageController.login)

router.get('/success', pageController.success)

router.get('/cancel', pageController.cancel)

module.exports = router
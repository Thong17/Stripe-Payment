const express = require('express')
const paymentController = require('../controllers/paymentController')

router = express.Router()

router.post('/checkout', paymentController.checkout)

module.exports = router
const express = require('express')
const authController = require('../controllers/authController')
const initPassport = require('../connections/passport')
const db = require('../connections/database')
const passport = require('passport')
router = express.Router()


db.getConnection((err, con) => {
    if (err) {
        console.log(err)
    }
    con.query('SELECT * FROM tbl_user', (err, result) => {
        initPassport(passport, id => result.find(user => user.id === id))
    })
})

router.post('/register', authController.register)

router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }))

router.delete('/logout', authController.logout)

module.exports = router
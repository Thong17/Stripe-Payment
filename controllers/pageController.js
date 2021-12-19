const fetch = require('node-fetch')

exports.home = (req, res) => {
    fetch('http://localhost:5000/api/products')
        .then((data) => data.json())
        .then((data) => {
            res.render('index.hbs', {layout: 'layout', username: req.user.username, data: data})
        }).catch((e) => console.log(e))
}

exports.register = (req, res) => {
    res.render('register.hbs', {layout: 'auth'})
}

exports.login = (req, res) => {
    res.render('login.hbs', {layout: 'auth'})
}

exports.success = (req, res) => {
    res.render('success.hbs', {layout: 'result'})
}

exports.cancel = (req, res) => {
    res.render('cancel.hbs', {layout: 'result'})
}

exports.loggedIn = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.redirect('/login')
    }
}

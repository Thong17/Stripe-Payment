const db = require('../connections/database')
const bcrypt = require('bcrypt')

exports.register = (req, res) => {
    const {username, email, password, confirm} = req.body
    db.getConnection((err, con) => {
        if (err) {
            con.release()
            return res.render('register.hbs', { message: 'Cannot connect to database', layout: 'auth' })
        }
        con.query(`SELECT * FROM tbl_user WHERE email = '${email}' or username = '${username}'`, async (err, result) => {
            if (err) {
                con.release()
                return res.render('register.hbs', { message: 'Cannot connect to database', layout: 'auth' })
            } 
            if (await result.length) {
                con.release()
                return res.render('register.hbs', { message: 'Email or username is already existed', layout: 'auth' })
            } else {
                if (confirm === password) {
                    const hashed_password = await bcrypt.hash(password, 10)
                    con.query('INSERT INTO tbl_user SET ?', {email: email, username: username, password: hashed_password}, (err, result) => {
                        if (err) {
                            con.release()
                            return res.render('register.hbs', { message: 'Cannot connect to database', layout: 'auth' })
                        } else {
                            con.release()
                            return res.redirect('/login')
                        }
                    })
                } else {
                    con.release()
                    return res.render('register.hbs', { message: 'Password do not match', layout: 'auth' })
                }
            }
        })
    })
}

exports.logout = (req, res) => {
    req.logOut()
    res.redirect('/login')
}


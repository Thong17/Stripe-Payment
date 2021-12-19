const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const db = require('./database')

const initialize = (passport, getUserById) => {
    const authenticateUser = (username, password, done) => {
        db.getConnection((err, con) => {
            if (err) {
                con.release()
                return done(null, false, { message: 'Cannot connect to database' })
            }
            con.query('SELECT * FROM tbl_user WHERE username = ?', [username], async (err, result) => {
                if (err) {
                    con.release()
                    return done(null, false, { message: 'Cannot connect to database' })
                } 
                if (await result.length) {
                    if (await bcrypt.compare(password, result[0].password)) {
                        con.release()
                        return done(null, result[0])
                    } else {
                        con.release()
                        return done(null, false, { message: 'Password is incorrect' })
                    }
                } else {
                    con.release()
                    return done(null, false, { message: 'Username is incorrect' })
                }
            })
        })
    }

    passport.use(new localStrategy({ usernameField: 'username'}, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => done(null, getUserById(id)))
}

module.exports = initialize
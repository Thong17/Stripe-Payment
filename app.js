const express = require('express')
const dotenv = require('dotenv')
const hbs = require('express-hbs')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')
const methodOverride = require('method-override')

dotenv.config({ path: './.env' })

const dir = path.join(__dirname, './static')
const app = express()
const port = process.env.PORT
const host = process.env.HOST

app.engine('hbs', hbs.express4({ layoutsDir: __dirname + '/templates/layouts' }))
app.set('view-engine', 'hbs')
app.set('views', './templates/views')

app.use(express.static(dir))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride('_method'))

app.use(flash())
app.use(session({ secret: process.env.SECRET, saveUninitialized: true, resave: false }))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', require('./routers/page'))
app.use('/auth', require('./routers/auth'))
app.use('/payment', require('./routers/payment'))

app.listen(port, host)
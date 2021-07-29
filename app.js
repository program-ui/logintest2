const express = require('express')
const mongodb = require('./config/db')
const app = express()
const config = require('config')
const db = config.get('mongoURI');
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const appController = require("./controllers/appController");
const expressLayouts = require('express-ejs-layouts')
const flash = require('connect-flash')
const passport = require('passport')
require('./config/passport')(passport)
const {ensureAuthenticated} = require('./config/Auth')

const store = new MongoDBStore({
  uri: db,  
  collection: 'passport'
})

mongodb()

app.use(
   session({
     secret: "youwontknow",
     resave: false,
     saveUninitialized: false,
      cookie: {
    httpOnly: true,
    maxAge: 1*60*60*1000,
  },
     store: store,
   })
 );

app.use(expressLayouts)
app.set('view engine', 'ejs')

app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"))

app.use(flash())

app.use((req,res,next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next()
})





app.get('/', appController.landing_page)

app.get('/users/register', appController.register_get)

app.post('/users/register', appController.register_post)

app.get('/users/login', appController.login_get)

app.post('/users/login', appController.login_post)

app.get('/dashboard', ensureAuthenticated, appController.dashboard_get)

app.get('/users/logout', ensureAuthenticated, appController.logout_get)



app.listen(5000)



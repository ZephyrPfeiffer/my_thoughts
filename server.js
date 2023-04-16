// return user to same page there were on if they upload a image file that is not supported and notify them.
// give user ability to delete image that is being held in the image upload area when creating or update a post.

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const methodOverride = require("method-override")
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const thoughtRoutes = require('./routes/thoughts')

require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))

//Use forms for put / delete
app.use(methodOverride("_method"));

// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: true,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
  
app.use('/', mainRoutes)
app.use('/thought', thoughtRoutes)
 
connectDB().then(() => {
  
  app.listen(process.env.PORT, ()=> {
    console.log('Server is running, you better catch it!')
  })

})
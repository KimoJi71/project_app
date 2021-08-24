var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var bodyParser = require("body-parser")
var logger = require('morgan')
// var cors = require('cors')
// var fs = require('fs')
// var crypto = require('crypto')
// var _ = require('lodash')
// var multer = require('multer')

var searchBarRouter = require('./routes/searchBar')
var postsRouter = require('./routes/post')
var commentsRouter = require('./routes/comment')
var productsRouter = require('./routes/product')
var memberRouter = require('./routes/member')
var loginRouter = require('./routes/login')


var app = express()

// view engine setup
app.engine('html', require('ejs').renderFile)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))
// app.use(cors())

// app.use('/index', indexRouter)
app.use('/search', searchBarRouter)
app.use('/posts', postsRouter)
app.use('/comments', commentsRouter)
app.use('/products', productsRouter)
app.use('/members', memberRouter)
app.use('/', loginRouter)

console.log(`Server is running`)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

// error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    } 
  })
})

module.exports = app

const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser")
const logger = require('morgan')

/** Import Swagger Doc Modules Initial */
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const searchBarRouter = require('./routes/searchBar')
const postsRouter = require('./routes/post')
const commentsRouter = require('./routes/comment')
const productsRouter = require('./routes/product')
const memberRouter = require('./routes/member')
const loginRouter = require('./routes/login')
const collectionRouter = require('./routes/collection')
/* Setup Swagger Documentation File Resource */
const swaggerDocument = YAML.load('./misc/api-doc.yaml');

const app = express()

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
// Setup swagger doc router
app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Get images
app.use('/public/images', express.static('./public/images'))

// app.use('/index', indexRouter)
app.use('/search', searchBarRouter)
app.use('/posts', postsRouter)
app.use('/comments', commentsRouter)
app.use('/products', productsRouter)
app.use('/members', memberRouter)
app.use('/', loginRouter)
app.use('/collections', collectionRouter)

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
    message: error.message
  })
})

module.exports = app

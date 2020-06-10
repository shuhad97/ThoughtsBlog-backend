const config = require('./utils/configs')

const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

logger.info('Connecting to', config.PORT)


 
app.use(middleware.getToken)
app.use(cors())
app.use(express.static('build'))
app.use(express.json())



app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)



module.exports = app
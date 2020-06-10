const mongoose = require('mongoose')
const config = require('../utils/configs')
const logger = require('../utils/logger')
mongoose.set('useFindAndModify', false)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    
    .catch((error) =>{
        logger.errorMessage('Error connecting to MongoDB', error.message)
    })


   

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user :{
      type: mongoose.Schema.Types.ObjectId,
       ref: 'User'
    }
  })

  blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
  
      return returnedObject
    }
  })
  
  module.exports = mongoose.model('Blog', blogSchema)
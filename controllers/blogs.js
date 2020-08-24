const bcrypt = require('bcryptjs')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')





blogsRouter.get('/',  async (request, response) => {
    await Blog
      .find({}).populate('user') //Populate based on field name in schema
      .then(blogs => {
        response.json(blogs)
      })
  })
  
  blogsRouter.post('/',async (request, response) => {
    
    const body = request.body
    
    try{
    const tokenDecoded = jwt.verify(request.token, process.env.SECRET)
    const userID = await User.findById(tokenDecoded.id)
  
    
   //Initialise the blog content for the database
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      content: body.content,
      likes: 0,
      user: userID})

  
    await blog
      .save()
      .then(result => {
        
        return response.status(201).json(result)    
        
      }) 
    
    } catch(err){

          return response.status(401).json({error : 'invalid or missing token'})


    }

  })

  
  //Delete blog post based on given ID
  blogsRouter.delete('/:id', async (request, response)=>{

    const id = request.params.id

    await Blog.findOneAndRemove({_id:id}, (error) =>{

          if(!error){
            console.log('Blog with ID '  + id + ' has been deleted ')
            response.sendStatus(200)
        } else{
            response.sendStatus(500) 
        }

    })

  })

  //Update a blogpost endpoint
  blogsRouter.put('/:id', async(request, response) =>{


    const body = request.body
    const id = request.params.id
    
    const updateBlog = {

      title : body.title,
      author : body.author,
      content : body.content,
      url : body.url,
      likes: body.likes


    } 

    await Blog.findByIdAndUpdate({_id: id}, updateBlog, {new : true})
    .then((updatedNotes) =>{
        
      response.status(200).json(updatedNotes)


    }) 


  })


  module.exports = blogsRouter

  
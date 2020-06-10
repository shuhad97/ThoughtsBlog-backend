const bcrypt = require('bcryptjs')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')





blogsRouter.get('/',  async (request, response) => {
    console.log('here')
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
    console.log(tokenDecoded + 'here')
    const userID = await User.findById(tokenDecoded.id)
  
    console.log(userID)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: userID})
  
    await blog
      .save()
      .then(result => {
        response.status(201).json(result)
      }) 
    
    } catch(err){

          return response.status(401).json({error : 'invalid or missing token'})


    }

  })

  blogsRouter.post('/user', async (request, response, next)=>{

    const body = request.body
    const username = body.username
    const name = body.name
    const password = body.password

    if(password.length <3){

      response.status(400).send("Error: Increase password length")
      return next()
    }


    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)


    const user = User({

      username,
      name,
      passwordHash,


    })

     await user.save()
    
    User.find({}).then((results)=>{

      response.json(results)

    })


  })

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

  blogsRouter.put('/:id', async(request, response) =>{


    const body = request.body
    const id = request.params.id
    
    const updateBlog = {

      title : body.title,
      author : body.author,
      url : body.url,
      likes: body.likes


    } 

    await Blog.findByIdAndUpdate({_id: id}, updateBlog, {new : true})
    .then((updatedNotes) =>{
        
      response.status(200).json(updatedNotes)


    }) 


  })


  module.exports = blogsRouter

  
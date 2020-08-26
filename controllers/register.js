const registerRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const e = require('express')



registerRouter.post('/', async (request, response, next) => {

    const body = request.body
    const username = body.username
    const name = body.name
    const password = body.password

    if (password.length < 3) {

        response.json({
            "success" : false,
            "message" : "Error: Increase password length"})
        return next()
    }


    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)


    const user = User({

        username,
        name,
        passwordHash,


    })

   
    if(await userExistsCheck(username)){
        response.json({
            "success" : false,
            "message" : "Error: Username exists"})
        return next()
    }
    

    await user.save()

    User.find({}).then((results) => {
        //console.log(results)
        response.status(200).json({"success" :true})

         //Successful registration

    }).catch((error) => {
      
        response.status(500).json({"success" :false})

    })


})


const userExistsCheck = async (username) =>{
    //Checks if user exists in mongodb

     const data = await User.find({

        username,
            
    }).then((results) =>{
        console.log(results + '  results')
        
        return results
            

    })
   

    if(data.length){

       
        return true

    } else{
 
        return false

    }

  

}



module.exports = registerRouter
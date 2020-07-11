const registerRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')



registerRouter.post('/', async (request, response, next) => {

    const body = request.body
    const username = body.username
    const name = body.name
    const password = body.password

    if (password.length < 3) {

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

    User.find({}).then((results) => {
        console.log('here')

        response.status(200).json({"success" :true})

         //Successful login

    }).catch((error) => {
      
        response.status(500).json({"success" :false})

    })


})


module.exports = registerRouter
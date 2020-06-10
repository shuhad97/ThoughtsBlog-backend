
const loginRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

loginRouter.post('/', async (request, response) =>{

const body = request.body

const user = await User.findOne({ username: body.username})

console.log(user)

const pwCorrect = user === null ? false : await bcrypt.compare(body.password, user.passwordHash)

if(!(user && pwCorrect)){

    return response.status(400).json({
        error: 'username or password invalid'
    })

}

const tokenData = {
    username: user.username,
    id : user.id
}

const token = jwt.sign(tokenData, process.env.SECRET)

    response.status(200)
    .send({token, username: user.username, name: user.name})

})





module.exports = loginRouter

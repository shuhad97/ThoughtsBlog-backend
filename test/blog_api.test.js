

const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')

const api = supertest(app)

beforeEach(() =>{
    
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('blog is added', async()=>{

    const newBlog = {
        title: "The boy cried wolf",
        author: "Rakib",
        url: "https.adasdasd.w.w",
        likes: 32
    }

    const initResponse = await api.get('/api/blogs')
    await api.post('/api/blogs').send(newBlog).expect(201)
    const newResponse = await api.get('/api/blogs')
    expect(newResponse.body).toHaveLength(initResponse.body.length +1)
})

test('blog is added', async()=>{

    const newBlog = {
        title: "The boy cried wolf",
        author: "Rakib",
        url: "https.adasdasd.w.w",
        likes: 32
    }

    const initResponse = await api.get('/api/blogs')
    await api.post('/api/blogs').send(newBlog).expect(201)
    const newResponse = await api.get('/api/blogs')
    expect(newResponse.body).toHaveLength(initResponse.body.length +1)
})



afterAll(() => {
    mongoose.connection.close()
   

  })
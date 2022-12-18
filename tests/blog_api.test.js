const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/list_helper')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

//  Test Cases
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs have property named id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Node.js testing with Jest',
    author: 'keshab manni',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 24
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDB()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(r => r.title)
  expect(titles).toContain(
    newBlog.title
  )

})

test('if likes property is missing from request, it will default to value 0', async () => {
  const newBlogWithoutLikes = {
    title: 'Mongoose scheme property default values',
    author: 'Biraj Bhatta',
    url: 'http://www.u.arizona.edu/~rubinson/cop'
  }

  await api
    .post('/api/blogs')
    .send(newBlogWithoutLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDB()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(r => r.title)
  expect(titles).toContain(
    newBlogWithoutLikes.title
  )

  const blogExists = await Blog.find({ 'title': newBlogWithoutLikes.title })
  expect(blogExists[0].likes).toBe(0)

})

test('blog without title or url is not added', async () => {
  const blogWithoutTitle = {
    author: 'Nikhil Upreti',
    url: 'http://www.u.arizona.edu/~rubinson/cop',
    likes: 21
  }

  const blogWithoutUrl = {
    title: 'Mongoose scheme property default values',
    author: 'Biraj Bhatta',
    likes: 7
  }

  await api
    .post('/api/blogs')
    .send(blogWithoutTitle)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(blogWithoutUrl)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDB()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

// Footer
afterAll(() => {
  mongoose.connection.close()
})
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

//  GET
blogsRouter.get('/', (request, response, next) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
        .catch(error => next(error))
})

//  POST
blogsRouter.post('/', (request, response, next) => {
    const body = new Blog(request.body)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })
    blog
        .save()
        .then(savedBlog => {
            response.status(200).json(savedBlog)
        })
        .catch(error => next(error))
})

module.exports = blogsRouter
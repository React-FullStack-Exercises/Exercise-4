/* eslint-disable no-unused-vars */
var _ = require('lodash')
const dummy = ( blogs ) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  },0)
}

const favoriteBlog = (blogs) => {
  const favoriteBlog = blogs.reduce((prev, current) => {
    return (prev.likes > current.likes) ? prev: current
  },0)

  return favoriteBlog
}

const mostBlogs = (blogs) => {
  var countBlogs = _.map(_.groupBy(blogs, 'author'), (blogList, author) => ({ 'author': author, 'blogs': blogList.length }))
  return countBlogs.reduce((max, current) => max.blogs > current.blogs ? max : current)
}

const mostLikes = (blogs) => {
  var countLikes = _.map(_.groupBy(blogs, 'author'), (blogList, author) => ({ 'author': author, 'likes': blogList.reduce((sum, blog) => sum + blog.likes,0) }))
  return countLikes.reduce((max, current) => max.likes > current.likes ? max : current)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
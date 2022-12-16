/* eslint-disable no-unused-vars */
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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
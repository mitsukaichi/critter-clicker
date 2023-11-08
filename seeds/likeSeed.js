const { Likes } = require('../models');

const likeData = [
  {
    user_id: 1,
    posts_id: 3,
    liked: true
  },
  {
    user_id: 3,
    posts_id: 2,
    liked: false
  }, 
  {
    user_id: 2,
    posts_id: 4,
    liked: true
  }, 
  {
    user_id: 1,
    posts_id: 2,
    liked: false
  }, 
  {
    user_id: 5,
    posts_id: 4,
    liked: true
  }, 
  {
    user_id: 5,
    posts_id: 1,
    liked: false
  },
]

const seedLikes = () => Likes.bulkCreate(likeData);

module.exports = seedLikes
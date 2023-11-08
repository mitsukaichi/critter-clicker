const { Likes } = require('../models');

const likeData = [
  {
    users_id: 1,
    posts_id: 3,
    liked: true
  },
  {
    users_id: 3,
    posts_id: 2,
    liked: false
  }, 
  {
    users_id: 2,
    posts_id: 4,
    liked: true
  }, 
  {
    users_id: 1,
    posts_id: 2,
    liked: false
  }, 
  {
    users_id: 5,
    posts_id: 4,
    liked: true
  }, 
  {
    users_id: 5,
    posts_id: 1,
    liked: false
  },
]

const seedLikes = () => Likes.bulkCreate(likeData);

module.exports = seedLikes
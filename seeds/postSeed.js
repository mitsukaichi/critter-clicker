const { Posts } = require('../models');

const postData = [
  {
    title: 'Dog',
    post_text: 'example post of a users dog',
    user_id: 1,
  },
  {
    title: 'Cat',
    post_text: 'example post of a users cat',
    user_id: 2,
  },
  {
    title: 'Bird',
    post_text: 'example post of a users bird',
    user_id: 2,
  },
  {
    title: 'Fish',
    post_text: 'example post of a users fish',
    user_id: 3,
  },
  {
    title: 'Turtle',
    post_text: 'example post of a users turtle',
    user_id: 4,
  },
  {
    title: 'Puppy',
    post_text: 'example post of a users puppy',
    user_id: 5,
  },
]

const seedPosts = () => Posts.bulkCreate(postData);

module.exports = seedPosts;
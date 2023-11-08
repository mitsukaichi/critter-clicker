const { Posts } = require('../models');

const postData = [
  {
    title: 'Dog',
    post_text: 'example post of a users dog',
    users_id: 1,
  },
  {
    title: 'Cat',
    post_text: 'example post of a users cat',
    users_id: 2,
  },
  {
    title: 'Bird',
    post_text: 'example post of a users bird',
    users_id: 2,
  },
  {
    title: 'Fish',
    post_text: 'example post of a users fish',
    users_id: 3,
  },
  {
    title: 'Turtle',
    post_text: 'example post of a users turtle',
    users_id: 4,
  },
  {
    title: 'Puppy',
    post_text: 'example post of a users puppy',
    users_id: 5,
  },
]

const seedPosts = () => Posts.bulkCreate(postData);

module.exports = seedPosts;
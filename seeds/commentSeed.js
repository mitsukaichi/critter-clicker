const { Comments } = require('../models');

const commentData = [
  {
    comment_text: "Wow! Nice dog!",
    posts_id: 3,
    users_id: 1
  },
  {
    comment_text: "What a colorful bird!",
    posts_id: 1,
    users_id: 4
  },
  {
    comment_text: "I love your cat!",
    posts_id: 4,
    users_id: 2
  },
  {
    comment_text: "Your turtle is so cool!",
    posts_id: 4,
    users_id: 3
  },
  {
    comment_text: "Those fish are so colorful!",
    posts_id: 5,
    users_id: 5
  },
  {
    comment_text: "That is a big dog!",
    posts_id: 5,
    users_id: 4
  },
];

const seedComments = () => Comments.bulkCreate(commentData);

module.exports = seedComments;
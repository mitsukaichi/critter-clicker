const { Comments } = require('../models');

const commentData = [
  {
    comment_text: "Wow! Nice dog!",
    post_id: 3,
    user_id: 1
  },
  {
    comment_text: "What a colorful bird!",
    post_id: 1,
    user_id: 4
  },
  {
    comment_text: "I love your cat!",
    post_id: 4,
    user_id: 2
  },
  {
    comment_text: "Your turtle is so cool!",
    post_id: 4,
    user_id: 3
  },
  {
    comment_text: "Those fish are so colorful!",
    post_id: 5,
    user_id: 5
  },
  {
    comment_text: "That is a big dog!",
    post_id: 5,
    user_id: 4
  },
];

const seedComments = () => Comments.bulkCreate(commentData);

module.exports = seedComments;
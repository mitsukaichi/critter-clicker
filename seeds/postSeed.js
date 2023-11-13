const { Posts } = require('../models');

const postData = [
  {
    title: 'https://images.squarespace-cdn.com/content/v1/5e3d772b8465d45bc9bd4cdb/4916045f-6e64-4738-97a6-2dce806193cc/8431CB83-3A70-4849-8DAE-C557E42E7BA8.jpeg',
    post_text: 'example post of a users dog',
    users_id: 1,
    categories_id: 1
  },
  {
    title: 'https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg',
    // post_text: 'example post of a users cat',
    users_id: 2,
    categories_id: 2
  },
  {
    title: 'https://i.pinimg.com/236x/43/e0/cd/43e0cd15d6b93b2d7fbcdd1831465415.jpg',
    // post_text: 'example post of a users bird',
    users_id: 2,
    categories_id: 4
  },
  {
    title: 'https://mymodernmet.com/wp/wp-content/uploads/2020/05/koi-fish-1.jpg',
    // post_text: 'example post of a users fish',
    users_id: 3,
    categories_id: 3
  },
  {
    title: 'https://i.insider.com/5f9887bf69331a0011bc5959?width=700',
    // post_text: 'example post of a users turtle',
    users_id: 4,
    categories_id: 5
  },
  {
    title: 'https://images.pexels.com/photos/1346086/pexels-photo-1346086.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    // post_text: 'example post of a users puppy',
    users_id: 5,
    categories_id: 1
  },
]

const seedPosts = () => Posts.bulkCreate(postData);

module.exports = seedPosts;
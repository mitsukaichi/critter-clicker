const { Users } = require('../models');

const userData = [
  {
    username: "Aaron",
    email: "aaron@gmail.com",
    password: "password1"
  },
  {
    username: "Janet",
    email: "janet@gmail.com",
    password: "password2"
  },
  {
    username: "Minami",
    email: "minami@gmail.com",
    password: "password3"
  },
  {
    username: "Anthony",
    email: "anthony@gmail.com",
    password: "password4"
  },
  {
    username: "Ace",
    email: "ace@gmail.com",
    password: "password5"
  }
];

const seedUsers = () => Users.bulkCreate(userData);


module.exports = seedUsers;
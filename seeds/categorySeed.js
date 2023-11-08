const { Categories } = require('../models');

const categoryData = [
  {
    title: "Dog",
  },
  {
    title: "Cat",
  },
  {
    title: "Fish",
  },
  {
    title: "Bird",
  },
  {
    title: "Amphibian",
  },
  {
    title: "Dog",
  },
];

const seedCategories = () => Categories.bulkCreate(categoryData);

module.exports = seedCategories;
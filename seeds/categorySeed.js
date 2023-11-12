const { Categories } = require('../models');

const categoryData = [
  {
    category: "Dog",
  },
  {
    category: "Cat",
  },
  {
    category: "Fish",
  },
  {
    category: "Bird",
  },
  {
    category: "Amphibian",
  },
  {
    category: "Reptile",
  },
  {
    category: "Rodent",
  },
];

const seedCategories = () => Categories.bulkCreate(categoryData);

module.exports = seedCategories;
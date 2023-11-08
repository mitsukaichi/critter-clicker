const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class PostCategories extends Model {}

PostCategories.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    posts_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'posts',
        key: 'id'
      }
    },
    categories_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categories',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post_categories',
  }
);

module.exports = PostCategories;
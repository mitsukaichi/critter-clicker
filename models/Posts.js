const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
 
class Posts extends Model {}

Posts.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_text: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        users_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        post_category: {
            type: DataTypes.INTEGER,
            references: {
                model: 'categories',
                key: 'id'
            }
        }
      
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'posts'
    }
)


module.exports = Posts;
const Comments = require('./Comments');
const Users = require('./Users');
const Categories = require('./Categories');
const Posts = require('./Posts');
const Likes = require('./Likes');

Comments.belongsTo(Users, {
    foreignKey: 'users_id'
});

Users.hasMany(Comments, {
    foreignKey: 'users_id'
});

Posts.belongsTo(Users, {
    foreignKey: 'users_id'
});

Users.hasMany(Posts, {
    foreignKey: 'users_id'
});

Likes.belongsTo(Users, {
    foreignKey: 'users_id'
});

Users.hasMany(Likes, {
    foreignKey: 'users_id'
});

Comments.belongsTo(Posts, {
    foreignKey: 'posts_id'
});

Posts.hasMany(Comments, {
    foreignKey: 'posts_id'
});

Likes.belongsTo(Posts, {
    foreignKey: 'posts_id'
});

Posts.hasMany(Likes, {
    foreignKey: 'posts_id'
});

Categories.hasMany(Posts, {
    foreignKey: 'categories_id'
});

Posts.belongsTo(Categories, {
    foreignKey: 'categories_id'
});

module.exports = { Comments, Users, Posts, Categories, Likes }
const Comments = require('./Comments');
const Users = require('./Users');
const Categories = require('./Categories');
const Posts = require('./Posts');
const Likes = require('./Likes')

Comments.belongsTo(Users, {
    foreignKey: 'user_id'
});

Users.hasMany(Posts, {
    foreignKey: 'user_id'
});

Users.hasMany(Comments, {
    foreignKey: 'user_id'
});

Users.hasMany(Likes, {
    foreignKey: 'user_id'
});

Posts.belongsTo(Users, {
    foreignKey: 'user_id'
});

Posts.hasMany(Comments, {
    foreignKey: 'post_id'
});

Posts.hasMany(Likes, {
    foreignKey: 'post_id'
});

Posts.hasMany(Categories, {
    foreignKey: 'post_id'
});

Categories.belongsToMany(Posts, {
    foreignKey: 'post_id'
});

Likes.belongsTo(Posts, {
    foreignKey: 'post_id'
});

Likes.belongsTo(Users, {
    foreignKey: 'user_id'
});

module.exports = { Comments, Users, Posts, Categories, Likes }
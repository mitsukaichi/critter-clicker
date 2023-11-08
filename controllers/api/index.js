// IMPORTS
const router = require('express').Router();
const userRoutes = require('./user-routes');
const petpicRoutes = require('./petpic-routes');
const commentRoutes = require('./comment-routes');
// const categoryRoutes = require('./category-routes');
// const likeRoutes = require('./like-routes');

// MIDDLEWARE
router.use('/users', userRoutes);
router.use('/petpic', petpicRoutes);
router.use('/comments', commentRoutes);
// router.use('/categories', categoryRoutes);
// router.use('/likes', likeRoutes);

// EXPORT
module.exports = router;
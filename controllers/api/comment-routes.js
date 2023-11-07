// IMPORTS
const router = require('express').Router();
const { Users, Posts, Index, Comments, Categories, Likes } = require('../../models');
const withAuth = require('../../utils/auth');

// POST ROUTE to post a comment
router.post('/', async (req, res) => {
    try {
        console.log("Time to post a comment!");
        const comment = await Comments.create({
            comment: req.body.comment,
            posts_id: req.body.posts_id,
            user_id: req.session.user_id || req.body.user_id,
        });
        res.status(200).json(comment);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// GET ROUTE to load all comments on post
router.get('/', async (req, res) => {
    try {
        const commentData = await Comments.findAll({
            include: [
                {
                    model: Users,
                    attributes: ["username"],
                },
                {
                    model: Posts,
                    attribute: ["id"],
                },
            ],
        });
        res.status(200).json(commentData);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})
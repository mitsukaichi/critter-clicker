// IMPORTS
const router = require('express').Router();
const { Users, Posts, Index, Comments, Categories } = require('../models'); // may need to update based off models
const withAuth = require('../utils/auth'); // may need to update based off utils

// GET all petpic posts
router.get('/', async (req, res) => {
    try {
        const petpicData = await Posts.findAll({
            include: [
                {
                    model: Users,
                    attributes: ["username"],
                },
                {
                    model: Comments,
                    attributes: ["comment"],
                },
                {
                    model: Likes,
                    attributes: ["like"],
                },
            ],
        });

        const petpicPosts = petpicData.map((petpicPost) =>
        petpicPost.get({ plain: true }));

        res.render('homepage', {
            petpicPosts,
            logged_in: req.session.logged_in,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

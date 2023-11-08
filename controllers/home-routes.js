// IMPORTS
const router = require('express').Router();
const { Users, Posts, Comments, Categories, Likes } = require('../models'); // may need to update based off models
const withAuth = require('../utils/auth'); // may need to update based off utils

// GET ROUTE all petpic posts
router.get('/', async (req, res) => {
    try {
        const petpicData = await Posts.findAll({
            include: [
                {
                    model: Users,
                    attributes: ["users"],
                },
                {
                    model: Comments,
                    attributes: ["comments"],
                },
                {
                    model: Categories,
                    attributes: ["categories"],
                },
                {
                    model: Likes,
                    attributes: ["likes"],
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
});

// GET ROUTE to an individual petpic post
router.get('/petpic/:id', withAuth, async (req, res) => {
    try {
        const petpicData = await Posts.findByPk(req.params.id, {
            include: [
                {
                    model: Users,
                    attributes: ["username"],
                },
                {
                    model: Comments,
                    include: [Users],
                },
                {
                    model: Categories,
                    attributes: ["category"],
                },
                {
                    model: Likes,
                    attributes: ["like"],
                },
            ],
        });

        const petpicPost = petpicData.get({ plain: true });
        console.log(petpicPost)

        res.render('petpic', {
            ...petpicPost,
            logged_in: req.session.logged_in,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
        res.redirect('/login');
    }
});

// GET ROUTE to navigate to dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ["password"] },
            include: [
                {
                    model: Posts,
                    include: [Users],
                },
                {
                    model: Comments,
                },
                {
                    model: Likes,
                },
            ],
        });

        const user = userData.get({ plain: true });
        console.log(user);

        res.render('dashboard', {
            ...user,
            logged_in: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// GET ROUTE to retrieve new post creation page
router.get('/create', async (req, res) => {
    try {
        if (req.session.logged_in) {
            res.render('create', {
                logged_in: req.session.logged_in,
                userId: req.session.user_id,
            });
            return;
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// GET ROUTE to retrieve a post by ID to edit page
// most likely we won't use this route
router.get('/create/:id', async (req, res) => {
    try {
        const petpicData = await Posts.findByPk(req.params.id, {
            include: [
                {
                    model: Users,
                    attributes: ["name"],
                },
                {
                    model: Comments,
                    include: [Users],
                },
                {
                    model: Categories,
                    attributes: ["category"],
                },
            ],
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// ROUTE to login page
router.all('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

module.exports = router;
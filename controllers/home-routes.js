// IMPORTS
const router = require('express').Router();
const { Users, Posts, Comments, Categories, Likes } = require('../models'); // may need to update based off models
const withAuth = require('../utils/auth'); // may need to update based off utils
const sequelize = require('../config/connection');

// GET ROUTE all petpic posts

router.get('/', async (req, res) => {
    if (req.session.users_id)  {
        try {
            const petpicData = await Posts.findAll({
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [
                    { model: Users },
                    { model: Comments },
                    { model: Categories },
                    { model: Likes },
                ],
                attributes: {
                    include: [
                        [
                            sequelize.literal(`(SELECT COUNT(*) FROM likes WHERE liked = true AND likes.posts_id = posts.id GROUP BY posts_id)`),
                            'likedCount'
                        ],
                        [
                            sequelize.literal(`(SELECT COUNT(*) FROM likes WHERE users_id = ${req.session.users_id} AND liked = true AND likes.posts_id = posts.id)`),
                            'isLiked'
                        ]
                    ]
                }
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
    } else {
        try {
            const petpicData = await Posts.findAll({
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [
                    { model: Users },
                    { model: Comments },
                    { model: Categories },
                    { model: Likes },
                ],
                attributes: {
                    include: [[
                    sequelize.literal(`(SELECT COUNT(*) FROM likes WHERE liked = true AND likes.posts_id = posts.id GROUP BY posts_id)`),
                    'likedCount'
                ]]
                }
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
    }
});

// GET ROUTE to an individual petpic post
router.get('/petpic/:id', async (req, res) => {
    if (req.session.users_id)  {
        try {
            const petpicData = await Posts.findByPk(req.params.id, {
                include: [
                    { model: Users },
                    { model: Comments,
                        include: [
                            { model: Users },
                        ] },
                    { model: Categories },
                    { model: Likes },
                ],
                attributes: {
                    include: [
                        [
                            sequelize.literal(`(SELECT COUNT(*) FROM likes WHERE liked = true AND likes.posts_id = posts.id GROUP BY posts_id)`),
                            'likedCount'
                        ],
                        [
                            sequelize.literal(`(SELECT COUNT(*) FROM likes WHERE users_id = ${req.session.users_id} AND liked = true AND likes.posts_id = posts.id)`),
                            'isLiked'
                        ]
                    ]
                }
            });
            const petpicPost = petpicData.get({ plain: true });
            res.render('petpic', {
                ...petpicPost,
                logged_in: req.session.logged_in,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
            res.redirect('/login');
        }
    } else {
        try {
            const petpicData = await Posts.findByPk(req.params.id, {
                include: [
                    { model: Users },
                    { model: Comments,
                        include: [
                            { model: Users },
                        ] },
                    { model: Categories },
                    { model: Likes },
                ],
                attributes: {
                    include: [
                        [
                            sequelize.literal(`(SELECT COUNT(*) FROM likes WHERE liked = true AND likes.posts_id = posts.id GROUP BY posts_id)`),
                            'likedCount'
                        ]
                    ]
                }
            });
            const petpicPost = petpicData.get({ plain: true });
            res.render('petpic', {
                ...petpicPost,
                logged_in: req.session.logged_in,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
            res.redirect('/login');
        }
    }    
});

// GET ROUTE to navigate to dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const petpicData = await Posts.findAll({
            where: {
                    users_id: req.session.users_id,
                    }, 
            include: [
                { model: Users },
                { model: Comments },
                { model: Categories },
                { model: Likes },
            ],
            attributes: {
                include: [
                    [
                        sequelize.literal(`(SELECT COUNT(*) FROM likes WHERE liked = true AND likes.posts_id = posts.id GROUP BY posts_id)`),
                        'likedCount'
                    ]
                ]
            }
        });
        const petpicPosts = petpicData.map((petpicPost) =>
        petpicPost.get({ plain: true }));

        console.log(petpicPosts);
        res.render('dashboard', {
            petpicPosts,
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
            const categoryData = await Categories.findAll();
            const categories = categoryData.map((category) =>
                category.get({ plain: true }));
            console.log(categories);
            res.render('create', {
                categories,
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
                    // attributes: ["users"],
                },
                {
                    model: Comments,
                    include: [Users],
                },
                {
                    model: Categories,
                    // attributes: ["categories"],
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

// Category route 
router.get('/categories/:id', async (req, res) => {
    if (req.session.users_id)  {
        try {
            const petpicData = await Posts.findAll({
                where: {
                    categories_id: req.params.id,
                    }, 
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [
                    { model: Users },
                    { model: Comments },
                    { model: Categories },
                    { model: Likes },
                ],
                attributes: {
                    include: [
                        [
                            sequelize.literal(`(SELECT COUNT(*) FROM likes WHERE liked = true AND likes.posts_id = posts.id GROUP BY posts_id)`),
                            'likedCount'
                        ],
                        [
                            sequelize.literal(`(SELECT COUNT(*) FROM likes WHERE users_id = ${req.session.users_id} AND liked = true AND likes.posts_id = posts.id)`),
                            'isLiked'
                        ]
                    ]
                }
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
    } else {
        try {
            const petpicData = await Posts.findAll({
                where: {
                    categories_id: req.params.id,
                    },
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [
                    { model: Users },
                    { model: Comments },
                    { model: Categories },
                    { model: Likes },
                ],
                attributes: {
                    include: [[
                    sequelize.literal(`(SELECT COUNT(*) FROM likes WHERE liked = true AND likes.posts_id = posts.id GROUP BY posts_id)`),
                    'likedCount'
                ]]
                }
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
    }
});


// Lookup by likes route
router.get('/likes', async (req, res) => {
    if (req.session.users_id)  {
        try {
            const petpicData = await Posts.findAll({
                order: [
                    ['likedCount', 'DESC']
                ],
                include: [
                    { model: Users },
                    { model: Comments },
                    { model: Categories },
                    { model: Likes },
                ],
                attributes: {
                    include: [
                        [
                            sequelize.literal(`(SELECT COUNT(*) FROM likes WHERE liked = true AND likes.posts_id = posts.id GROUP BY posts_id)`),
                            'likedCount'
                        ],
                        [
                            sequelize.literal(`(SELECT COUNT(*) FROM likes WHERE users_id = ${req.session.users_id} AND liked = true AND likes.posts_id = posts.id)`),
                            'isLiked'
                        ]
                    ]
                }
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
    } else {
        try {
            const petpicData = await Posts.findAll({
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [
                    { model: Users },
                    { model: Comments },
                    { model: Categories },
                    { model: Likes },
                ],
                attributes: {
                    include: [[
                    sequelize.literal(`(SELECT COUNT(*) FROM likes WHERE liked = true AND likes.posts_id = posts.id GROUP BY posts_id)`),
                    'likedCount'
                ]]
                }
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
    }
});

module.exports = router;
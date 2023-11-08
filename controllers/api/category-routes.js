// IMPORTS
const router = require('express').Router();
const { Users, Posts, Index, Comments, Categories, Likes } = require('../../models');
const withAuth = require('../../utils/auth');

// GET ROUTE to pull all from specific category ID
router.get('/catorgies/:id', withAuth, async (req, res) => {
    try {
        const categoryData = await Categories.findByPk(req.params.id, {
            include: [
                {
                    model: Posts,
                    attribute: ["id"],
                },
                {
                    model: Users,
                    attribute: ["username"],
                },
                {
                    model: Likes,
                    attribute: ["id"],
                },
            ],
        });

        const category = categoryData.get({ plain: true });
        console.log(category);

        res.render('categories', {
            ...category,
            logged_in: req.session.logged_in,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
        res.redirect('/login');
    }
});
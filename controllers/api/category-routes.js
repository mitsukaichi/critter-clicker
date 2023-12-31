// IMPORTS
const router = require('express').Router();
const { Users, Posts, Categories, Likes } = require('../../models');

// GET ROUTE to pull ALL categories
router.get('/', async (req, res) => {
    try {
        const categoryData = await Categories.findAll(req.params.id, {
            include: [
                { model: Posts },
                { model: Users },
                { model: Likes },
            ],
        });

        const categories = categoryData.map((category) =>
            category.get({ plain: true }));

            res.render('create', {
                categories,
                logged_in: req.session.logged_in,
            });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// GET ROUTE to pull from specific category ID
router.get('/categories/:id', async (req, res) => {
    try {
        const categoryData = await Categories.findByPk(req.params.id, {
            include: [
                { model: Posts },
                { model: Users },
                { model: Likes },
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
    }
});

// EXPORT
module.exports = router;
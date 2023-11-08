// IMPORTS
const router = require('express').Router();
const { Users, Posts, Comments, Categories, Likes } = require('../../models');
const withAuth = require('../../utils/auth');

// GET ROUTE to pull all liked posts
// may not need this? maybe need it to sort them?
router.get('/', withAuth, async (req, res) => {
    try {
        const likedData = await Likes.findAll({
            include: [
                {
                    model: Posts,
                    attribute: ["id"],
                },
                {
                    model: Users,
                    attribute: ["users"],
                },
                {
                    model: Categories,
                    attribute: ["title"],
                },
            ],
        });

        const like = likedData.get({ plain: true });
        console.log(like);

        res.render('categories', {
            ...like,
            logged_in: req.session.logged_in,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
        res.redirect('/login');
    }
});

// POST ROUTE to add a like to a petpic post
router.post('/:id', withAuth, async (req, res) => {
    console.log(req.body);
    try {
        const newLike = await Likes.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        req.status(200).json(newLike);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

// DELETE ROUTE to remove a like from a petpic post
router.delete('/:id', withAuth, async (req, res) => {
    console.log(req.params.id);
    try {
        const likedData = await Likes.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!likedData) {
            res.status(404).json({ message: "Could not find"});
            return;
        }
        res.status(200).json(likedData);
    } catch (error) {
        console.log(error);
        res.status(500).json(error); 
    }
})

// EXPORT
module.exports = router;
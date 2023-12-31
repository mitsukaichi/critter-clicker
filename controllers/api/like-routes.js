// IMPORTS
const router = require('express').Router();
const { Users, Posts, Categories, Likes } = require('../../models');
const withAuth = require('../../utils/auth');

// GET ROUTE to pull all liked posts
// may not need this? maybe need it to sort them?
router.get('/', withAuth, async (req, res) => {
    try {
        const likedData = await Likes.findAll({
            include: [
                { model: Posts },
                { model: Users },
                { model: Categories },
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
    try {
        const newLike = await Likes.create({
            ...req.body,
            users_id: req.session.users_id,
        });
        res.status(200).json(newLike);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

// DELETE ROUTE to remove a like from a petpic post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const likedData = await Likes.destroy({
            where: {
                users_id: req.session.users_id,
                posts_id: req.body.posts_id
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
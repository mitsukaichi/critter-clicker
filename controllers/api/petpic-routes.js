// IMPORTS
const router = require('express').Router();
const { Users, Posts, Comments, Categories, Likes } = require('../../models');
const withAuth = require('../../utils/auth');
const { route } = require('./user-routes');

// POST ROUTE to create a new petpic post
router.post('/', withAuth, async (req, res) => {
    console.log(req.body);
    try {
        const newPetPic = await Posts.create({
            ...req.body,
            users_id: req.session.users_id,
        });

        res.status(200).json(newPetPic);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

// PUT ROUTE to edit an existing pet pic
// most likely won't use this!
router.put('/:id', withAuth, async (req, res) => {
    console.log(req.body);
    try {
        const petpicData = await Posts.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (!petpicData) {
            res.status(404).json({ message: "There is no post with that ID" });
            return;
        }
        res.status(200).json(petpicData);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// DELETE ROUTE to remove an existing post
router.delete('/:id', withAuth, async (req, res) => {
    console.log(req.params.id);
    try {
        const petpicData = await Posts.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!petpicData) {
            res.status(404).json({ message: "There is no post with that ID" });
            return;
        }
        res.status(200).json(petpicData);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// EXPORT
module.exports = router;
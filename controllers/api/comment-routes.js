// IMPORTS
const router = require('express').Router();
const { Users, Posts, Comments, Categories, Likes } = require('../../models');
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
});

// PUT ROUTE to update a comment
// most likely we will not use this!
router.put('/:id', async (req, res) => {
    try {
        const updatedComment = await Comment.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (!updatedComment[0]) {
            res.status(400).json({ message: "There is no comment with that ID"});
            return;
        }
        console.log("Updated comment");
        res.status(200).json(updatedComment);
    } catch (error) {
        console.log(err);
        res.status(500).json(err);
    }
});

// DELETE ROUTE to delete a comment
// most likely we will not use this!
router.delete('/:id', async (req, res) => {
    try {
        const comment = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!comment) {
            res.status(404).json({ message: "There is no comment with that ID" });
            return;
        }
        res.status(200).json(comment);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// EXPORT
module.exports = router;
// IMPORTS
const router = require('express').Router();
const { Users, Posts, Index, Comments, Categories, Likes } = require('../../models');
const withAuth = require('../../utils/auth');

// POST ROUTE to create a new petpic post
router.post('/', withAuth, async (req, res) => {
    console.log(req.body);
    try {
        const newPetPic = await Posts.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPetPic);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
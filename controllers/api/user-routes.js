// IMPORTS
const router = require('express').Router();
const { Users, Posts, Index, Comments, Categories, Likes } = require('../../models');

// POST ROUTE to create a new user
router.post('/', async (req, res) => {
    try {
        const userData = await Users.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
})
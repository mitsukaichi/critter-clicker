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
});

// POST ROUTE to login to the website
router.post('/login', async (req, res) => {
    try {
        const userData = await Users.findOne({ where: { email: req.body.email } });

        if (!userData) {
            console.log("Could not find that user");
            res.status(400).json({ message: "Incorrect email. Please try again."});
            return;
        };

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            console.log("That password did not match our records");
            res.status(400).json({ message: "Incorrect password. Please try again."});
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({ user: userData, message: "You have successfully logged in!"});
        });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

// POST ROUTE to log user out
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// EXPORT
module.exports = router;
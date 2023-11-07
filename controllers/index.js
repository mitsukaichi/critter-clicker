// IMPORTS
const router = require('express').Router();
const homeRoutes = require('./home-routes');
const apiRoutes = require('./api');

// MIDDLEWARE
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// ERROR HANDLING
router.use((req, res) => res.status(404).end());

// EXPORT
module.exports = router;
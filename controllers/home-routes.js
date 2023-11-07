// IMPORTS
const router = require('express').Router();
const { Users, Posts, Index, Comments, Categories } = require('../models'); // may need to update based off models
const withAuth = require('../utils/auth'); // may need to update based off utils



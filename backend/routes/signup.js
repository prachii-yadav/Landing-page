const express = require('express');
const { signup } = require('../controllers/signupController');

const router = express.Router();

// POST /api/signup
router.post('/signup', signup);

module.exports = router;

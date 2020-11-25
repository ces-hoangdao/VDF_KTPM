const express = require('express');
const userController = require('../controllers/User');


const router = express.Router();

router.get('/test', userController.test)
router.post('/register', userController.createUser);

module.exports = router
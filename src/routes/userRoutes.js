const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/captcha', userController.captcha);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/getMenus', userController.getMenus);

module.exports = router;

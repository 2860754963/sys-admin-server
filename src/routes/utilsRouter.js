const express = require('express');
const router = express.Router();
const utilsController = require('../controllers/utilsController');
const upload = require('../middlewares/multer');

router.post('/upload', upload, utilsController.upload);

module.exports = router;

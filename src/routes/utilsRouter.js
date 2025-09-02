const express = require('express');
const router = express.Router();
const utilsController = require('../controllers/utilsController');
const uploadMulter = require('../middlewares/multer');

router.post('/upload', uploadMulter.single('file'), utilsController.upload);
// router.post('/avater', upload.single('avater'), utilsController.uploadAvatar);

module.exports = router;

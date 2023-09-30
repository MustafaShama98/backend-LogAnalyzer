const express = require('express');
const router = express.Router();
const logController = require('./logController');

router.get('/', logController.getLogFiles);
router.post('/getData', logController.postData);
router.get('/:filename', logController.getFileData);

module.exports = router;

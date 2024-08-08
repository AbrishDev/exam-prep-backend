const express = require('express');
const linkController = require('../controllers/linkController');

const router = express.Router();

router.post('/add', linkController.addLink);
router.get('/', linkController.getAllLinks);

module.exports = router;

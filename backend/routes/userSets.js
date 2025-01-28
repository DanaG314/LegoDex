const express = require('express');
const router = express.Router();
const userSetsCtrl = require('../controllers/userSets');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// router.get('/', legoSetsCtrl.index);
router.post('/:legoId', ensureLoggedIn, userSetsCtrl.create);
// router.get('/:legoSetId', legoSetsCtrl.show);

module.exports = router;

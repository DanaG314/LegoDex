const express = require('express');
const router = express.Router();
const userSetsCtrl = require('../controllers/userSets');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

router.get('/', ensureLoggedIn, userSetsCtrl.index);
router.get('/:legoId', ensureLoggedIn, userSetsCtrl.showUserSet);
router.put('/:legoId', ensureLoggedIn, userSetsCtrl.update);
router.post('/:legoId', ensureLoggedIn, userSetsCtrl.create);
router.delete('/:legoId', ensureLoggedIn, userSetsCtrl.removeSet);
// router.get('/:legoSetId', legoSetsCtrl.show);

module.exports = router;

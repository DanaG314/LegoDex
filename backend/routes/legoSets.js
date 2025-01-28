const express = require('express');
const router = express.Router();
const legoSetsCtrl = require('../controllers/legoSets');

router.get('/', legoSetsCtrl.index);
router.post('/', legoSetsCtrl.search);
router.get('/:legoSetId', legoSetsCtrl.show);

module.exports = router;

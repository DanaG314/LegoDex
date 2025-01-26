const express = require('express');
const router = express.Router();
const legoSetsCtrl = require('../controllers/legoSets');

router.get('/', legoSetsCtrl.index);
router.get('/:legoSetId', legoSetsCtrl.show);

module.exports = router;

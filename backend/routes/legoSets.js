const express = require('express');
const router = express.Router();
const legoSetsCtrl = require('../controllers/legoSets');
// All paths start with '/api/posts'
router.get('/', legoSetsCtrl.index);
// // POST /api/posts
// router.post('/', postsCtrl.create);
// // // Get /api/posts
// router.get('/', postsCtrl.index);

module.exports = router;

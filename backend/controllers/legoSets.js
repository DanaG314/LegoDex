const LegoSet = require('../models/legoSets');
const {
  obtainHashKey,
  getSets,
  getSet,
} = require('../services/legoApiService.js');

module.exports = {
  index,
  show,
};

async function index(req, res) {
  try {
    // getting userHash
    const { hash } = await obtainHashKey();
    // calling getSets passing userHash
    const resp = await getSets(hash);

    res.json(resp);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

async function show(req, res) {
  const id = req.params.legoSetId;
  try {
    const { hash } = await obtainHashKey();
    const resp = await getSet(hash, id);
    res.json(resp);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

// async function index(req, res) {
//   const posts = await Post.find({}).populate('user').sort('-createdAt');
//   res.json(posts);
// }

// async function create(req, res) {
//   try {
//     req.body.user = req.user._id;
//     const post = await Post.create(req.body);
//     res.json(post);
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ message: 'Create Post Failed' });
//   }
// }

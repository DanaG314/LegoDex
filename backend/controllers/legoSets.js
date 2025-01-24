const LegoSet = require('../models/legoSets');

// module.exports = {
//   create,
//   index,
// };

async function index(req, res) {
  try {
    const legoSets = await LegoSet.find({})
      .populate('setId')
      .sort({ year: '2024' });
    res.status(200).json(legoSets);
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

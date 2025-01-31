const UserLego = require('../models/userSets.js');
const {
  obtainHashKey,
  getSets,
  getSet,
} = require('../services/legoApiService.js');
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

module.exports = {
  create,
  index,
  showUserSet,
  update,
  removeSet,
};
// 679bccc051c9453663e84c18
// 6793c190f22579202f6335bf
async function index(req, res) {
  try {
    // getting userHash
    // const { hash } = await obtainHashKey();
    // calling getSets passing userHash
    const sets = await UserLego.find({ user: req.user._id });
    console.log('Sets: ', sets);

    res.json(sets);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

async function showUserSet(req, res) {
  console.log(req.params);
  try {
    const set = await UserLego.findById(req.params.legoId);
    res.status(200).json(set);
  } catch (err) {
    console.log(err);
  }
}

async function update(req, res) {
  try {
    const { legoId } = req.params;
    const updates = req.body;
    console.log('req user id', req.user._id);
    const updatedSet = await UserLego.findByIdAndUpdate(
      req.params.legoId,
      req.body,
      { new: true }
    ).populate('user');

    res.status(200).json({ message: 'Lego set not found or unauthorized' });
  } catch (err) {
    console.log(err);
  }
}

async function create(req, res) {
  const { _id } = req.user;
  console.log(_id);
  const {
    availabilityStatus,
    inWishlist,
    inFavourites,
    condition,
    numberVariant,
    number,
    name,
    imageURL,
    rating,
    notes,
  } = req.body;

  try {
    const generatedLegoId = `${number}-${numberVariant}`;

    const set = {
      user: _id,
      legoId: generatedLegoId,
      inCollection: true,
      availabilityStatus,
      inWishlist,
      inFavourites,
      condition,
      legoName: name,
      imageURL,
      rating,
      notes,
    };
    console.log(set);

    const userLego = await UserLego.create(set);
    console.log(userLego);

    res.status(201).json({ message: 'Lego set added succefully', userLego });
  } catch (err) {
    res.status(500).json({ error: `ERROR: ${err}` });
  }
}

async function removeSet(req, res) {
  try {
    const set = await UserLego.findById(req.params.legoId);
    if (!set.user.equals(req.user._id)) {
      return res.status(403).send('You are not authorized to do that!');
    }
    const deletedSet = await UserLego.findByIdAndDelete(req.params.legoId);
    res.status(200).json(deletedSet);
  } catch (err) {
    console.log(err);
  }
}

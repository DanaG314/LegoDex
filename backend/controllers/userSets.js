const UserLego = require('../models/userSets.js');
const {
  obtainHashKey,
  getSets,
  getSet,
} = require('../services/legoApiService.js');

module.exports = {
  create,
  index,
  showUserSet,
  update,
};

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

    const updatedSet = await UserLego.findOneAndUpdate(
      { _id: legoId, user: req.user._id },
      updates,
      { new: true }
    );
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

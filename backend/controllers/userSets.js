const UserLego = require('../models/userSets.js');
const {
  obtainHashKey,
  getSets,
  getSet,
} = require('../services/legoApiService.js');

module.exports = {
  create,
  index,
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

async function create(req, res) {
  const { legoId } = req.params;
  const { _id } = req.user;
  console.log(_id);
  const {
    availabilityStatus,
    condition,
    numberVariant,
    number,
    name,
    imageURL,
    rating,
  } = req.body;

  try {
    const generatedLegoId = `${number}-${numberVariant}`;

    const existingLego = await UserLego.findOne({
      user: _id,
      legoId: generatedLegoId,
    });
    if (existingLego) {
      return res.status(400).json({ message: 'Already owned set' });
    }

    const userLego = new UserLego({
      user: _id,
      legoId: generatedLegoId,
      inCollection: true,
      availabilityStatus,
      condition,
      name,
      imageURL,
      rating,
    });

    await userLego.save();
    res.status(201).json({ message: 'Lego set added succefully', userLego });
  } catch (err) {
    res.status(500).json({ error: `ERROR: ${err}` });
  }
}

// try {
//   let userLego = await UserLego.findOne({
//     user: _id,
//     legoId: `${number}-${numberVariant}`,
//   });

// if (!userLego) {
//   userLego = new UserLego({
//     user: _id,
//     legoId: `${number}-${numberVariant}`,
//     inCollection: true,
//     availabilityStatus,
//     condition,
//   });
//   console.log(userLego);
// } else {
//   userLego.inCollection = true;
//   userLego.availabilityStatus = availabilityStatus;
//   userLego.condition = condition;
// }
//     await userLego.save();
//     res.status(201).json({ message: 'Lego set added' });
//   } catch (err) {
//     res.status(500).json({ error: `ERROR: ${err}` });
//   }
// }

async function index(req, res) {
  const foundSets = await Lego.find({}).sort('-createdAt');
}

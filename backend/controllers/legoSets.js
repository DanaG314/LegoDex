const LegoSet = require('../models/userSets');
const {
  obtainHashKey,
  getSets,
  getSet,
} = require('../services/legoApiService.js');

module.exports = {
  index,
  show,
  search,
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

async function search(req, res) {
  const query = req.body.query; // gets query property from the body of incoming request

  try {
    // getting userHash
    const { hash } = await obtainHashKey();
    // calling getSets passing userHash and query string from the request
    const resp = await getSets(hash, query);

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

const BASE_URL = process.env.BASE_URL;
const KEY = process.env.KEY;
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

// used to login to lego api - returns hashkey
const obtainHashKey = async () => {
  const res = await fetch(
    // makes HTTP request to this url and returns a promise
    `${BASE_URL}/login?apiKey=${KEY}&username=${USERNAME}&password=${PASSWORD}`
  );
  return res.json();
};

const getSet = async (hash, id) => {
  const params = {
    setID: id,
  };
  const encodedParams = encodeURIComponent(JSON.stringify(params));
  const url = `${BASE_URL}/getSets?apiKey=${KEY}&userHash=${hash}&params=${encodedParams}`;
  // do fetch and return response
  const res = await fetch(url);

  return res.json();
};

const getSets = async (hash, search = '') => {
  const params = {
    year: 2025,
    orderBy: 'RatingDESC',
    extendedData: true,
    pageSize: 50,
  };

  if (search != '') {
    params['query'] = search;
  }

  // encodes the params so we get '{ "years": 2025, ... }' "
  const encodedParams = encodeURIComponent(JSON.stringify(params));
  // create url for fetch
  const url = `${BASE_URL}/getSets?apiKey=${KEY}&userHash=${hash}&params=${encodedParams}`;
  // do fetch and return response
  const res = await fetch(url);

  return await res.json();
};

module.exports = {
  obtainHashKey,
  getSets,
  getSet,
};

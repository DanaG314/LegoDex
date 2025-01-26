const BASE_URL = 'https://brickset.com/api/v3.asmx';
const KEY = '3-hpvm-btCu-ijl04';

const USERNAME = 'dana314';
const PASSWORD = 'TZ64v0BlZC';

const obtainHashKey = async () => {
  const res = await fetch(
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

  return await res.json();
};

const getSets = async (hash) => {
  const params = {
    year: 2025,
    orderBy: 'RatingDESC',
    extendedData: true,
  };
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

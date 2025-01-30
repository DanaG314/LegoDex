import sendRequest from './sendRequest';

const BASE_URL = '/api/my-collection';

export async function index() {
  return sendRequest(BASE_URL);
}

export async function show(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

export async function create(set) {
  return sendRequest(`${BASE_URL}/${set.legoId}`, 'POST', set);
}

export async function showUserSet(set) {
  return sendRequest(`${BASE_URL}/${set}`);
}

export async function update(set) {
  return sendRequest(`${BASE_URL}/${set}`, 'PUT', set);
}

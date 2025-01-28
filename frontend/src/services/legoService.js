import sendRequest from './sendRequest';

const BASE_URL = '/api/lego-sets';

export async function index() {
  return sendRequest(BASE_URL);
}

export async function show(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

export async function search(query) {
  return sendRequest(BASE_URL, 'POST', { query: query });
}

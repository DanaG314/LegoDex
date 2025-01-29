import sendRequest from './sendRequest';

const BASE_URL = '/api/my-collection';

export async function index() {
  return sendRequest(BASE_URL);
}

export async function show(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

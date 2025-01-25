import sendRequest from './sendRequest';

const BASE_URL = '/api/lego-sets';

export async function index() {
  return sendRequest(BASE_URL);
}

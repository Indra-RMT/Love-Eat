import CONFIG from './config';

const API_ENDPOINT = {
  RESTAURANT_LIST: `${CONFIG.BASE_URL}list/`,
  RESTAURANT_DETAIL: (id) => `${CONFIG.BASE_URL}detail/${id}`,
  POST_REVIEW_RESTAURANT: `${CONFIG.BASE_URL}/review`,
};

export default API_ENDPOINT;

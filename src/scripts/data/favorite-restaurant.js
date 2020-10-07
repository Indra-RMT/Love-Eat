/* eslint-disable consistent-return */
import openIdb from './open-idb';

import CONFIG from '../globals/config';

const { OBJECT_STORE_NAME } = CONFIG;

const FavoriteRestaurant = {
  async getRestaurant(id) {
    if (!id) {
      return;
    }

    return (await openIdb).get(OBJECT_STORE_NAME, id);
  },
  async getAllRestaurant() {
    return (await openIdb).getAll(OBJECT_STORE_NAME);
  },
  async putRestaurant(restaurant) {
    // eslint-disable-next-line no-prototype-builtins
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }

    return (await openIdb).put(OBJECT_STORE_NAME, restaurant);
  },
  async deleteRestaurant(id) {
    return (await openIdb).delete(OBJECT_STORE_NAME, id);
  },
};

export default FavoriteRestaurant;

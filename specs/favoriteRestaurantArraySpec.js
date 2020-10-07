/* eslint-disable no-undef */
/* eslint-disable no-prototype-builtins */
import { itActsAsFavoriteRestaurantModel } from './contract/favoriteRestaurantContract';

let favoriteRestaurant = [];

const FavoriteRestaurantArray = {

  getRestaurant(id) {
    if (!id) {
      return;
    }

    // eslint-disable-next-line eqeqeq
    // eslint-disable-next-line consistent-return
    return favoriteRestaurant.find((restaurant) => restaurant.id === id);
  },

  getAllRestaurant() {
    return favoriteRestaurant;
  },

  putRestaurant(restaurant) {
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }

    // pastikan id ini belum ada dalam daftar favoriteRestaurants
    if (this.getRestaurant(restaurant.id)) {
      return;
    }

    favoriteRestaurant.push(restaurant);
  },

  deleteRestaurant(id) {
    // cara boros menghapus film dengan meng-copy film yang ada
    // kecuali film dengan id == id
    favoriteRestaurant = favoriteRestaurant.filter((restaurant) => restaurant.id !== id);
  },
};

describe('Favorite Restaurant Movie Array Contract Test Implementation', () => {
  // eslint-disable-next-line no-return-assign
  afterEach(() => favoriteRestaurant = []);

  itActsAsFavoriteRestaurantModel(FavoriteRestaurantArray);
});

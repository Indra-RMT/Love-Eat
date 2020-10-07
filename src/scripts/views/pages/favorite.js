/* eslint-disable no-param-reassign */
import FavoriteRestaurant from '../../data/favorite-restaurant';
import { createPageHeader, createRestaurantItemTemplate, createNoneRestaurantFavorite } from '../templates/template-creator';

const Favorite = {
  async render({ pageHeader, content }) {
    const htmlContent = `
      <section class="content">
        <div class="explore">
          <div id="restaurants" class="restaurants">

          </div>
        </div>
      </div>
    `;

    pageHeader.innerHTML = createPageHeader('My Favorite');
    content.innerHTML = htmlContent;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurant.getAllRestaurant();
    const myFavoriteContainer = document.querySelector('#restaurants');
    const exploreContainer = document.querySelector('.explore');

    if (restaurants.length > 0) {
      restaurants.forEach((restaurant) => {
        myFavoriteContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });
    } else {
      exploreContainer.innerHTML = createNoneRestaurantFavorite();
    }
  },
};

export default Favorite;

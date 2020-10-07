/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */

import {
  createLikeRestaurantButtonTemplate, createUnlikeRestaurantButtonTemplate,
  createLikeButtonWideTemplate, createLikedButtonWideTemplate,
} from '../../views/templates/template-creator';

const LikeButtonPresenter = {
  async init({
    likeButtonContainer,
    likeButtonWideContainer,
    favoriteRestaurant,
    restaurant,
  }) {
    this._likeButtonContainer = likeButtonContainer;
    this._likeButtonWideContainer = likeButtonWideContainer;
    this._restaurant = restaurant;
    this._favoriteRestaurant = favoriteRestaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    if (await this._isRestaurantExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await this._favoriteRestaurant.getRestaurant(id);
    return !!restaurant;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeRestaurantButtonTemplate();
    this._likeButtonWideContainer.innerHTML = createLikeButtonWideTemplate();

    const likeButton = document.querySelector('#likeButton');
    const likeWideButton = document.querySelector('#likeButtonWide');
    likeButton.addEventListener('click', async () => {
      await this._favoriteRestaurant.putRestaurant(this._restaurant);
      this._renderButton();
    });
    likeWideButton.addEventListener('click', async () => {
      await this._favoriteRestaurant.putRestaurant(this._restaurant);
      this._renderButton();
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createUnlikeRestaurantButtonTemplate();
    this._likeButtonWideContainer.innerHTML = createLikedButtonWideTemplate();

    const likeButton = document.querySelector('#likeButton');
    const likeWideButton = document.querySelector('#likeButtonWide');
    likeButton.addEventListener('click', async () => {
      await this._favoriteRestaurant.deleteRestaurant(this._restaurant.id);
      this._renderButton();
    });
    likeWideButton.addEventListener('click', async () => {
      await this._favoriteRestaurant.deleteRestaurant(this._restaurant.id);
      this._renderButton();
    });
  },
};

export default LikeButtonPresenter;

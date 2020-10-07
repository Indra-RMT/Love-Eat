/* eslint-disable import/prefer-default-export */
import LikeButtonPresenter from '../../src/scripts/utils/presenter/like-button-presenter';
import FavoriteRestaurant from '../../src/scripts/data/favorite-restaurant';

const createLikeButtonPresenterWithRestaurant = async (restaurant) => {
  await LikeButtonPresenter.init({
    likeButtonContainer: document.querySelector('#likeButtonWide'),
    likeButtonWideContainer: document.querySelector('#likeButtonContainer'),
    favoriteRestaurant: FavoriteRestaurant,
    restaurant,
  });
};

export { createLikeButtonPresenterWithRestaurant };

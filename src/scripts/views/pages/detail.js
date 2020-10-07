/* eslint-disable no-param-reassign */
import UrlParser from '../../routes/url-parser';
import RestaurantDbSource from '../../data/restaurantdb-source';
import { createPageHeader, createRestaurantDetailTemplate, createErrorNotification } from '../templates/template-creator';
import LikeButtonPresenter from '../../utils/presenter/like-button-presenter';
import WriteReviewInitiator from '../../utils/initiator/write-review-initiator';
import DetailRestaurantInitiator from '../../utils/initiator/detail-restaurant-initiator';
import favoriteRestaurant from '../../data/favorite-restaurant';

const Detail = {
  async render({ pageHeader, content }) {
    // eslint-disable-next-line no-restricted-globals
    scroll(0, 0);
    const htmlContent = `
      <section class="content">
        <div id="restaurant-detail" class="restaurant-detail">
          <div class="left-column">
            <article>
              <div class="restaurant-detail">
                <h2 tabindex="0" class="skeleton"></h2>
                <div class="thumbnail skeleton">
                  <div id="loader" class="loading-spinner skeleton-detail">
                    <div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                  </div>
                </div>
                <div class="info">
                  <div class="info-left">
                    <table>
                      <tbody>
                        <tr tabindex="0" class="skeleton">
                          <td></td>
                          <td></td>
                          <td class="rating-stars">
                            <span>
                              
                            </span>
                          </td>
                        </tr>
                        <tr tabindex="0" class="skeleton">
                          <td></td>
                          <td></td>
                          <td>
                            <p></p>
                          </td>
                        </tr>
                        <tr tabindex="0" class="skeleton">
                          <td></td>
                          <td></td>
                          <td>
                            <p></p>
                          </td>
                        </tr>
                      </tbody>  
                    </table>
                  </div>
                  <div class="info-right">
                    <div id="likeButtonWideContainer">
                      
                    </div>
                  </div>
                </div>
                <div class="desc">
                  <div class="label skeleton" tabindex="0">
                    
                  </div>
                  <p class="desc-item skeleton" tabindex="0"> </p>
                </div>
              </div>
            </article>
            <div class="restaurant-menu-mobile">
            </div>
            <div class="restaurant-review">
              <h3 tabindex="0">Review</h3>
              <div id="all-review">

              </div>
              <div class="write-review">
                <div class="label-review" tabindex="0"><h4>Write My Review</h4></div>
                <div class="form-group">
                  <div class="form-label">Name</div>
                  <input id="my-name" class="form-input" type="text" autocomplete="off">
                  <label class="labelAccessibility" for="my-name">Input Your Name</label>
                  <label id="my-name-label" class="form__error"></label>
                </div>
                <div class="form-group">
                  <div class="form-label">Review</div>
                  <textarea id="my-review" class="form-input" rows="3" placeholder=". . ."></textarea>
                  <label class="labelAccessibility" for="my-review">Input Your Review for </label>
                  <label id="my-review-label" class="form__error"></label>
                </div>
                <button id="send-review" class="send" aria-label="send review to ">send</button>
              </div>
            </div>
          </div>
          <aside class="right-column">
            <div class="restaurant-menu">
              <h3 class="menu-header skeleton" tabindex="0"></h3>
              <div class="food-and-drink">
                <div class="food- skeleton">
                  <div class="menu-label skeleton" tabindex="0"></div>
                  
                </div>
                <div class="drink-container skeleton">
                  <div class="menu-label skeleton" tabindex="0"></div>
                  
                </div>
              </div>
            </div>
            <div class="restaurant-book skeleton">
              <div aria-label="book this restaurant" id="bookRestaurantButton">
              </div>
            </div>
          </aside>
        </div>
        <div id="likeButtonContainer"></div>
      </section>

      <aside class="right-column">      
    `;

    pageHeader.innerHTML = createPageHeader('Restaurant Detail');
    content.innerHTML = htmlContent;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    let response = null;
    let restaurant = null;
    const restaurantContainer = document.querySelector('#restaurant-detail');

    try {
      response = await RestaurantDbSource.detailRestaurant(url.id);
      restaurant = response.restaurant;
    } catch (err) {
      restaurantContainer.innerHTML = createErrorNotification();
      return;
    }

    if (restaurant === null) {
      restaurantContainer.innerHTML = createErrorNotification();
      return;
    }

    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      likeButtonWideContainer: document.querySelector('#likeButtonWideContainer'),
      favoriteRestaurant,
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        rating: restaurant.rating,
        city: restaurant.city,
        description: restaurant.description,
        pictureId: restaurant.pictureId,
      },
    });

    WriteReviewInitiator.init({
      sendButton: document.querySelector('#send-review'),
      allReview: document.querySelector('#all-review'),
      review: {
        restaurantId: restaurant.id,
        name: document.querySelector('#my-name'),
        text: document.querySelector('#my-review'),
      },
      errorLabel: {
        name: document.querySelector('#my-name-label'),
        text: document.querySelector('#my-review-label'),
      },
    });

    DetailRestaurantInitiator.init({
      body: document.querySelector('body'),
      asideElement: document.querySelector('aside.right-column'),
      menuMobileElement: document.querySelector('.restaurant-menu-mobile'),
      bookButton: document.querySelector('#bookRestaurantButton'),
      restaurantName: restaurant.name,
    });
  },
};

export default Detail;

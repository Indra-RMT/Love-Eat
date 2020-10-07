/* eslint-disable no-param-reassign */
import UrlParser from '../../routes/url-parser';
import RestaurantDbSource from '../../data/restaurantdb-source';
import { createRestaurantItemTemplate, createErrorNotification, createFullRestaurantItemSkeleton } from '../templates/template-creator';
import restaurantBookInitiator from '../../utils/initiator/restaurant-book-initiator';
import ExploreButtonInitiator from '../../utils/initiator/button-explore-initiator';

const Home = {
  async render({ pageHeader, content }) {
    const htmlPageHeader = `
      <div id="hero" class="hero">
        <div class="image">
        </div>
        <div class="inner">
          <h1 class="title">Discover a restaurant with the best food & drink that you like</h1>
          <br />
          <p class="tagline">Everything you like is around you, let's eat</p>
          <a href="/#/home" id="button-explore" class="button">Explore</a>
        </div>
      </div>
    `;

    const htmlContent = `
      <section class="content">
        <div class="explore">
          <h2 tabindex="0" class="label to-content">Explore</h2>
          <div id="restaurants" class="restaurants">
            ${createFullRestaurantItemSkeleton()}
          </div>
        </div>
        <div class="book">
          <h2 tabindex="0" class="label">Book a Table</h2>
          <div class="content">
              <div class="divider">
                  <div class="divider-left">
                      <div class="form-group restaurant">
                          <div class="form-label">Restaurant</div>
                          <input id="book-restaurant-name" class="form-input" type="text" autocomplete="off">
                          <label class="labelAccessibility" for="book-restaurant-name">Input Restaurant Name</label>
                          <label id="restaurant-label" class="form__error"></label>
                      </div>
                  </div>
                  <div class="divider-right additional">
                  </div>
              </div>
              <hr class="sparator" />
              <div class="divider">
                  <div class="divider-left">
                      <div class="form-group">
                          <div class="form-label">Date</div>
                          <input id="book-date" class="form-input" type="date" date-format="DD MMMM YYYY">
                          <label class="labelAccessibility" for="book-date">Input Book Date</label>
                          <label id="date-label" class="form__error"></label>
                      </div>
                      <div class="form-group">
                          <div tabindex="0" id="inputGuest" class="form-label">Guest</div>
                          <label class="labelAccessibility" for="inputGuest">Select Number of Guest Below</label>
                          <div id="form-guest" class="radio">
                              <input type="radio" id="2" name="guest" value="2">
                              <label for="2" tabindex="0">2</label>
                              <input type="radio" id="3" name="guest" value="3">
                              <label for="3" tabindex="0">3</label>
                              <input type="radio" id="4" name="guest" value="4">
                              <label for="4" tabindex="0">4</label>
                              <input type="radio" id="5" name="guest" value="5">
                              <label for="5" tabindex="0">5</label>
                              <input type="radio" id="6" name="guest" value="6">
                              <label for="6" tabindex="0">6</label>
                              <input type="radio" id="7" name="guest" value="> 6">
                              <label for="7" tabindex="0">> 6</label>
                          </div>
                          <label id="guest-label" class="form__error"></label>
                      </div>
                      <div class="form-group">
                          <div tabindex="0" id="inputSession" class="form-label">Session</div>
                          <label class="labelAccessibility" for="inputSession">Select Session Below</label>
                          <div id="form-session" class="radio">
                              <input type="radio" id="breakfast" name="session" value="breakfast">
                              <label for="breakfast" tabindex="0">Breakfast</label>
                              <input type="radio" id="lunch" name="session" value="lunch">
                              <label for="lunch" tabindex="0">Lunch</label>
                              <input type="radio" id="dinner" name="session" value="dinner">
                              <label for="dinner" tabindex="0">Dinner</label>
                          </div>
                          <label id="session-label" class="form__error"></label>
                      </div>
                  </div>
                  <div class="divider-right">
                      <hr class="sparator bottom" />
                      <div class="form-group">
                          <div class="form-label">Name</div>
                          <input id="book-name" class="form-input" type="text" autocomplete="off">
                          <label class="labelAccessibility" for="book-name">Input Your Name</label>
                          <label id="name-label" class="form__error"></label>
                      </div>
                      <div class="form-group">
                          <div class="form-label">Phone</div>
                          <input id="book-phone" class="form-input" type="text" autocomplete="off" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\\..*)\\./g, '$1');" maxlength="14">
                          <label class="labelAccessibility" for="book-phone">Input Your Phone Number</label>
                          <label id="phone-label" class="form__error"></label>
                      </div>
                      <div class="form-group">
                          <div class="form-label">Additional Request</div>
                          <textarea id="book-additional" class="form-input" rows="3"></textarea>
                          <label class="labelAccessibility" for="book-additional">Input Book Additional or Your Request If Available</label>
                      </div>
                  </div>
              </div>
              <div class="form-group">
                  <button id="book-button" class="submit" aria-label="make book now">Book</button>
              </div>
          </div>
        </div>
        <div id="book-modal" class="book-modal">
          <div class="container">
            <div class="header">
              <div id="book-detail" tabindex="0" class="text">
                Book Has Submitted
              </div>
              <button id="book-modal-close" class="close" aria-label="close restaurant book notification">&times;</button>
            </div>
            <article class="content" tabindex="0">
              Your book is successful, then you will be contacted by the restaurant for confirmation, thank you.
            </article>
          </div>
        </div>
      </section>
    `;

    pageHeader.innerHTML = htmlPageHeader;
    content.innerHTML = htmlContent;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    let response = null;
    let restaurants = null; //
    const restaurantsContainer = document.querySelector('#restaurants');

    try {
      response = await RestaurantDbSource.exploreRestaurant();
      restaurants = response.restaurants;
    } catch (err) {
      restaurantsContainer.innerHTML = createErrorNotification();
      return;
    }

    if (restaurants === null) {
      restaurantsContainer.innerHTML = createErrorNotification();
      return;
    }

    restaurantsContainer.innerHTML = '';
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });

    const goToBookTableSection = (restaurantName) => {
      const yOffset = -90;
      const bookElement = document.querySelector('.book');
      const formRestaurantName = document.querySelector('#book-restaurant-name');
      const y = bookElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      formRestaurantName.value = restaurantName.replace(/-/g, ' ');
    };

    if (url.id) {
      goToBookTableSection(url.id);
    }

    ExploreButtonInitiator.init({
      exploreButton: document.querySelector('#button-explore'),
    });

    restaurantBookInitiator.init({
      body: document.querySelector('body'),
      bookButton: document.querySelector('#book-button'),
      bookModal: document.querySelector('#book-modal'),
      closeModalButton: document.querySelector('#book-modal-close'),
      book: {
        restaurant: document.querySelector('#book-restaurant-name'),
        date: document.querySelector('#book-date'),
        guest: document.querySelector('#form-guest'),
        session: document.querySelector('#form-session'),
        name: document.querySelector('#book-name'),
        phone: document.querySelector('#book-phone'),
        request: document.querySelector('#book-additional'),
      },
      errorLabel: {
        restaurant: document.querySelector('#restaurant-label'),
        date: document.querySelector('#date-label'),
        guest: document.querySelector('#guest-label'),
        session: document.querySelector('#session-label'),
        name: document.querySelector('#name-label'),
        phone: document.querySelector('#phone-label'),
      },
      restaurantData: restaurants,
    });
  },
};

export default Home;

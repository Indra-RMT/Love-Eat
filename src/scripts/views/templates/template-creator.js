/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
import CONFIG from '../../globals/config';
import {
  createSolidStarIcon, createRegularStarIcon,
  createHalfStarHalfIcon, createSolidHeartIcon,
  createRegularHeartIcon, createRegularBookmarkIcon,
} from './icon-creator';

const _tokenizeNumberRating = (numberRating) => {
  const firstDigitNumber = Number(numberRating.toString()[0]);
  const secondDigitNumber = Number(numberRating.toString()[2]);
  let amountEmptyStar = 5 - firstDigitNumber - 1;

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(secondDigitNumber)) {
    amountEmptyStar = 5 - firstDigitNumber;
  }

  return { firstDigitNumber, secondDigitNumber, amountEmptyStar };
};

const _makeStarIcon = (numberRatingTokenized) => {
  const { firstDigitNumber, secondDigitNumber, amountEmptyStar } = numberRatingTokenized;

  const iconHeight = '1.05em';
  let starIcon = '';
  for (let i = 0; i < firstDigitNumber; i++) {
    starIcon += createSolidStarIcon(iconHeight);
  }
  if (secondDigitNumber >= 9) {
    starIcon += createSolidStarIcon(iconHeight);
  }
  if (secondDigitNumber >= 3 && secondDigitNumber <= 8) {
    starIcon += createHalfStarHalfIcon(iconHeight);
  }
  if (secondDigitNumber < 3) {
    starIcon += createRegularStarIcon(iconHeight);
  }
  for (let i = 0; i < amountEmptyStar; i++) {
    starIcon += createRegularStarIcon(iconHeight);
  }

  return starIcon;
};

const createNumberRatingToStar = (numberRating) => {
  const numberRatingTokenized = _tokenizeNumberRating(numberRating);
  return _makeStarIcon(numberRatingTokenized);
};

const createCategoryListFromCategories = (categories) => {
  const categoryList = categories.map((category) => category.name);
  return categoryList.join(', ');
};

const createMenuListFromMenus = (menus, className) => {
  const menuList = menus.map((menu) => `<div class="${className}" tabindex="0">${menu.name}</div>`);
  return menuList.join('');
};

const createReviewFromReview = (reviews) => {
  const reviewList = reviews.map((review) => `
    <div class="review-container">
      <div class="name-date" tabindex="0">
        <p class="name">${review.name}</p>
        <p class="date">${review.date}</p>
      </div>
      <div class="review" tabindex="0">
        <p>${review.review}</p>
      </div>
    </div>
  `);

  return reviewList.join('');
};

const createRestaurantItemTemplate = (restaurant) => `

  <article class="item">
    <div class="thumbnail-container">
        <div class="place">
          <p>${restaurant.city}</p>
        </div>
        <img class="lazyload" width="100%" src="./placeholder-restaurant-300x300.png" crossorigin='anonymous' class="thumbnail" data-src="${restaurant.pictureId ? CONFIG.BASE_IMAGE_URL_SMALL_RES + restaurant.pictureId : CONFIG.PLACEHOLDER_IMAGE_URL}"
          alt="${restaurant.name}">
    </div>
    <div class="content">
        <h3 class="title restaurant">
          <a id="${restaurant.id}" href="${`/#/detail/${restaurant.id}`}">${restaurant.name}</a>
        </h3>
        <div class="rating">
            <span class="rating-number">
              ${restaurant.rating}
            </span>
            <span class="rating-stars">
              ${createNumberRatingToStar(restaurant.rating)}
            </span>
        </div>
        <p class="description">
          ${restaurant.description}
        </p>
    </div>
  </article>
`;

const createRestaurantDetailTemplate = (restaurant) => {
  const baseSmallImageUrl = CONFIG.BASE_IMAGE_URL_SMALL_RES + restaurant.pictureId;
  const baseMediumImageUrl = CONFIG.BASE_IMAGE_URL_MEDIUM_RES + restaurant.pictureId;

  const smallImageUrl = restaurant.pictureId ? baseSmallImageUrl : CONFIG.PLACEHOLDER_IMAGE_URL;
  const mediumImageUrl = restaurant.pictureId ? baseMediumImageUrl : CONFIG.PLACEHOLDER_IMAGE_URL;

  return `
    <div class="left-column">
      <article>
        <div class="restaurant-detail">
          <h2 tabindex="0">${restaurant.name}</h2>

          <img
            width="100%"
            src="./placeholder-restaurant-300x300.png"
            data-srcset="${smallImageUrl} 480w, ${mediumImageUrl} 800w"
            sizes="(max-width: 600px) 480px, 800px"
            data-src="${smallImageUrl}"
            alt="${restaurant.name}"
            class="thumbnail lazyload">

          <div class="info">
            <div class="info-left">
              <table>
                <tbody>
                  <tr tabindex="0">
                    <td>Rating</td>
                    <td> : </td>
                    <td class="rating-stars">${restaurant.rating}
                      <span>
                        ${createNumberRatingToStar(restaurant.rating)}
                      </span>
                    </td>
                  </tr>
                  <tr tabindex="0">
                    <td>Categories</td>
                    <td> : </td>
                    <td>
                      <p>${createCategoryListFromCategories(restaurant.categories)}</p>
                    </td>
                  </tr>
                  <tr tabindex="0">
                    <td>Address</td>
                    <td> : </td>
                    <td>
                      <p>${restaurant.address}, ${restaurant.city}</p>
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
            <div class="label" tabindex="0">
              Description
            </div>
            <p class="desc-item" tabindex="0">${restaurant.description}</p>
          </div>
        </div>
      </article>
      <div class="restaurant-menu-mobile">
      </div>
      <div class="restaurant-review">
        <h3 tabindex="0">Review</h3>
        <div id="all-review">
          ${createReviewFromReview(restaurant.consumerReviews)}
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
            <label class="labelAccessibility" for="my-review">Input Your Review for ${restaurant.name}</label>
            <label id="my-review-label" class="form__error"></label>
          </div>
          <button id="send-review" class="send" aria-label="send review to ${restaurant.name}">send</button>
        </div>
      </div>
    </div>

    <aside class="right-column">
      <div class="restaurant-menu">
        <h3 class="menu-header" tabindex="0">Menu List</h3>
        <div class="food-and-drink">
          <div class="food-container">
            <div class="menu-label" tabindex="0">Food</div>
            ${createMenuListFromMenus(restaurant.menus.foods, 'food')}
          </div>
          <div class="drink-container">
            <div class="menu-label" tabindex="0">Drink</div>
            ${createMenuListFromMenus(restaurant.menus.drinks, 'drink')}
          </div>
        </div>
      </div>
      <div class="restaurant-book">
        <button aria-label="book this restaurant" id="bookRestaurantButton">
          Book Restaurant
        </button>
      </div>
    </aside>
  `;
};

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    ${createRegularHeartIcon('1.05em')}
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    ${createSolidHeartIcon('1.05em')}
  </button>
`;

const createLikeButtonWideTemplate = () => `
  <button aria-label="like this restaurant" id="likeButtonWide" class="likeWide">
     Favorite
  </button>
`;

const createLikedButtonWideTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButtonWide" class="likedWide">
    Favorited
  </button>
`;

const createErrorNotification = () => `
  <div id="error-notification">
    <p>Sorry failed to fetching data</p>
    <button onClick="window.location.reload();">refresh page</button>
  </div>
`;

const createLoader = () => `
  <div class="loading-spinner">
    <div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  </div>
`;

const createNoneRestaurantFavorite = () => `
  <div id="none-favorite">
    <p class="none-favorite-head" tabindex="0">No favorite yet</p>
    <p class="none-favorite-body" tabindex="0">
      When you find a restaurant you like, click Favorite ${createSolidHeartIcon('.85em')}  to keep it here.
    </p>
    <a href="/#/home" tabindex="0">
      explore restaurant
    </a>
  </div>
`;

const createNoneRestaurantBook = () => `
  <div id="none-favorite">
    <p class="none-favorite-head" tabindex="0">You have not made any book yet</p>
    <p class="none-favorite-body">
      ${createRegularBookmarkIcon('1.05em')}
    </p>
    <a href="/#/home" tabindex="0">
      explore restaurant
    </a>
  </div>
`;

const createBookItemTemplate = (book) => `
  <div class="book-item">
    <div class="header">
      <p tabindex="0">${book.restaurant}</p>
      <p tabindex="0">${book.date}</p>
    </div>
    <div class="book-content">
      <div class="content-left">
        <table>
          <tbody>
            <tr tabindex="0">
              <td>Name</td>
              <td>:</td>
              <td>${book.name}</td>
            </tr>
            <tr tabindex="0">
              <td>Phone</td>
              <td>:</td>
              <td>${book.phone}</td>
            </tr>
            <tr tabindex="0">
              <td>Request</td>
              <td>:</td>
              <td>${book.request}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="content-right">
        <p tabindex="0">${book.session}</p>
        <p tabindex="0"><i class="far fa-user"></i> ${book.guest}</p>
       </div>
    </div>
  </div>
`;

const createRestaurantItemSkeleton = () => `
    <article class="item">
        <div class="thumbnail-container skeleton">
            <div class="place skeleton">
              <p></p>
            </div>
            <div id="loader" class="loading-spinner skeleton">
              <div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        </div>
        <div class="content">
            <h3 class="title skeleton">
              <a id="" href=""></a>
            </h3>
            <div class="rating skeleton">
                <span class="rating-number">
                  
                </span>
                <span class="rating-stars">
                </span>
            </div>
            <p class="description skeleton">
            </p>
        </div>
    </article>
  `;

const createFullRestaurantItemSkeleton = () => {
  let fullSkeleton = '';

  for (let i = 0; i < 20; i++) {
    fullSkeleton += createRestaurantItemSkeleton();
  }

  return fullSkeleton;
};

const createPageHeader = (title) => `
  <div class="sub-hero">
    <div class="sub-image">
    </div>
    <div class="inner">
      <h1 class="title to-content" tabindex="0">${title}</h1>
    </div>
  </div>
`;

export {
  createNumberRatingToStar,
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
  createLikeButtonWideTemplate,
  createLikedButtonWideTemplate,
  createLoader,
  createReviewFromReview,
  createErrorNotification,
  createNoneRestaurantFavorite,
  createBookItemTemplate,
  createNoneRestaurantBook,
  createPageHeader,
  createFullRestaurantItemSkeleton,
};

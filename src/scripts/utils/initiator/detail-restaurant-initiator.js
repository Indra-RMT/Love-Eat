/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */

const DetailRestaurantInitiator = {
  init({
    body, asideElement, menuMobileElement, bookButton, restaurantName,
  }) {
    this._bookButton = bookButton;

    body.onresize = () => {
      this._adjustAsideElement(asideElement, menuMobileElement);
    };

    this._bookButton.addEventListener('click', () => {
      this._toBookRestaurantSection(restaurantName);
    });

    this._adjustAsideElement(asideElement, menuMobileElement);
  },

  _adjustAsideElement(asideElement, menuMobileElement) {
    if (this._isWidthMobile()) {
      this._changeElementToMobile(asideElement, menuMobileElement);
    } else {
      this._changeElementToWide(asideElement, menuMobileElement);
    }
  },

  _changeElementToMobile(asideElement, menuMobileElement) {
    if (menuMobileElement.innerHTML.length < 10) {
      const childAsideNodeList = asideElement.innerHTML;
      menuMobileElement.innerHTML = childAsideNodeList;
      asideElement.innerHTML = '';
    }
  },

  _changeElementToWide(asideElement, menuMobileElement) {
    if (asideElement.innerHTML.length < 10) {
      const childMenuMobileElement = menuMobileElement.innerHTML;
      asideElement.innerHTML = childMenuMobileElement;
      menuMobileElement.innerHTML = '';
    }
  },

  _isWidthMobile() {
    return window.screen.width < 700;
  },

  _toBookRestaurantSection(restaurantName) {
    const restaurantNameUrl = this._changeSpaceToDash(restaurantName);

    document.location.href = `/#/home/${restaurantNameUrl}`;
  },

  _changeSpaceToDash(string) {
    return string.replace(/ /g, '-');
  },
};

export default DetailRestaurantInitiator;

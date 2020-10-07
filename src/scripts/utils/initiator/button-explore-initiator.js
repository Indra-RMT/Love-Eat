/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */

const ExploreButtonInitiator = {
  init({
    exploreButton,
  }) {
    exploreButton.addEventListener('click', () => {
      this._toExploreSection();
    });
  },

  _toExploreSection() {
    const yOffset = -90;
    const element = document.querySelector('.explore');
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
    element.focus();
  },
};

export default ExploreButtonInitiator;

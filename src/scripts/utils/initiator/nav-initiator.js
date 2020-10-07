/* eslint-disable no-underscore-dangle */

const NavInitiator = {
  init({ nav, skipToContent }) {
    window.onscroll = (event) => this._scrollNavHandler(event, nav);

    window.onpopstate = () => {
      this._changeAppTitle();
      this._changeNavActive(nav);
      this._changeAtributeHrefToCurrentPage(skipToContent);
    };

    window.onload = () => {
      this._changeAppTitle();
      this._changeNavActive(nav);
      this._changeAtributeHrefToCurrentPage(skipToContent);
    };

    skipToContent.addEventListener('click', () => {
      this._clickSkipToContentHandler(skipToContent);
    });
  },

  _scrollTopGreaterThanOne(docBody, docElement) {
    return docBody.scrollTop > 1 || docElement.scrollTop > 1;
  },

  _addNavShow(event, nav) {
    event.stopPropagation();
    nav.classList.add('show');
  },

  _removeNavShow(event, nav) {
    event.stopPropagation();
    nav.classList.remove('show');
  },

  _scrollNavHandler(event, nav) {
    event.stopPropagation();
    const docBody = document.body;
    const docElement = document.documentElement;

    if (this._scrollTopGreaterThanOne(docBody, docElement)) {
      this._addNavShow(event, nav);
    } else {
      this._removeNavShow(event, nav);
    }
  },

  _capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },

  _checkPreTittleIsAvailable(currentPage) {
    return currentPage.length > 0 && currentPage !== 'Home';
  },

  _changeAppTitle() {
    const title = document.querySelector('title');
    const currentPage = this._capitalizeFirstLetter(this._getCurrentPage());

    let preTitleText = '';

    if (this._checkPreTittleIsAvailable(currentPage)) {
      preTitleText = `${currentPage} –`;
    }

    title.innerHTML = `${preTitleText} LoveEat`;
  },

  _changeNavActive(nav) {
    const currentPage = this._getCurrentPage();
    const navList = nav.querySelectorAll('ul li');

    navList.forEach((list) => {
      if (this._isPageMatch(list.innerText, currentPage)) {
        list.classList.add('active');
      } else if (this._isHomePage(list.innerText, currentPage)) {
        list.classList.add('active');
      } else {
        list.classList.remove('active');
      }
    });
  },

  _getCurrentPage() {
    // get second hash url eg. home, favorite, book
    return window.location.hash.slice(2).split('/')[0];
  },

  _isHomePage(currentNav, currentPage) {
    return currentPage.length === 0 && currentNav === 'Home';
  },

  _isPageMatch(currentNav, currentPage) {
    return currentNav.toLowerCase() === currentPage.toLowerCase() && currentNav.length > 1;
  },

  _changeAtributeHrefToCurrentPage(element) {
    const currentUrl = window.location.hash;

    element.setAttribute('href', currentUrl);

    if (currentUrl.length === 0) {
      element.setAttribute('href', '#');
    }
  },

  _clickSkipToContentHandler() {
    const yOffset = 0;
    const element = document.querySelector('.to-content');
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
    element.focus();
  },
};

export default NavInitiator;

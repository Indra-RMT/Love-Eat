/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */

const DrawerInitiator = {
  init({
    button, drawer, drawerLogo, body,
  }) {
    button.addEventListener('click', (event) => {
      this._toggleDrawer({ event, drawer, body });
    });

    window.addEventListener('click', (event) => {
      this._closeDrawer({ event, drawer, body });
    });

    window.onload = (event) => {
      this._drawerLogoHandler(event, drawerLogo);
    };

    window.addEventListener('resize', (event) => {
      this._drawerLogoHandler(event, drawerLogo);
    });
  },

  _toggleDrawer({ event, drawer, body }) {
    event.stopPropagation();
    drawer.classList.toggle('open');
    body.classList.toggle('stop-scrolling');
  },

  _closeDrawer({ event, drawer, body }) {
    if (event.target !== drawer) {
      event.stopPropagation();
      drawer.classList.remove('open');
      body.classList.remove('stop-scrolling');
    }
  },

  _setDrawerLogo(event, drawerLogo) {
    event.stopPropagation();
    const htmlAnchor = '<a href="/#/home" class="logo">LoveEat</a>';
    drawerLogo.innerHTML = htmlAnchor;
  },

  _unsetDrawerLogo(event, drawerLogo) {
    event.stopPropagation();
    drawerLogo.innerHTML = '';
  },

  _drawerLogoHandler(event, drawerLogo) {
    if (window.screen.width < 600) {
      this._setDrawerLogo(event, drawerLogo);
    } else {
      this._unsetDrawerLogo(event, drawerLogo);
    }
  },
};

export default DrawerInitiator;

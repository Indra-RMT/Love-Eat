/* eslint-disable no-unused-vars */

import 'regenerator-runtime';
import '../styles/style.scss';
import '../styles/responsive.scss';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import App from './views/app';
import swRegister from './utils/sw-register';

const app = new App({
  nav: document.querySelector('nav'),
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#drawer'),
  drawerLogo: document.querySelector('.drawer-logo'),
  content: document.querySelector('#mainContent'),
  body: document.querySelector('body'),
  pageHeader: document.querySelector('#pageHeader'),
  skipToContent: document.querySelector('.skip-link'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});

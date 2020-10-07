/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

import DrawerInitiator from '../utils/initiator/drawer-initiator';
import NavInitiator from '../utils/initiator/nav-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({
    button, drawer, content, drawerLogo, nav, body, pageHeader, skipToContent,
  }) {
    this._nav = nav;
    this._button = button;
    this._drawer = drawer;
    this._drawerLogo = drawerLogo;
    this._content = content;
    this._body = body;
    this._pageHeader = pageHeader;
    this._skipToContent = skipToContent;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      drawerLogo: this._drawerLogo,
      body: this._body,
    });

    NavInitiator.init({
      nav: this._nav,
      skipToContent: this._skipToContent,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];

    await page.render({
      pageHeader: this._pageHeader,
      content: this._content,
    });

    await page.afterRender();
  }
}

export default App;

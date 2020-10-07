import Home from '../views/pages/home';
import Detail from '../views/pages/detail';
import Favorite from '../views/pages/favorite';
import Book from '../views/pages/book';

const routes = {
  '/': Home, // default page
  '/home': Home,
  '/home/:id': Home,
  '/detail/:id': Detail,
  '/favorite': Favorite,
  '/book': Book,
};

export default routes;

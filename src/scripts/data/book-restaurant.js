import openIdb from './open-idb';

import CONFIG from '../globals/config';

const { OBJECT_STORE_BOOK_NAME } = CONFIG;

const BookRestaurant = {
  async getBook(id) {
    return (await openIdb).get(OBJECT_STORE_BOOK_NAME, id);
  },
  async getAllBook() {
    return (await openIdb).getAll(OBJECT_STORE_BOOK_NAME);
  },
  async putBook(book) {
    return (await openIdb).put(OBJECT_STORE_BOOK_NAME, book);
  },
  async deleteBook(id) {
    return (await openIdb).delete(OBJECT_STORE_BOOK_NAME, id);
  },
};

export default BookRestaurant;

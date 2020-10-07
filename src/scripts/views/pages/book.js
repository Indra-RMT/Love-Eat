/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import BookRestaurant from '../../data/book-restaurant';
import { createPageHeader, createBookItemTemplate, createNoneRestaurantBook } from '../templates/template-creator';

const Book = {
  async render({ pageHeader, content }) {
    const htmlContent = `
      <section class="content">
        <div class="explore">
          <div id="book">

          </div>
        </div>
      </div>
    `;

    pageHeader.innerHTML = createPageHeader('My Book');
    content.innerHTML = htmlContent;
  },

  async afterRender() {
    const books = await BookRestaurant.getAllBook();

    const myBookContainer = document.querySelector('#book');
    const exploreContainer = document.querySelector('.explore');

    if (books.length > 0) {
      books.forEach((book) => {
        myBookContainer.innerHTML += createBookItemTemplate(book);
      });
    } else {
      exploreContainer.innerHTML = createNoneRestaurantBook();
    }
  },
};

export default Book;

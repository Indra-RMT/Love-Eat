/* eslint-disable no-undef */
Feature('Booking Table Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/book');
});

Scenario('showing empty booked restaurants', ({ I }) => {
  I.see('My Book', '.title');
  I.see('You have not made any book yet', '.none-favorite-head');
});

Scenario('booking one restaurant', ({ I }) => {
  I.see('explore restaurant');
  I.click('explore restaurant');

  I.see('Book a Table', 'h2');

  I.fillField('#book-restaurant-name', 'Rumah Senja');
  I.fillField('#book-date', '10/28/2020');
  I.click('6', '#form-guest');
  I.click('Lunch', '#form-session');
  I.fillField('#book-name', 'Indra Rahmanto');
  I.fillField('#book-phone', '082299018189');
  I.fillField('#book-additional', 'Tolong sediakan meja yang tetap menerapkan protokol kesehatan, terima kasih');

  I.click('#book-button');

  I.see('Book Has Submitted');
  I.see('Your book is successful, then you will be contacted by the restaurant for confirmation, thank you.');

  I.click('#book-modal-close');

  I.amOnPage('/#/book');
  I.seeElement('.book-item');
  I.see('Rumah Senja');
});

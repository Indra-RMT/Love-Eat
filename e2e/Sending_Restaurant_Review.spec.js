/* eslint-disable no-undef */
Feature('Sending Restaurant Review');

Before(({ I }) => {
  I.amOnPage('/');

  I.seeElement('.title.restaurant a');
  I.click(locate('.title.restaurant a').at(4));
});

Scenario('choose restaurant and sending review', ({ I }) => {
  I.see('Write My Review', 'h4');

  I.fillField('#my-name', 'Indra');
  I.fillField('#my-review', 'Restoran nyaman dan harga cukup terjangkau, rasanya juga lumayan dan ada wifi gratis');

  I.click('send');
});

Scenario('see my review are displayed', ({ I }) => {
  I.see('Review', 'h3');

  I.see('Indra', '.review-container .name');
  I.see('Restoran nyaman dan harga cukup terjangkau, rasanya juga lumayan dan ada wifi gratis', '.review-container .review p');
});

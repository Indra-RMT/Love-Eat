/* eslint-disable no-undef */
Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.see('My Favorite', '.title');
  I.see('No favorite yet', '.none-favorite-head');
});

Scenario('liking one restaurant', ({ I }) => {
  I.see('No favorite yet', '.none-favorite-head');

  I.amOnPage('/');

  I.seeElement('.title.restaurant a');
  I.click(locate('.title.restaurant a').first());

  I.seeElement('#likeButtonWide');
  I.click('#likeButtonWide');

  I.amOnPage('/#/favorite');
  I.seeElement('article.item');
});

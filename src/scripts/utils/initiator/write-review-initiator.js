/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */

import RestaurantDbSource from '../../data/restaurantdb-source';
import { createReviewFromReview } from '../../views/templates/template-creator';
import { createSolidExclamationCircleIcon } from '../../views/templates/icon-creator';

const WriteReviewInitiator = {
  init({
    review, sendButton, allReview, errorLabel,
  }) {
    this._sendButton = sendButton;
    this._review = review;
    this._allReview = allReview;
    this._errorLabel = errorLabel;

    this._sendButton.addEventListener('click', () => {
      this._sendButtonHandler();
    });
  },

  async _sendButtonHandler() {
    const formValue = this._getFormValue();
    if (this._isFormValid(formValue)) {
      const customerReviews = await this._sendReview(formValue);
      this._createAllReview(customerReviews);
      this._deleteFormValue();
    }
  },

  _isFormValid(formReviewValue) {
    const formTargetName = {
      value: formReviewValue.name,
      label: this._errorLabel.name,
      message: 'name',
    };
    const formTargetText = {
      value: formReviewValue.text,
      label: this._errorLabel.text,
      message: 'review',
    };
    const isValid = [];

    isValid.push(this._formValidator(formTargetName));
    isValid.push(this._formValidator(formTargetText));

    return !isValid.includes(false);
  },

  _formValidator(formTarget) {
    let isValid = true;
    if (formTarget.value.length === 0) {
      isValid = this._fillTextLabelError(formTarget.label, formTarget.message);
    } else {
      this._emptyLabelError(formTarget.label);
    }

    return isValid;
  },

  _fillTextLabelError(errorLabel, messageLabel) {
    const alertIcon = createSolidExclamationCircleIcon('1.05em');
    const message = `${alertIcon} please fill ${messageLabel}`;
    const errorLabelElement = errorLabel;
    errorLabelElement.innerHTML = message;

    return false;
  },

  _emptyLabelError(errorLabel) {
    const errorLabelElement = errorLabel;
    errorLabelElement.innerHTML = '';
  },

  _getFormValue() {
    return {
      restaurantId: this._review.restaurantId,
      name: this._review.name.value,
      text: this._review.text.value,
    };
  },

  async _sendReview(review) {
    const response = await RestaurantDbSource.postRestaurantReview(review);
    return response.customerReviews;
  },

  _createAllReview(customerReviews) {
    const reviews = createReviewFromReview(customerReviews);
    this._allReview.innerHTML = reviews;
  },

  _deleteFormValue() {
    this._review.name.value = '';
    this._review.text.value = '';
  },
};

export default WriteReviewInitiator;

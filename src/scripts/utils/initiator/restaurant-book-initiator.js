/* eslint-disable no-underscore-dangle */
import autocomplete from 'autocompleter';
import BookRestaurant from '../../data/book-restaurant';
import { createSolidExclamationCircleIcon } from '../../views/templates/icon-creator';

const registerAutocomplete = (inputElement, searchRestaurant) => {
  const input = inputElement;

  autocomplete({
    input,
    fetch(text, update) {
      const textLower = text.toLowerCase();
      // you can also use AJAX requests instead of preloaded data
      const suggestions = searchRestaurant.filter((n) => {
        const labelLowerCase = n.label.toLowerCase();
        return labelLowerCase.startsWith(textLower);
      });
      update(suggestions);
    },
    onSelect(item) {
      input.value = item.label;
    },
  });
};

const restaurantBookInitiator = {
  init({
    body, bookButton, book, closeModalButton, errorLabel, restaurantData, bookModal,
  }) {
    this._body = body;
    this._bookButton = bookButton;
    this._book = book;
    this._closeModalButton = closeModalButton;
    this._errorLabel = errorLabel;
    this._restaurantData = restaurantData;
    this._bookModal = bookModal;

    this._bookButton.addEventListener('click', (event) => {
      this._bookButtonHandler(event);
    });

    document.onkeydown = (event) => {
      if (event.keyCode === 27) {
        this._closeBookModal(event);
      }
    };

    this._closeModalButton.addEventListener('click', (event) => {
      this._closeBookModal(event);
    });

    window.onkeydown = (e) => {
      if (e.keyCode === 32 || e.keyCode === 13) {
        const parentId = e.target.parentNode.id;
        if (parentId === 'form-guest') {
          this._selectRadioGuest(e.target);
        }
        if (parentId === 'form-session') {
          this._selectRadioSession(e.target);
        }
      }
    };

    this._autocompleteHandler();
  },

  _selectRadioGuest(target) {
    const radios = document.querySelectorAll('input[name="guest"]');
    let radioValue = target.innerHTML.toLowerCase();

    if (radioValue === '&gt; 6') {
      radioValue = '> 6';
    }

    this._checkRadio(radios, radioValue);
  },

  _selectRadioSession(target) {
    const radios = document.querySelectorAll('input[name="session"]');
    const radioValue = target.innerHTML.toLowerCase();

    this._checkRadio(radios, radioValue);
  },

  _checkRadio(radios, radioValue) {
    radios.forEach((radio) => {
      const radioElement = radio;
      radioElement.checked = radioElement.value === radioValue;
    });
  },

  async _bookButtonHandler(event) {
    const formBook = this._getFormValue();
    if (this._isFormValid(formBook)) {
      this._openBookModal(event);
      const restaurantId = this._getRestaurantId();
      await BookRestaurant.putBook(this._createObjectBook(restaurantId));
    }
  },

  _openBookModal(event) {
    event.stopPropagation();
    this._bookModal.style.display = 'block';
    this._body.classList.add('stop-scrolling-modal');
  },

  _closeBookModal(event) {
    event.stopPropagation();
    this._bookModal.style.display = 'none';
    this._body.classList.remove('stop-scrolling-modal');
  },

  _getFormValue() {
    const formBook = [
      {
        name: 'restaurant',
        form: {
          value: this._book.restaurant.value,
          labelError: this._errorLabel.restaurant,
        },
      },
      {
        name: 'date',
        form: {
          value: this._book.date.value,
          labelError: this._errorLabel.date,
        },
      },
      {
        name: 'guest',
        form: {
          value: this._getRadioValue(this._book.guest, 'guest'),
          labelError: this._errorLabel.guest,
        },
      },
      {
        name: 'session',
        form: {
          value: this._getRadioValue(this._book.session, 'session'),
          labelError: this._errorLabel.session,
        },
      },
      {
        name: 'name',
        form: {
          value: this._book.name.value,
          labelError: this._errorLabel.name,
        },
      },
      {
        name: 'phone',
        form: {
          value: this._book.phone.value,
          labelError: this._errorLabel.phone,
        },
      },
      {
        name: 'request',
        form: {
          value: this._book.request.value,
          labelError: null,
        },
      },
    ];

    return formBook;
  },

  _clearFormValue() {
    this._book.request.value = '';
  },

  _createObjectBook(restaurantId) {
    const objectBook = {
      id: new Date().toISOString(),
      restaurantId: restaurantId.id,
      restaurant: this._book.restaurant.value,
      date: this._book.date.value,
      guest: this._getRadioValue(this._book.guest, 'guest'),
      session: this._getRadioValue(this._book.session, 'session'),
      name: this._book.name.value,
      phone: this._book.phone.value,
      request: this._book.request.value,
    };

    return objectBook;
  },

  _getRestaurantId() {
    const restaurantNameInput = this._book.restaurant.value;
    const lowerCaseNameInput = restaurantNameInput.toLowerCase();
    return this._restaurantData.find((restaurant) => {
      const lowerCaseNameData = restaurant.name.toLowerCase();
      return lowerCaseNameData === lowerCaseNameInput;
    });
  },

  _getRadioValue(radioForm, radioName) {
    let radioValue = '';
    const radio = radioForm.querySelector(`input[name="${radioName}"]:checked`);
    if (radio) {
      radioValue = radio.value;
    }
    return radioValue;
  },

  _isFormValid(formBook) {
    const isValid = formBook.map((singgleForm) => this._formValidator(singgleForm));

    return !isValid.includes(false);
  },

  _formValidator(singgleForm) {
    const { form } = singgleForm;
    let isValid = true;
    if (form.value.length === 0) {
      isValid = this._fillTextLabelError(form.labelError, singgleForm.name);
    } else {
      this._emptyLabelError(form.labelError);
    }

    if (this._checkIsRestaurantNotAvailable(singgleForm)) {
      isValid = this._fillTextRestaurantLabelError(form.labelError);
    }

    if (this._checkIsDateNotSufficient(singgleForm)) {
      isValid = this._fillTextDateLabelError(form.labelError);
    }

    return isValid;
  },

  _checkIsRestaurantNotAvailable(singgleForm) {
    if (singgleForm.name !== 'restaurant') {
      return false;
    }
    const restarantList = this._makeRestaurantList(this._restaurantData);
    const userInputRestaurant = singgleForm.form.value.toLowerCase();

    return !restarantList.includes(userInputRestaurant);
  },

  _checkIsDateNotSufficient(singgleForm) {
    if (singgleForm.name !== 'date') {
      return false;
    }

    const date = singgleForm.form.value;
    const unixDate = new Date(date).getTime();

    if (unixDate < Date.now()) {
      return true;
    }

    return false;
  },

  _makeRestaurantList(restaurants) {
    return restaurants.map((restaurant) => restaurant.name.toLowerCase());
  },

  _checkRestaurant(rawData, restaurant) {
    rawData.find((data) => {
      const labelLc = data.label.toLowerCase();
      const restaurantLc = restaurant.value.toLowerCase();
      return labelLc === restaurantLc;
    });
  },

  _fillTextLabelError(formLabelError, formName) {
    const alertIcon = createSolidExclamationCircleIcon('1.05em');
    const message = `${alertIcon} please fill ${formName}`;

    if (formLabelError) {
      const formLabelErrorElement = formLabelError;
      formLabelErrorElement.innerHTML = message;
    }

    if (formName === 'request') {
      return true;
    }

    return false;
  },

  _fillTextRestaurantLabelError(formLabelError) {
    const alertIcon = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>';
    const message = `${alertIcon} restaurant not available`;

    if (formLabelError) {
      const formLabelErrorElement = formLabelError;
      formLabelErrorElement.innerHTML = message;
    }

    return false;
  },

  _fillTextDateLabelError(formLabelError) {
    const alertIcon = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>';
    const message = `${alertIcon} date min h+1`;

    if (formLabelError) {
      const formLabelErrorElement = formLabelError;
      formLabelErrorElement.innerHTML = message;
    }

    return false;
  },

  _emptyLabelError(formLabelError) {
    if (formLabelError) {
      const formLabelErrorElement = formLabelError;
      formLabelErrorElement.innerHTML = '';
    }
  },

  _makeRestaurantDataSearchable(restaurants) {
    return restaurants.map((restaurant) => ({
      id: restaurant.id,
      label: restaurant.name,
      value: restaurant.name,
    }));
  },

  _autocompleteHandler() {
    const inputElement = this._book.restaurant;
    const searchable = this._makeRestaurantDataSearchable(this._restaurantData);
    registerAutocomplete(inputElement, searchable);
  },
};

export default restaurantBookInitiator;

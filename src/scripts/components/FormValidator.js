export default class FormValidator {
  constructor(config, form) {
    this._submitButton = config.submitButton;
    this._popupIsInvalid = config.popupIsInvalid;
    this._input = config.input;
    this._inputError = config.inputError;
    this._error = config.error;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._input));
    this._button = this._form.querySelector(this._submitButton);
  }

  _showInputError(input) {
    const error = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputError);
    error.textContent = input.validationMessage;
    error.classList.add(this._error);
  }

  _checkInputValidity (input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  };

  _hideInputError (input) {
    const error = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputError);
    error.classList.remove(this._error);
    error.textContent = '';
  };


  _hasInvalidInput() {
    return this._inputList.some((input) => {
        return !input.validity.valid;
    })
  }

  _disableButton() {
    this._button.classList.add(this._popupIsInvalid);
    this._button.setAttribute('disabled', 'disabled');
  }

  _enableButton() {
    this._button.classList.remove(this._popupIsInvalid);
    this._button.removeAttribute('disabled');
  }

  resetInputError(){
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    })
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton()
    } else {
      this._enableButton()
      }
    }

  _setEventListeners() {
    this.toggleButtonState();
    this._inputList.forEach((input) => {
      input.addEventListener('input',  () => {
        this._checkInputValidity(input);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  };
}


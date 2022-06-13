export default class FormValidator {
  //принимает в конструктор объект настроек с селекторами и классами формы:
  //принимает вторым параметром элемент той формы, которая валидируется;
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

  //приватные методы, которые обрабатывают форму:
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

  //изменяет состояние кнопки сабмита:
  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton()
    } else {
      this._enableButton()
      }
    }

  //устанавливает обработчики:
  _setEventListeners() {
    this.toggleButtonState();
    this._inputList.forEach((input) => {
      input.addEventListener('input',  () => {
        this._checkInputValidity(input);
        this.toggleButtonState();
      });
    });
  }

  //публичный метод, который включает валидацию формы.
  enableValidation() {
    this._setEventListeners();
  };
}


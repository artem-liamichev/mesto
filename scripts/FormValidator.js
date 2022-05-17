export default class FormValidator {
  //принимает в конструктор объект настроек с селекторами и классами формы:
  //принимает вторым параметром элемент той формы, которая валидируется;
  constructor(config, formSelector) {
    this._submitButton = config.submitButton;
    this._popupIsInvalid = config.popupIsInvalid;
    this._input = config.input;
    this._inputError = config.inputError;
    this._error = config.error;
    this._form = formSelector;
  }

  //приватные методы, которые обрабатывают форму:
  _showInputError(form, input) {
    const error = form.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputError);
    error.textContent = input.validationMessage;
    error.classList.add(this._error);
  }

  _checkInputValidity (form, input) {
    if (!input.validity.valid) {
      this._showInputError(form, input, input.validationMessage);
    } else {
      this._hideInputError(form, input);
    }
  };

  _hideInputError (form, input) {
    const error = form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputError);
    error.classList.remove(this._error);
    error.textContent = '';
  };

  _hasInvalidInput(inputList) {
    return inputList.some((input) => {
        return !input.validity.valid;
    })
  }

  //изменяет состояние кнопки сабмита:
  _toggleButtonState(inputList, button) {
    if (this._hasInvalidInput(inputList)) {
      button.classList.add(this._popupIsInvalid);
      button.setAttribute('disabled', 'disabled');
    } else {
      button.classList.remove(this._popupIsInvalid);
      button.removeAttribute('disabled');
      }
    }

  //устанавливает обработчики:
  _setEventListeners(form) {
    const inputList = Array.from(form.querySelectorAll(this._input));
    const button = form.querySelector(this._submitButton);
    this._toggleButtonState(inputList, button);
    inputList.forEach((input) => {
      input.addEventListener('input',  () => {
        this._checkInputValidity(form, input);
        this._toggleButtonState(inputList, button);
      });
    });
  }

  //публичный метод, который включает валидацию формы.
  enableValidation() {
    this._setEventListeners(this._form);
  };
}


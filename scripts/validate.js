function showInputError(form, input, config, errorMessage) {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add(config.inputError);
  error.textContent = errorMessage;
  error.classList.add(config.error);
}

function hideInputError (form, input, config ) {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove(config.inputError);
  error.classList.remove(config.error);
  error.textContent = '';
  console.log(error);
};

function checkInputValidity (form, input, config) {
  if (!input.validity.valid) {
    showInputError(form, input, config, input.validationMessage);
  } else {
    hideInputError(form, input, config);
  }
};

function setEventListeners(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.input));
  const button = form.querySelector(config.submitButton);

  toggleButtonState(inputList, button, config);

  inputList.forEach((input) => {
    input.addEventListener('input', function () {
      checkInputValidity(form, input, config);
      toggleButtonState(inputList, button, config);
    });
  });
};

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.form));
  formList.forEach((form) => {
    setEventListeners(form, config);
});
};

enableValidation({
  submitButton: '.popup__save',
  popupIsInvalid: 'popup__save_disabled',
  form: '.popup__form',
  input: '.popup__input',
  inputError: 'popup__input_type_error',
  error: 'error'
});

function hasInvalidInput (inputList) {
  return inputList.some((input) => {
      return !input.validity.valid;
  })
}

function toggleButtonState (inputList, button, config) {
  if (hasInvalidInput(inputList)) {
     button.classList.add(config.popupIsInvalid);
     button.setAttribute('disabled', 'disabled');
  } else {
     button.classList.remove(config.popupIsInvalid);
     button.removeAttribute('disabled');
    }
  }


function enableValidation(config) {
  const form = document.querySelector(config.form)
  form.addEventListener('submit', handleFormSubmit);
  form.addEventListener('input', (event) => handleFormInput(event, config));
}

function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const isValid = form.checkValidity();
}

function handleFormInput(event, config) {
  const form = event.currentTarget;
  const input = event.target;

  // 1. Найти невалидные поля и установить тексты ошибок
// setCustomError(input);
  // 2. Показать ошибки пользователям
setFieldError(input);
  // 3. Деактивировать кнопку на невалидной форме
setSubmitButtonState(form, config);
}

// function setCustomError(input) {
//   const validity = input.validity;

//   if (validity.tooShort || validity.tooLong) {
//     const currentLenght = input.value.length;
//     const min = input.getAttribute('minlength');
//     const max = input.getAttribute('maxlength');
//   }
// }

function setFieldError(input) {
  const error = document.querySelector(`.${input.id}-error`);
  error.textContent = input.validationMessage;
}

function setSubmitButtonState(form, config) {
  const button = form.querySelector(config.submitButton);
  const isValid = form.checkValidity();
  if (isValid) {
    button.classList.remove(config.popupIsInvalid);
    button.removeAttribute('disabled');
  }  else {
    button.classList.add(config.popupIsInvalid);
    button.setAttribute('disabled', 'disabled');
  }
}

enableValidation({
  form: '.popup__form_profile',
  submitButton: '.popup__save',
  popupIsInvalid: 'popup__save_disabled',
});

enableValidation({
  form: '.popup__form_add',
  submitButton: '.popup__save',
  popupIsInvalid: 'popup__save_disabled',
});



//   const isClosest = evt.target.closest(popupProfile)

//   if (!isClosest && popupProfile.classList.contains('popup_opened'))
//   {
//     popupProfile.classList.remove('popup_opened');
//   }

// })
//  {
//     if (popupProfile.classList.contains('popup_opened')) {
//       closeProfilePopup()
//   }
// }
// );


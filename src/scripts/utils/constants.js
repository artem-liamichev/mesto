export const config = {
  submitButton: '.popup__save',
  popupIsInvalid: 'popup__save_disabled',
  input: '.popup__input',
  inputError: 'popup__input_type_error',
  error: 'error'
}

export function renderLoading(form, isLoading) {
    if (isLoading) {
    form.querySelector(config.submitButton).textContent = 'Сохранение...';
  } else {
    form.querySelector(config.submitButton).textContent = 'Сохранить';
  }
}

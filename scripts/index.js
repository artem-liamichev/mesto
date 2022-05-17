export function openZoomPopup() {
  openPopup(popupZoom);
}
export const popupImage = document.querySelector('.popup__image');
export const popupCaption = document.querySelector('.popup__caption');


import Card from'./Card.js'

import FormValidator from './FormValidator.js'

const formList = Array.from(document.querySelectorAll('.popup__form'));

const initialElements = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]

const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_profile');
const formProfile = document.querySelector('.popup__form_profile');
const nameInput = formProfile.querySelector('input[name="name"]');
const jobInput = formProfile.querySelector('input[name="job"]');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const popupZoom = document.querySelector('.popup_zoom');

//select add-button
const elementOpenPopupButton = document.querySelector('.profile__add-button');

//select 2nd popup
const popupElement = document.querySelector('.popup_add');

//select 2nd form
const formElement = document.querySelector('.popup__form_add');

//select 2nd form save-button
const elementSaveButton = formElement.querySelector('.popup__save');

const placeNameInput = formElement.querySelector('input[name="place-name"]');
const placeLinkInput = formElement.querySelector('input[name="picture-link"]');

//select element-card
const elements = document.querySelector('.elements');

function copyToPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;
}

function openPopup(popup) {
  popup.classList.remove('popup_fade-out');
  popup.classList.add('popup_fade-in');
  setTimeout(function(){
    popup.classList.add('popup_opened');
    }, 10);
  popup.addEventListener('click', closeOnClick);
  document.addEventListener('keydown', closeOnEscape);
}

function closeOnEscape (evt) {
    if (evt.key === 'Escape'){
      const popupOpened = document.querySelector('.popup_opened');
      closePopup(popupOpened);
    }
}

function closePopup(popup) {
  popup.classList.remove('popup_fade-in');
  popup.classList.add('popup_fade-out');
  setTimeout(function(){
    popup.classList.remove('popup_opened');
    }, 400);
  document.removeEventListener('keydown', closeOnEscape);
  popup.removeEventListener('click', closeOnClick);
}

function openProfilePopup(popup) {
  openPopup(popupProfile);
  copyToPopup();
}

function closeProfilePopup() {
  closePopup(popupProfile);
}

function submitFormProfileHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  closeProfilePopup()
}

profileOpenPopupButton.addEventListener('click', openProfilePopup);

formProfile.addEventListener('submit', submitFormProfileHandler);

function openElementPopup() {
  openPopup(popupElement);
  elementSaveButton.classList.add('popup__save_disabled');
  elementSaveButton.setAttribute('disabled', 'disabled');
}

function closeElementPopup() {
  closePopup(popupElement);
}

elementOpenPopupButton.addEventListener('click', openElementPopup);

function closeOnClick (evt) {
  const popupOpened = document.querySelector('.popup_opened');
  const popupCloseButton = popupOpened.querySelector('.popup__close-button');
  const popupContainer = popupOpened.querySelector('.popup__container');
if ((evt.target.classList.contains('popup_opened')) && (evt.target.closest('.popup__container') != popupContainer) || (evt.target.closest('.popup__close-button') == popupCloseButton)) {
    closePopup(popupOpened);
  }
}

function submitFormHandler (evt) {
  evt.preventDefault();
  const placeInput = {name: placeNameInput.value, link: placeLinkInput.value};
  new Card(placeInput, '.item-template');
  const card =   new Card(placeInput, '.item-template');
  const newElement = card.createCard()
  elements.prepend(newElement)
  closeElementPopup();
  formElement.reset();
}

formElement.addEventListener('submit', submitFormHandler);

initialElements.forEach((element) => {
  new Card(element, '.item-template');
  const card = new Card(element, '.item-template');
  const newElement = card.createCard()
  elements.prepend(newElement)
  closePopup(popupElement);
});

formList.forEach((formSelector) => {
  const config = {
    submitButton: '.popup__save',
    popupIsInvalid: 'popup__save_disabled',
    input: '.popup__input',
    inputError: '.popup__input_type_error',
    error: '.error'
  }
  const formValidator = new FormValidator(config, formSelector);
  formValidator.enableValidation(formSelector);
});

//файл содержит уникальный для страницы код - 1.Создание новых экземпляров классов 2.Взаимодействие между классами 3.Передачу данных в классы
//корневой файл проекта - инициализация необходимых функций и классов


export const popupImage = document.querySelector('.popup__image');
export const popupCaption = document.querySelector('.popup__caption');


import Card from'../scripts/components/Card.js'

import {initialElements} from '../scripts/utils/initialCards.js'

import FormValidator from '../scripts/components/FormValidator.js'

import Section from '../scripts/components/Section.js';

import Popup from '../scripts/components/Popup.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';

const config = {
  submitButton: '.popup__save',
  popupIsInvalid: 'popup__save_disabled',
  input: '.popup__input',
  inputError: '.popup__input_type_error',
  error: '.error'
}

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
export const formElement = document.querySelector('.popup__form_add');

// const placeNameInput = formElement.querySelector('input[name="name"]');
// const placeLinkInput = formElement.querySelector('input[name="link"]');

//select element-card
const elements = document.querySelector('.elements');

function copyToPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;
}

const popuperProfile = new Popup('.popup_profile')

function openProfilePopup() {
  popuperProfile.open();
  // openPopup(popupProfile);
  copyToPopup();
}

function closeProfilePopup() {
  popuperProfile.close()
  // closePopup(popupProfile);
}

function submitFormProfileHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  closeProfilePopup()
  formProfile.reset();
  formValidators[ formProfile.name ].resetValidation()
}

profileOpenPopupButton.addEventListener('click', openProfilePopup);

formProfile.addEventListener('submit', submitFormProfileHandler);

function openElementPopup() {
  popuperWithForm.open();
}

elementOpenPopupButton.addEventListener('click', openElementPopup);


let myFuncCalls = 0;


const popuperZoom = new PopupWithImage('.popup_zoom')

function createCard(element){
  const card = new Card(element,
    '.item-template',
    {handleCardClick: () => {
    popuperZoom.open(element)}})
  return card.createCard();
}

const cardList = new Section({
    items: [],
    renderer: (element) => {
        cardList.locateNewCardAhead(createCard(element))
  }
},
elements
);

cardList.renderItems(initialElements);



const popuperWithForm = new PopupWithForm('.popup_add',
  {submitFormHandler: (data) => {
    cardList.locateNewCardAhead(createCard(data))
    popuperWithForm.close();
    formValidators[ formElement.name ].resetValidation()
  }
  })
popuperWithForm.setEventListeners;


const formValidators = {}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formSelector) => {
    const formValidator = new FormValidator(config, formSelector);
    formValidators[ formSelector.name ] = formValidator;
    formValidator.enableValidation();
  });
};

enableValidation(config);




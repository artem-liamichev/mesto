//файл содержит уникальный для страницы код - 1.Создание новых экземпляров классов 2.Взаимодействие между классами 3.Передачу данных в классы
//корневой файл проекта - инициализация необходимых функций и классов

import './index.css'; // добавьте импорт главного файла стилей

export const popupImage = document.querySelector('.popup__image');
export const popupCaption = document.querySelector('.popup__caption');

import Card from '../scripts/components/Card.js'

import {initialElements} from '../scripts/utils/initialCards.js'

import FormValidator from '../scripts/components/FormValidator.js'

import Section from '../scripts/components/Section.js';

import Popup from '../scripts/components/Popup.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';

const config = {
  submitButton: '.popup__save',
  popupIsInvalid: 'popup__save_disabled',
  input: '.popup__input',
  inputError: '.popup__input_type_error',
  error: '.error'
}

const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const formProfile = document.querySelector('.popup__form_profile');
const nameInput = formProfile.querySelector('input[name="name"]');
const jobInput = formProfile.querySelector('input[name="job"]');

//select add-button
const elementOpenPopupButton = document.querySelector('.profile__add-button');

//select 2nd form
const formElement = document.querySelector('.popup__form_add');

//select element-card
const elements = document.querySelector('.elements');

const popuperProfile = new Popup('.popup_profile')

const userInfo = new UserInfo('.profile__name', '.profile__bio')

function closeProfilePopup() {
  popuperProfile.close()
}

function submitFormProfileHandler (evt) {
  evt.preventDefault();
  userInfo.setUserInfo(nameInput, jobInput)
  closeProfilePopup();
  formProfile.reset();
  formValidators[ formProfile.name ].resetValidation();
}

// profileOpenPopupButton.addEventListener('click', openProfilePopup);

profileOpenPopupButton.addEventListener('click', () => {
  console.log("formValidators", formProfile);
  console.log("formValidators", formValidators[ formProfile.name ])
  console.log("formValidators", formElement);
  console.log("formValidators", formValidators[ formElement.name ])
  popuperProfile.open();
  const initialInfo = userInfo.getUserInfo();
  nameInput.value = initialInfo.userName;
  jobInput.value = initialInfo.userInfo;
});

formProfile.addEventListener('submit', submitFormProfileHandler);

elementOpenPopupButton.addEventListener('click', () => {
  formValidators[ formElement.name ].resetValidation()
  popuperWithForm.open();
  popuperWithForm.setEventListeners();
} );

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
  }
  })

const formValidators = {}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formSelector) => {
    formSelector.addEventListener('submit', function(evt) {
      evt.preventDefault();
    })
    const formValidator = new FormValidator(config, formSelector);
    formValidators[ formSelector.name ] = formValidator;
    formValidator.enableValidation();

  });
};

enableValidation(config);




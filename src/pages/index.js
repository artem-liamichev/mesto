//файл содержит уникальный для страницы код - 1.Создание новых экземпляров классов 2.Взаимодействие между классами 3.Передачу данных в классы
//корневой файл проекта - инициализация необходимых функций и классов

import './index.css'; // добавьте импорт главного файла стилей

import Card from '../scripts/components/Card.js'

import {initialElements} from '../scripts/utils/initialCards.js'

import FormValidator from '../scripts/components/FormValidator.js'

import Section from '../scripts/components/Section.js';

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
// const popupProfile = document.querySelector('.popup_profile');
const formProfile = document.querySelector('.popup__form_profile');
const nameInput = formProfile.querySelector('input[name="name"]');
const jobInput = formProfile.querySelector('input[name="job"]');


//select add-button
const elementOpenPopupButton = document.querySelector('.profile__add-button');

//select 2nd form
const formElement = document.querySelector('.popup__form_add');

const popuperProfileWithForm = new PopupWithForm('.popup_profile',
  {submitFormHandler: (data) => {
    userInfo.setUserInfo(data)
    popuperProfileWithForm.close()
  }
  })

popuperProfileWithForm.setEventListeners();

const userInfo = new UserInfo('.profile__name', '.profile__bio')

// function closeProfilePopup() {
//   popuperProfileWithForm.close()
// }

// function submitFormProfileHandler (evt) {
//   evt.preventDefault();
//   userInfo.setUserInfo(nameInput, jobInput)
//   closeProfilePopup();
//   formProfile.reset();
//   formValidators[ formProfile.name ].resetValidation();
// }

// profileOpenPopupButton.addEventListener('click', openProfilePopup);

profileOpenPopupButton.addEventListener('click', () => {
  formValidators[ formProfile.name ].toggleButtonState();
  popuperProfileWithForm.open();
  const initialInfo = userInfo.getUserInfo();
  nameInput.value = initialInfo.userName;
  jobInput.value = initialInfo.userJob;
});

// formProfile.addEventListener('submit', submitFormProfileHandler);

elementOpenPopupButton.addEventListener('click', () => {
  formValidators[ formElement.name ].toggleButtonState()
  popuperElementWithForm.open();
} );

const popuperZoom = new PopupWithImage('.popup_zoom')
popuperZoom.setEventListeners();

function createCard(element){
  const card = new Card(element,
    '.item-template',
    {handleCardClick: () => {
    popuperZoom.open(element)}})
  return card.createCard();
}

const cardList = new Section({
    renderer: (element) => {
        cardList.addItem(createCard(element))
  }
},
'.elements'
);
cardList.renderItems(initialElements);

const popuperElementWithForm = new PopupWithForm('.popup_add',
  {submitFormHandler: (data) => {
    cardList.addItem(createCard(data))
    popuperElementWithForm.close();
  }
  })

popuperElementWithForm.setEventListeners();

const formValidators = {}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((form) => {
    form.addEventListener('submit', function(evt) {
      evt.preventDefault();
    })
    const formValidator = new FormValidator(config, form);
    formValidators[ form.name ] = formValidator;
    formValidator.enableValidation();

  });
};

enableValidation(config);




//файл содержит уникальный для страницы код - 1.Создание новых экземпляров классов 2.Взаимодействие между классами 3.Передачу данных в классы
//корневой файл проекта - инициализация необходимых функций и классов

import './index.css'; // добавьте импорт главного файла стилей
import Card from '../scripts/components/Card.js'
import FormValidator from '../scripts/components/FormValidator.js'
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import PopupWithSubmit from '../scripts/components/PopupWithSubmit';

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-43', '13e0d01a-3631-45a5-b3a6-1a7f87295049')

const config = {
  submitButton: '.popup__save',
  popupIsInvalid: 'popup__save_disabled',
  input: '.popup__input',
  inputError: '.popup__input_type_error',
  error: '.error'
}

const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const formProfile = document.querySelector('.popup__form_profile');
const nameInput = formProfile.querySelector('input[name="surname"]');
const jobInput = formProfile.querySelector('input[name="job"]');
const elementOpenPopupButton = document.querySelector('.profile__add-button');
const formElement = document.querySelector('.popup__form_add');
const popuperProfileWithForm = new PopupWithForm('.popup_profile', submitFormProfileHandler)
const formAvatar = document.querySelector('.popup__form_avatar');
const avatarOpenPopupButton = document.querySelector('.profile__avatar-edit-button');
const avatarImage = document.querySelector('.profile__avatar');
const popuperAvatar = new PopupWithForm('.popup_avatar', submitFormAvatarHandler)
const userInfo = new UserInfo('.profile__name', '.profile__bio')

function submitFormProfileHandler(data) {
  formProfile.querySelector(config.submitButton).textContent = 'Сохранение...';
  api.addProfile(data)
  .then((data) => {
    userInfo.setUserInfo(data)
    popuperProfileWithForm.close()
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(()=>{
    setTimeout(()=>{
    formProfile.querySelector(config.submitButton).textContent = 'Сохранить';
    }, 400);
  })
}

formAvatar.querySelector(config.submitButton).textContent = 'Сохранить';

function submitFormAvatarHandler(data) {
  formAvatar.querySelector(config.submitButton).textContent = 'Сохранение...';
  api.addAvatar(data)
    .then((data) => {
      document.querySelector('.profile__avatar').src = data.avatar;
      popuperAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(()=>{
      setTimeout(()=>{
      formAvatar.querySelector(config.submitButton).textContent = 'Сохранить';
      }, 400);
    })
}

avatarImage.addEventListener('mouseover', () => {
  avatarOpenPopupButton.style.display = 'block';
})

avatarImage.addEventListener('mouseout', () => {
  avatarOpenPopupButton.style.display = 'none';
})

avatarImage.addEventListener('click', () => {
  formValidators[ formAvatar.name ].toggleButtonState()
  popuperAvatar.open();
})

popuperAvatar.setEventListeners();


api.getInitialCards()
  .then((initialCards) => {
    cardList.renderItems(initialCards.reverse());
  })
  .catch((err) => {
    console.log(err);
  })

api.getProfile()
  .then((profileInfo) => {
    document.querySelector('.profile__name').textContent = profileInfo.name;
    document.querySelector('.profile__bio').textContent = profileInfo.about;
    document.querySelector('.profile__avatar').src = profileInfo.avatar;
    })
  .catch((err) => {
    console.log(err);
  })

popuperProfileWithForm.setEventListeners();

profileOpenPopupButton.addEventListener('click', () => {
  formValidators[ formProfile.name ].toggleButtonState();
  popuperProfileWithForm.open();
  const initialInfo = userInfo.getUserInfo();
  nameInput.value = initialInfo.userName;
  jobInput.value = initialInfo.userJob;
});

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
    popuperZoom.open(element)}},
    {deleteClickHandler: (cardId) => {
      console.log('cardId:', cardId)
      const deletePopuper = new PopupWithSubmit('.popup_delete',
       {submitDeletionHandler: () => {
          console.log("i am here")
          api.deleteCard(cardId)
          .then(() => {
            deletePopuper.close();
            card.handleElementDelete()
          })
          .catch((err) => {
            console.log(err);
          })
       }})
       deletePopuper.setEventListeners();
       deletePopuper.open();
    }},
    {likeClickHandler: (cardId) => {
      api.setLike(cardId)
          .then((data) => {
          card.handleSetLike(data);
        })
        .catch((err) => {
          console.log(err);
        })
    }},
    {resetLikeClickHandler: (cardId) => {
      api.resetLike(cardId)
          .then((data) => {
          card.handleResetLike(data);
        })
        .catch((err) => {
          console.log(err);
        })
    }}
    )

    return card.createCard();
}

const cardList = new Section({
    renderer: (element) => {
        cardList.addItem(createCard(element))
  }
},
'.elements'
);

const popuperElementWithForm = new PopupWithForm('.popup_add', submitFormElementHandler)

function submitFormElementHandler (data) {
  formElement.querySelector(config.submitButton).textContent = 'Сохранение...';
  api.addCard(data)
    .then((data) => {
      cardList.addItem(createCard(data))
      popuperElementWithForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(()=>{
      setTimeout(()=>{
      formElement.querySelector(config.submitButton).textContent = 'Сохранить';
      }, 400);
    })
}

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




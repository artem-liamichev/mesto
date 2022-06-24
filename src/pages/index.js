import './index.css';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import PopupWithSubmit from '../scripts/components/PopupWithSubmit';
import {config} from '../scripts/utils/constants.js';
import { renderLoading } from '../scripts/utils/constants.js';
const api = new Api('https://mesto.nomoreparties.co/v1/cohort-43', '13e0d01a-3631-45a5-b3a6-1a7f87295049')
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
const userInfo = new UserInfo('.profile__name', '.profile__bio', avatarImage)
const popupConfirm = new PopupWithSubmit('.popup_delete')

const cardList = new Section({
  renderer: (element) => {
      cardList.addItem(createCard(element, userId))
  }
},
'.elements');

const popupAddCard = new PopupWithForm('.popup_add', submitAddCardForm)


let userId = "";

function submitAddCardForm (data) {
  renderLoading(formElement, true);
  api.addCard(data)
    .then((data) => {
      cardList.addItem(createCard(data, userId))
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(()=>{
      setTimeout(()=>{
        renderLoading(formElement, false);
      }, 400)})}

popupConfirm.setEventListeners();

function submitFormProfileHandler(data) {
  renderLoading(formProfile, true);
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
      renderLoading(formProfile, false);
    }, 400);
  })
}

function submitFormAvatarHandler(data) {
  renderLoading(formAvatar, true);
  api.addAvatar(data)
    .then((data) => {
      avatarImage.src = data.avatar;
      popuperAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(()=>{
      setTimeout(()=>{
        renderLoading(formAvatar, false);
      }, 400);
    })
}

elementOpenPopupButton.addEventListener('click', () => {
  formValidators[ formElement.name ].resetInputError();
  formValidators[ formElement.name ].toggleButtonState()
  popupAddCard.open();
});

popupAddCard.setEventListeners();

avatarImage.addEventListener('mouseover', () => {
  avatarOpenPopupButton.style.display = 'block';
})

avatarImage.addEventListener('mouseout', () => {
  avatarOpenPopupButton.style.display = 'none';
})

avatarImage.addEventListener('click', () => {
  formValidators[ formAvatar.name ].resetInputError();
  formValidators[ formAvatar.name ].toggleButtonState()
  popuperAvatar.open();
  formValidators[ formAvatar.name ].enableValidation();
})

popuperAvatar.setEventListeners();



api.getAllNeededData()
  .then(argument => {
    const [ profileInfo, initialCards ] = argument;
    userInfo.setUserInfo(profileInfo);
    userId = profileInfo._id;
    cardList.renderItems(initialCards.reverse());
    })
    .catch((err) => {
      console.log(err);
    })

popuperProfileWithForm.setEventListeners();

profileOpenPopupButton.addEventListener('click', () => {
  formValidators[ formProfile.name ].toggleButtonState();
  formValidators[ formProfile.name ].resetInputError();
  popuperProfileWithForm.open();
  const initialInfo = userInfo.getUserInfo();
  nameInput.value = initialInfo.userName;
  jobInput.value = initialInfo.userJob;
});

const popuperZoom = new PopupWithImage('.popup_zoom')
popuperZoom.setEventListeners();

function createCard(element, userId){
  const card = new Card(element, userId,
    '.item-template',
    {handleCardClick: () => {
    popuperZoom.open(element)}},
    {deleteClickHandler: (cardId) => {
      popupConfirm.open();
      popupConfirm.setSubmitAction(() => {
        api.deleteCard(cardId)
        .then(() => {
          popupConfirm.close();
          card.handleElementDelete()
        })
        .catch((err) => {
          console.log(err);
        })
    })
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




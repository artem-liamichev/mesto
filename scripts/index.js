const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup_profile');
const profileClosePopup = document.querySelector('.popup__close-button');
let formProfile = document.querySelector('.popup__form');
let nameInput = formProfile.querySelector('input[name="name"]');
let jobInput = formProfile.querySelector('input[name="job"]');
let profileName = document.querySelector('.profile__name');
let profileBio = document.querySelector('.profile__bio');

let initialElements = [
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

//select add-button
const elementOpenPopupButton = document.querySelector('.profile__add-button');

//select 2nd popup
let popupElement = document.querySelectorAll('.popup')[1];

//select 2nd close-button
let elementClosePopup = document.querySelectorAll('.popup__close-button')[1];

//select 2nd form
formElement = document.querySelectorAll('.popup__form')[1];

//select input of 2nd form
let placeNameInput = formElement.querySelector('input[name="place-name"]').value;

//select 2nd input of 2nd form
let placeLinkInput = formElement.querySelector('input[name="picture-link"]').value;

//select element-card
const elements = document.querySelector('.elements');

//select 2nd submit button
let buttton = document.querySelectorAll('.popup__save')[1];

//select template class
const template = document.querySelector('.item-template').content;

function copyToPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;
}

function openPopup() {
  popup.classList.remove('popup_fade-out');
  popup.classList.add('popup_opened');
  popup.classList.add('popup_fade-in');
  copyToPopup();
}

function closePopup() {
  popup.classList.remove('popup_fade-in');
  popup.classList.add('popup_fade-out');
  setTimeout(function(){
    popup.classList.remove('popup_opened');
    }, 1000);
}

function formProfileSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  closePopup()
}

profileOpenPopupButton.addEventListener('click', openPopup);

profileClosePopup.addEventListener('click', closePopup);

formProfile.addEventListener('submit', formProfileSubmitHandler);

function openElementPopup() {
  popupElement.classList.remove('popup_fade-out');
  popupElement.classList.add('popup_opened');
  popupElement.classList.add('popup_fade-in');
}

function closeElementPopup() {
  popupElement.classList.remove('popup_fade-in');
  popupElement.classList.add('popup_fade-out');
  setTimeout(function(){
    popupElement.classList.remove('popup_opened');
    }, 1000);
}

elementOpenPopupButton.addEventListener('click', openElementPopup);

elementClosePopup.addEventListener('click', closeElementPopup);

function render() {
  initialElements.forEach(renderItem);
}

function handleDelete(event) {
  console.log('handleDelete:', handleDelete)
  event.target.closest('.element').remove();
}

function addListeners(el) {
  el.querySelector('.element__delete-button').addEventListener('click', handleDelete)
  el.querySelector('.element__like-button').addEventListener('click', handleLike)
  el.querySelector('.element__image').addEventListener('click', handleOpenImage)
}

function handleLike(event) {
  event.currentTarget.classList.toggle('element__like-button_active');
}

//select 2nd popup
let popupZoom = document.querySelectorAll('.popup')[2];

function openZoomPopup() {
  popupZoom.classList.remove('popup_fade-out');
  popupZoom.classList.add('popup_opened');
  popupZoom.classList.add('popup_fade-in');
}

//select 2nd close-button
elementClosePopup = document.querySelectorAll('.popup__close-button')[2];

elementClosePopup.addEventListener('click', closeZoomPopup);

function closeZoomPopup() {
  popupZoom.classList.remove('popup_fade-in');
  popupZoom.classList.add('popup_fade-out');
  setTimeout(function(){
    popupZoom.classList.remove('popup_opened');
    }, 1000);
}

function handleOpenImage(event) {
  let popupImage = document.querySelector('.popup__image');
  popupImage.src = event.currentTarget.src;
  console.log('popupImage:', popupImage);

  let popupCaption = document.querySelector('.popup__caption');
  popupCaption.textContent = event.currentTarget.alt;
  openZoomPopup()
  console.log('openZoomPopup():', openZoomPopup())
}

function renderItem(elementItem) {
    const newItem = template.cloneNode(true); //copy template, works fine
    const newElementName = newItem.querySelector('.element__name')
    newElementName.textContent = elementItem.name
    const elementImage = newItem.querySelector('.element__image')
    elementImage.src = elementItem.link
    elementImage.alt = elementItem.name
    addListeners(newItem);
    elements.prepend(newItem);
  }

  function formSubmitHandler (evt) {
    evt.preventDefault();
  //select inputs of 2nd form
  placeNameInput = formElement.querySelector('input[name="place-name"]');
  placeLinkInput = formElement.querySelector('input[name="picture-link"]');

    //assign inputs to a variable
  let placeInput = [{name: placeNameInput.value, link: placeLinkInput.value}];

    //select 2nd form
  formElement = document.querySelectorAll('.popup__form')[1];

  //show in HTML
  renderItem(placeInput[0]);
  formElement.reset();
  closeElementPopup()
}

formElement.addEventListener('submit', formSubmitHandler);

render();

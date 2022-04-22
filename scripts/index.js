const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_profile');
const profileClosePopup = document.querySelector('.popup__close-button');
const formProfile = document.querySelector('.popup__form_profile');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const nameInput = formProfile.querySelector('input[name="name"]');
const jobInput = formProfile.querySelector('input[name="job"]');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const popupZoom = document.querySelector('.popup_zoom');

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

//select 2nd close-button
const zoomedElementClosePopup = popupZoom.querySelector('.popup__close-button');

//select add-button
const elementOpenPopupButton = document.querySelector('.profile__add-button');

//select 2nd popup
const popupElement = document.querySelector('.popup_add');

//select 2nd close-button
const elementClosePopup = popupElement.querySelector('.popup__close-button');

//select 2nd form
const formElement = document.querySelector('.popup__form_add');

const placeNameInput = formElement.querySelector('input[name="place-name"]');
const placeLinkInput = formElement.querySelector('input[name="picture-link"]');

//select element-card
const elements = document.querySelector('.elements');

//select template class
const template = document.querySelector('.item-template').content;

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
}

function closePopup(popup) {
  popup.classList.remove('popup_fade-in');
  popup.classList.add('popup_fade-out');
  setTimeout(function(){
    popup.classList.remove('popup_opened');
    }, 1000);
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

// profileClosePopup.addEventListener('click', closeProfilePopup);

document.addEventListener('click', function (evt) {
  const popupContainer = document.querySelector('.popup__container');
  if ((popupProfile.classList.contains('popup_opened')) && (evt.target.closest('.popup__container') != popupContainer) || (evt.target.closest('.popup__close-button') == profileClosePopup)) {
    closeProfilePopup();
  }
  })


// const overlay = document.querySelector('.');
// overlay.addEventListener('click', closeProfilePopup);

formProfile.addEventListener('submit', submitFormProfileHandler);

function openElementPopup() {
  openPopup(popupElement);
}

function closeElementPopup() {
  closePopup(popupElement);
}

elementOpenPopupButton.addEventListener('click', openElementPopup);

document.addEventListener('keydown', function(evt) {
  if (evt.key === 'Escape'){
    closeElementPopup();
    closeProfilePopup();
  }
});

document.addEventListener('click', function (evt) {
  const popupContainer = document.querySelector('.popup__element-container');
  if ((popupElement.classList.contains('popup_opened')) && (evt.target.closest('.popup__element-container') != popupContainer) || (evt.target.closest('.popup__close-button') == elementClosePopup)) {
    closeElementPopup();
  }
  })


function render() {
  initialElements.forEach(renderItem);
}

function handleDelete(event) {
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


function openZoomPopup() {
  openPopup(popupZoom);
}

zoomedElementClosePopup.addEventListener('click', closeZoomPopup);

function closeZoomPopup() {
  closePopup(popupZoom);
}

function handleOpenImage(event) {
  popupImage.src = event.currentTarget.src;
  popupImage.alt = event.currentTarget.alt;
  popupCaption.textContent = event.currentTarget.alt;
  openZoomPopup()
}

function renderItem(item) {
  elements.prepend(createCard(item));
  closePopup(popupElement);
}

function createCard(elementItem) {
  const newItem = template.cloneNode(true); //copy template
  const newElementName = newItem.querySelector('.element__name'); //select card name
  newElementName.textContent = elementItem.name;
  const elementImage = newItem.querySelector('.element__image');
  elementImage.src = elementItem.link;
  elementImage.alt = elementItem.name;
  addListeners(newItem);
  return newItem
}

function submitFormHandler (evt) {
  evt.preventDefault();
  //assign inputs to a variable
  const placeInput = [{name: placeNameInput.value, link: placeLinkInput.value}];
  //show in HTML
  renderItem(placeInput[0]);
  closeElementPopup();
  formElement.reset();
}

formElement.addEventListener('submit', submitFormHandler);

render();

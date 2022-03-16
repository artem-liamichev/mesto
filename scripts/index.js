const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.profile_popup');
const profileClosePopup = document.querySelector('.popup__close-button');
const formProfile = document.querySelector('.popup__form');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
let nameInput = formProfile.querySelector('input[name="name"]');
let jobInput = formProfile.querySelector('input[name="job"]');
let profileName = document.querySelector('.profile__name');
let profileBio = document.querySelector('.profile__bio');

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

//select add-button
const elementOpenPopupButton = document.querySelector('.profile__add-button');

//select 2nd popup
let popupElement = document.querySelector('.add_popup');

//select 2nd close-button
let elementClosePopup = popupElement.querySelector('.popup__close-button');

//select 2nd form
formElement = document.querySelector('.add_form');

const placeNameInput = formElement.querySelector('input[name="place-name"]');
const placeLinkInput = formElement.querySelector('input[name="picture-link"]');

//select element-card
const elements = document.querySelector('.elements');

//select 2nd  button
let buttton = popupElement.querySelector('.popup__save');

//select template class
const template = document.querySelector('.item-template').content;

function copyToPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openProfilePopup(popup) {
  popupProfile.classList.remove('popup_fade-out');
  openPopup(popupProfile);
  popupProfile.classList.add('popup_fade-in');
  addPopupListeners(popup);
  copyToPopup();
}

function addPopupListeners(el) {

}

function closeProfilePopup() {
  popupProfile.classList.remove('popup_fade-in');
  popupProfile.classList.add('popup_fade-out');
  setTimeout(function(){
    closePopup(popupProfile);
    }, 1000);
}

function submitFormProfileHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  closeProfilePopup()
}

profileOpenPopupButton.addEventListener('click', openProfilePopup);

profileClosePopup.addEventListener('click', closeProfilePopup);

formProfile.addEventListener('submit', submitFormProfileHandler);

function openElementPopup() {
  popupElement.classList.remove('popup_fade-out');
  openPopup(popupElement);
  popupElement.classList.add('popup_fade-in');
}

function closeElementPopup() {
  popupElement.classList.remove('popup_fade-in');
  popupElement.classList.add('popup_fade-out');
  setTimeout(function(){
    closePopup(popupElement);
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
let popupZoom = document.querySelector('.zoom_popup');

function openZoomPopup() {
  popupZoom.classList.remove('popup_fade-out');
  openPopup(popupZoom);
  popupZoom.classList.add('popup_fade-in');
}

//select 2nd close-button
elementClosePopup = popupZoom.querySelector('.popup__close-button');

elementClosePopup.addEventListener('click', closeZoomPopup);

function closeZoomPopup() {
  popupZoom.classList.remove('popup_fade-in');
  popupZoom.classList.add('popup_fade-out');
  setTimeout(function(){
    closePopup(popupZoom);
    }, 1000);
}

function handleOpenImage(event) {
  popupImage.src = event.currentTarget.src;
  popupImage.alt = event.currentTarget.alt;
  // console.log('popupImage:', popupImage);
  popupCaption.textContent = event.currentTarget.alt;
  openZoomPopup()
  console.log('openZoomPopup():', openZoomPopup())
}

function renderItem(item) {
    // elements.prepend(newItem);
    elements.prepend(createCard(item));
  }

  function createCard(elementItem) {
    // тут создаете карточку
    const newItem = template.cloneNode(true); //copy template
    const newElementName = newItem.querySelector('.element__name'); //select card name
    newElementName.textContent = elementItem.name;
    const elementImage = newItem.querySelector('.element__image');
    elementImage.src = elementItem.link;
    elementImage.alt = elementItem.name;
    addListeners(newItem);
    return newItem // возваращаете готовую карточку
  }

  function submitFormHandler (evt) {
    evt.preventDefault();
  //select inputs of 2nd form


    //assign inputs to a variable
  let placeInput = [{name: placeNameInput.value, link: placeLinkInput.value}];

    //select 2nd form
  formElement = document.querySelector('.add_form');

  //show in HTML
  renderItem(placeInput[0]);
  formElement.reset();
  closeElementPopup()
}

formElement.addEventListener('submit', submitFormHandler);

render();

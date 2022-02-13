const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const profileClosePopup = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('input[name="name"]');
let jobInput = formElement.querySelector('input[name="job"]');
let profileName = document.querySelector('.profile__name');
let profileBio = document.querySelector('.profile__bio');

function copyToPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;
}

function openPopup() {
  popup.classList.add('popup_opened');
  copyToPopup();
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  closePopup()
}

profileOpenPopupButton.addEventListener('click', openPopup);

profileClosePopup.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);

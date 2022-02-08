const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup')
const profileClosePopup = document.querySelector('.popup__close-button')

const profileSavePopup = document.querySelector('.popup__save')

profileSavePopup.addEventListener('click', closePopup)

function openPopup() {
  popup.classList.add('popup_opened')
}

profileOpenPopupButton.addEventListener('click', openPopup)

function closePopup() {
  popup.classList.remove('popup_opened')
}

profileClosePopup.addEventListener('click', closePopup)

// Находим форму в DOM
let formElement = document.querySelector('.popup__form') // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
console.log(formElement);

let nameInput = formElement.querySelector('input[name="name"]') // Воспользуйтесь инструментом .querySelector()
console.log(nameInput);

let jobInput = formElement.querySelector('input[name="job"]') // Воспользуйтесь инструментом .querySelector()
console.log(jobInput);

// Обработчик «отправки» формы, хотя пока

function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.

    let nameValue = nameInput.value;
    let jobValue = jobInput.value;

    let profileName = document.querySelector('.profile__name');
    let profileBio = document.querySelector('.profile__bio');

    profileName.textContent = nameValue;
    profileBio.textContent = jobValue;

    closePopup()
}

formElement.addEventListener('submit', formSubmitHandler);


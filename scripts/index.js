const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup')
const profileClosePopup = document.querySelector('.popup__close')

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
// она никуда отправляться не будет


function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.

// Получите значение полей jobInput и nameInput из свойства value
let nameValue = nameInput.value;
let jobValue = jobInput.value;

console.log(nameValue);
console.log(jobValue);

//     // Выберите элементы, куда должны быть вставлены значения полей

    let profileName = document.querySelector('.profile__name');
console.log(profileName);
    let profileBio = document.querySelector('.profile__bio');
console.log(profileBio);

profileName.textContent = nameValue; // можно перезаписать содержимое
profileBio.textContent = jobValue; // можно перезаписать содержимое


console.log(profileName.textContent);
console.log(profileBio.textContent);
closePopup()
}

// // Прикрепляем обработчик к форме:
// // он будет следить за событием “submit” - «отправка»

formElement.addEventListener('submit', formSubmitHandler);

// const saveChangesButton = document.querySelector('popup__save')

// console.log(popup);

// saveChangesButton.addEventListener('submit', closePopup)

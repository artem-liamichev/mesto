export default class UserInfo {
  constructor(userNameSelector, userInfoSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
    this._formProfile = document.querySelector('.popup__form_profile');
  }

//собрать данные и подставить в форму
getUserInfo = () => {
  const userName = this._userName.textContent;
  const userInfo = this._userInfo.textContent;
  return {userName, userInfo}
}

//принимает новые данные и добавляет их на страницу
//получает объект с ключами и устанавливает их в разметку.
setUserInfo (nameInput,jobInput) {
  this._userName.textContent = nameInput.value;
  this._userInfo.textContent = jobInput.value;
}

}

export default class UserInfo {
  constructor(userName, userJob) {
    this._userName = document.querySelector(userName);
    this._userJob = document.querySelector(userJob);
  }

//собрать данные и подставить в форму
getUserInfo = () => {
  const userName = this._userName.textContent;
  const userJob = this._userJob.textContent;
  return {userName, userJob}
}

//принимает новые данные и добавляет их на страницу
//получает объект с ключами и устанавливает их в разметку.
setUserInfo = (data) => {
  this._userName.textContent = data.name;
  this._userJob.textContent = data.job;
}

}

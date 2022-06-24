export default class UserInfo {
  constructor(userName, userJob, userAvatar) {
    this._userName = document.querySelector(userName);
    this._userJob = document.querySelector(userJob);
    this._userAvatar = userAvatar;
  }

getUserInfo = () => {
  const userName = this._userName.textContent;
  const userJob = this._userJob.textContent;
  return {userName, userJob}
}

setUserInfo = (data) => {
  if (data.name, data.about, data.avatar)
  {
    this._userName.textContent = data.name;
    this._userJob.textContent = data.about;
    this._userAvatar.src = data.avatar;
  }
}
}

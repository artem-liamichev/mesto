export default class Api {
  constructor(url, token) {
    this._url = url;
    this._token = token;
    this._headers = {
      'Content-type': 'application/json',
      'Authorization': this._token,
    }
  }

  _checkServerResponse(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject('Возникла ошибка')
  }

  getAllNeededData() {
    return Promise.all([this.getProfile(), this.getInitialCards()])
  }

  getInitialCards() {
    return fetch(`${this._url}/cards/`, {
      headers: this._headers
    })
      .then((res) => {
        return this._checkServerResponse(res);
      })
  }

  getProfile() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then((res) => {
        return this._checkServerResponse(res);
      })
  }

  addProfile(data) {
    const body = {
      name: data.surname,
      about: data.job
    }
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(body)
})
    .then((res) => {
      return this._checkServerResponse(res);
    })
  }

  addCard(data) {
    const body = {
      name: data.name,
      link: data.link
    }
    return fetch(`${this._url}/cards/`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(body)
})
    .then((res) => {
      return this._checkServerResponse(res);
    })
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then((res) => {
      return this._checkServerResponse(res);
    })
  }

  setLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then((res) => {
      return this._checkServerResponse(res);
    })
  }

  resetLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then((res) => {
      return this._checkServerResponse(res);
    })
  }

  addAvatar(data) {
    const body = {
      avatar: data.avatar,
    }
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(body)
})
    .then((res) => {
      return this._checkServerResponse(res);
    })
  }
 }

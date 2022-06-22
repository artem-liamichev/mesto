export default class Api {
  constructor(url, token) {
    this._url = url;
    this._token = token;
    this._headers = {
      'Content-type': 'application/json',
      'Authorization': this._token,
    }
  }

  getInitialCards() {
    return fetch(`${this._url}/cards/`, {
      headers: this._headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject('Возникла ошибка')
      })
  }

  getProfile() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject('Возникла ошибка')
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
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Возникла ошибка')
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
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Возникла ошибка')
    })
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Возникла ошибка')
    })
  }

  setLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Возникла ошибка')
    })
  }

  resetLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Возникла ошибка')
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
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Возникла ошибка')
    })
  }

 }

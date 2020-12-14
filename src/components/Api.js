/*Токен: df22a34d-0827-4604-b3c3-15999daac8f2
Идентификатор группы: cohort-18*/

export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
        .then(this._handleResponse);
    }

    setUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(this._handleResponse);
    }

    addNewCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(this._handleResponse);
    }

    deleteCard(data) {
        return fetch(`${this._baseUrl}/cards/${data._id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._handleResponse);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        })
        .then(this._handleResponse);
    }

    updateUserAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
        .then(this._handleResponse);
    }

    likeCard(data) {
        return fetch(`${this._baseUrl}/cards/likes/${data._id}`, {
            method: 'PUT',
            headers: this._headers,
        })
        .then(this._handleResponse);
    }

    dislikeCard(data) {
        return fetch(`${this._baseUrl}/cards/likes/${data._id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(this._handleResponse);
    }

    _handleResponse(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }
}
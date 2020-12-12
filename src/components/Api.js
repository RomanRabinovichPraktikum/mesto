export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    /*Токен: df22a34d-0827-4604-b3c3-15999daac8f2
    Идентификатор группы: cohort-18*/

    /*
    получить список всех карточек в виде массива (GET)
    добавить карточку (POST)
    удалить карточку (DELETE)
    получить данные пользователя (GET)
    заменить данные пользователя (PATCH)
    заменить аватар (PATCH)
    “залайкать” карточку (PUT)
    удалить лайк карточки (DELETE)
     */

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
        }).then(this._handleResponse);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        }).then(this._handleResponse);
    }

    _handleResponse(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }
}
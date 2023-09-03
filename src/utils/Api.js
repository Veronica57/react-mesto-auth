export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
        this._authorization = options.headers.authorization;
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Код ошибки ${res.status}`);
    }

    getInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._authorization,
            },
        }).then(this._checkResponse);
    }

    setInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.username,
                about: data.userdescription,
            }),
        }).then(this._checkResponse);
    }

    setAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.useravatar,
            }),
        }).then(this._checkResponse);
    }

    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: this._authorization,
            },
        }).then(this._checkResponse);
    }

    addNewCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data.imagename,
                link: data.imagelink,
            }),
        }).then(this._checkResponse);
    }

    addLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: {
                authorization: this._authorization,
            },
        }).then(this._checkResponse);
    }

    deleteLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: {
                authorization: this._authorization,
            },
        }).then(this._checkResponse);
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/`, {
            method: "DELETE",
            headers: {
                authorization: this._authorization,
            },
        }).then(this._checkResponse);
    }
}

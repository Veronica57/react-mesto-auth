class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
        this._authorization = options.headers.authorization;
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Код ошибки ${res.status}`);
    }

    //user data receiving
    getInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._authorization,
            },
        }).then(this._checkResponse);
    }

    // user data updating
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

    //avatar updating
    setAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.useravatar,
            }),
        }).then(this._checkResponse);
    }

    //user data receiving
    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: this._authorization,
            },
        }).then(this._checkResponse);
    }

    //new card adding
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

    //like adding
    addLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: {
                authorization: this._authorization,
            },
        }).then(this._checkResponse);
    }

    //like deleting
    deleteLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: {
                authorization: this._authorization,
            },
        }).then(this._checkResponse);
    }

    //card deleting
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/`, {
            method: "DELETE",
            headers: {
                authorization: this._authorization,
            },
        }).then(this._checkResponse);
    }
}

const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-72",
    headers: {
        authorization: "8abff67b-bce1-4956-a9c9-3acb678266c1",
        "Content-Type": "application/json",
    },
});

export default api;

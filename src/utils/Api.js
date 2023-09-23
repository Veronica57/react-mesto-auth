class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
        this._authorization = options.headers.authorization;
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Код ошибки ${res.status}`);
    }

    //получение данных о пользователе
    getInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._authorization,
            },
        }).then(this._checkResponse);
    }

    // Обновление данных о ползователе
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

    //Обновление аватара
    setAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.useravatar,
            }),
        }).then(this._checkResponse);
    }

    //получение данных о карточках
    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: this._authorization,
            },
        }).then(this._checkResponse);
    }

    //добавлении новой карточки
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

    //добавление лайка
    addLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: {
                authorization: this._authorization,
            },
        }).then(this._checkResponse);
    }

    //удаление лайка
    deleteLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: {
                authorization: this._authorization,
            },
        }).then(this._checkResponse);
    }

    // changeLike(id, isLiked) {
    //     if (isLiked) {
    //         return this.deleteLike(id);
    //     } else {
    //         return this.addLike(id);
    //     }
    // }

    //удаление карточки
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

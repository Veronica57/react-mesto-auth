class Auth {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Код ошибки ${res.status}`);
    }

    async _fetch(url, options = {}) {
        const res = await fetch(`${this._baseUrl}${url}`, {
            ...options,
            headers: { "Content-type": "application/json", ...options.headers },
        });
        return this._checkResponse(res);
    }

    register(password, email) {
        return this._fetch("/signup", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });
    }

    authorize(email, password) {
        return this._fetch("/signin", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });
    }

    getToken(token) {
        return this._fetch("/users/me", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
    }
}

const auth = new Auth({
    baseUrl: "https://auth.nomoreparties.co",
});

export default auth;

import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ handleRegisterSubmit }) {
    const [data, setData] = useState({
        password: "",
        email: "",
    });

    const handleDataChange = (event) => {
        const { name, value } = event.target;
        setData({
            ...data,
            [name]: value,
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        handleRegisterSubmit(data.email, data.password);
    };

    return (
        <main className="sign">
            <div className="sign__container">
                <h2 className="sign__title">Регистрация</h2>
                <form className="sign__form" onSubmit={handleSubmit}>
                    <input
                        id="email"
                        name="email"
                        className="sign__input"
                        type="email"
                        required
                        minLength="2"
                        placeholder="Email"
                        value={data.email}
                        onChange={(event) => {
                            handleDataChange(event);
                        }}></input>
                    <input
                        id="password"
                        name="password"
                        className="sign__input"
                        type="password"
                        required
                        minLength="6"
                        placeholder="Пароль"
                        value={data.password}
                        onChange={(event) => {
                            handleDataChange(event);
                        }}></input>
                    <button className="sign__button" type="submit">
                        Зарегистрироваться
                    </button>
                </form>
                <Link to="/sign-in" className="sign__link">
                    Уже зарегистрированы? Войти
                </Link>
            </div>
        </main>
    );
}
export default Register;

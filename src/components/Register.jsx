import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    function handleSubmit(event) {
        event.preventDefault();
        onRegister(password, email);
    }

    return (
        <main>
            <section className="sign">
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
                            value={email}
                            onChange={handleChangeEmail}></input>
                        <input
                            id="password"
                            name="password"
                            className="sign__input"
                            type="password"
                            required
                            minLength="6"
                            placeholder="Пароль"
                            value={password}
                            onChange={handleChangePassword}></input>
                        <button className="sign__button" type="submit">
                            Зарегистрироваться
                        </button>
                    </form>
                    <Link to="/signin" className="sign__link">
                        Уже зарегистрированы? Войти
                    </Link>
                </div>
            </section>
        </main>
    );
}
export default Register;

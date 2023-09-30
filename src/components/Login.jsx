import { useState } from "react";

function Login({ handleLoginSubmit }) {
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
        handleLoginSubmit(data.email, data.password);
    };

    return (
        <main className="sign">
            <div className="sign__container">
                <h2 className="sign__title">Вход</h2>
                <form className="sign__form" onSubmit={handleSubmit}>
                    <input
                        id="email"
                        name="email"
                        className="sign__input"
                        type="email"
                        required
                        minLength={"2"}
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
                        minLength={"2"}
                        placeholder="Пароль"
                        value={data.password}
                        onChange={(event) => {
                            handleDataChange(event);
                        }}></input>
                    <button className="sign__button" type="submit">
                        Войти
                    </button>
                </form>
            </div>
        </main>
    );
}
export default Login;

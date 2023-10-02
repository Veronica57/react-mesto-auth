import { Routes, Route, NavLink } from "react-router-dom";

function Navigation({ email, onSignOut }) {
    return (
        <nav className="menu">
            <Routes>
                <Route
                    path="/signup"
                    element={
                        <NavLink to="/signin" className="menu__link">
                            Войти
                        </NavLink>
                    }
                />
                <Route
                    path="/signin"
                    element={
                        <NavLink to="/signup" className="menu__link">
                            Регистрация
                        </NavLink>
                    }
                />
                <Route
                    path="/"
                    element={
                        <>
                            <p className="menu__email">{email}</p>
                            <button
                                type="button"
                                className="menu__button-escape"
                                onClick={onSignOut}>
                                Выйти
                            </button>
                        </>
                    }
                />
            </Routes>
        </nav>
    );
}

export default Navigation;

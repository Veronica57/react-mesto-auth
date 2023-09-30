import { Link, useLocation } from "react-router-dom";
import logo from "../images/header-logo.svg";
function Header({ loggedIn, email, onSignOut }) {
    const location = useLocation();
    return (
        <header className="page header">
            {loggedIn ? (
                <>
                    <a href="/" className="header__link">
                        <img
                            src={logo}
                            alt="Логотип"
                            className="header__logo"
                        />
                    </a>
                    <div className="header__navigate">
                        <p className="header__email">{email}</p>
                        <Link to="/signin" className="header__link-escape">
                            <p
                                className="header__navigate-title"
                                onClick={onSignOut}>
                                Выйти
                            </p>
                        </Link>
                    </div>
                </>
            ) : (
                <>
                    <a href="/" className="header__link">
                        <img
                            src={logo}
                            alt="Логотип"
                            className="header__logo"
                        />
                    </a>
                    {location.pathname === "/signup" ? (
                        <div className="header__set">
                            <Link
                                to="/signin"
                                className="header__navigate-title">
                                Войти
                            </Link>
                        </div>
                    ) : null}
                    {location.pathname === "/signin" ? (
                        <div className="header__set">
                            <Link
                                to="/signup"
                                className="header__navigate-title">
                                Регистрация
                            </Link>
                        </div>
                    ) : null}
                </>
            )}
        </header>
    );
}

export default Header;

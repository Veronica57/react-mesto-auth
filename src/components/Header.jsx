import Navigation from "./Navigation";
import logo from "../images/header-logo.svg";
function Header({ email, onSignOut }) {
    return (
        <header className="header">
            <a href="/" className="header__link">
                <img src={logo} alt="логотип" className="header__logo" />
            </a>
            <Navigation email={email} onSignOut={onSignOut} />
        </header>
    );
}

export default Header;
